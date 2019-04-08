/* globals wp, wlSettings, wordlift */
/**
 * Services: Link Service.
 *
 * A service which handles persistent annotations in Gutenberg and provides related static helper methods.
 *
 * @since 3.2x
 */

/*
 * Internal dependencies.
 */
import Store1 from "../stores/Store1";
import { receiveAnalysisResults, setCurrentAnnotation, updateOccurrencesForEntity } from "../../Edit/actions";
import { processingBlockAdd, processingBlockRemove } from "../actions";
import * as Constants from "../constants";

const canCreateEntities =
  "undefined" !== wlSettings["can_create_entities"] && "yes" === wlSettings["can_create_entities"];

/**
 * Define the `AnnotationService` class.
 *
 * @since 3.2x
 */
class AnnotationService {
  constructor(block) {
    this.block = block;
    this.blockClientId = block.clientId;
    this.blockContent = block.attributes && block.attributes.content;
    this.disambiguated = [];
    this.existingAnnotations = [];
    this.rawResponse = null;
    this.modifiedResponse = null;
    this.existingEntitiesJS = null;
  }

  modifyResponse() {
    let response = this.rawResponse;

    // Check for existing entities in store
    const existingEntities = Store1.getState().entities;
    if (existingEntities.size > 0) {
      this.existingEntitiesJS = existingEntities.toJS();
      let entitiesToMerge = this.existingEntitiesJS;
      for (var entityToMerge in entitiesToMerge) {
        if (response.entities[entityToMerge]) {
          response.entities[entityToMerge].annotations = entitiesToMerge[entityToMerge].annotations;
        } else {
          response.entities[entityToMerge] = entitiesToMerge[entityToMerge];
        }
      }
    }

    // Copy annotations data to respective entities
    for (var annotation in response.annotations) {
      response.annotations[annotation].entityMatches.forEach(entity => {
        if (typeof response.entities[entity.entityId].annotations === "undefined") {
          response.entities[entity.entityId].annotations = {};
        }
        response.entities[entity.entityId].annotations[annotation] = response.annotations[annotation];
        response.entities[entity.entityId].annotations[annotation].blockClientId = this.blockClientId;
      });
    }

    // Populate an array of all disambiguated
    if (this.block.attributes && this.blockContent) {
      let contentElem = document.createElement("div");
      contentElem.innerHTML = this.blockContent;
      if (contentElem.querySelectorAll(".textannotation.disambiguated")) {
        contentElem.querySelectorAll(".textannotation.disambiguated").forEach((nodeValue, nodeIndex) => {
          this.disambiguated.push(nodeValue.innerText);
        });
      }
    }

    // Update entity occurrences based on disambiguated
    for (var entity in response.entities) {
      response.entities[entity].id = response.entities[entity].entityId || entity;
      let allAnnotations = Object.keys(response.entities[entity].annotations);
      allAnnotations.forEach((annValue, annIndex) => {
        if (this.disambiguated.includes(response.entities[entity].annotations[annValue].text)) {
          console.log("Adding entity to stack:", response.entities[entity]);
          AnnotationService.addRemoveEntityMeta(response.entities[entity]);
          response.entities[entity].occurrences.push(annValue);
        }
      });
    }

    this.modifiedResponse = response;
  }

  persistentlyAnnotate() {
    let richText = wp.richText.create({
      html: this.blockContent
    });
    for (var annotation in this.modifiedResponse.annotations) {
      const annotationData = this.modifiedResponse.annotations[annotation];

      if (this.shouldAnnotate(annotationData.start, annotationData.end)) {
        const entityData = this.modifiedResponse.entities[annotationData.entityMatches[0].entityId];
        let format = {
          type: "span",
          attributes: {
            id: annotationData.annotationId,
            class: `textannotation wl-${entityData.mainType}`,
            itemid: entityData.entityId
          }
        };
        if (this.disambiguated.includes(annotationData.text)) {
          format.attributes.class += " disambiguated";
        }

        // Do not persistently annotate if an active format with class textannotation is detected for same range
        let startFormat = richText.formats[annotationData.start];
        let formatIndex = false;
        if (startFormat) {
          startFormat.forEach((value_v, value_i) => {
            if (
              value_v.type === Constants.PLUGIN_FORMAT_NAMESPACE &&
              value_v.unregisteredAttributes &&
              value_v.unregisteredAttributes.class.indexOf("textannotation") > -1
            ) {
              formatIndex = value_i;
            }
          });
        }

        if (formatIndex === false) {
          richText = wp.richText.applyFormat(richText, format, annotationData.start, annotationData.end);
        }
      }
    }
    wp.data.dispatch("core/editor").updateBlock(this.blockClientId, {
      attributes: {
        content: wp.richText.toHTMLString({
          value: richText
        })
      }
    });
  }

  shouldAnnotate(start, end) {
    if (this.existingEntitiesJS) {
      for (var entityToCheck in this.existingEntitiesJS) {
        let entitiesChecked = this.existingEntitiesJS[entityToCheck].annotations;
        for (var annotationToCheck in entitiesChecked) {
          let annotationChecked = entitiesChecked[annotationToCheck];
          if (
            annotationChecked.blockClientId === this.blockClientId &&
            annotationChecked.start === start &&
            annotationChecked.end === end
          ) {
            return false;
          }
        }
      }
      return true;
    }
    return true;
  }

  wordliftAnalyze() {
    return dispatch => {
      const processingBlocks = Store1.getState().processingBlocks;
      if (processingBlocks.includes(this.blockClientId)) {
        return;
      }
      dispatch(processingBlockAdd(this.blockClientId));
      if (this.blockContent && this.block.name != "core/freeform") {
        console.log(`Requesting analysis for block ${this.blockClientId}...`);
        wp.data.dispatch("core/notices").removeNotice("wordlift-convert-classic-editor-blocks");
        wp.apiFetch(this.getWordliftAnalyzeRequest()).then(response => {
          if (Object.keys(response.entities).length > 0) {
            this.rawResponse = response;
            this.modifyResponse();
            this.persistentlyAnnotate();
            console.log(`An analysis has been performed for block ${this.blockClientId}`);
            dispatch(receiveAnalysisResults(this.modifiedResponse));
          } else {
            console.log(`No entities found in block ${this.blockClientId}`);
          }
          dispatch(processingBlockRemove(this.blockClientId));
        });
      } else if (this.block.name === "core/freeform") {
        AnnotationService.classicEditorNotice();
        dispatch(processingBlockRemove(this.blockClientId));
      } else {
        console.log(`No content found in block ${this.blockClientId}`);
        dispatch(processingBlockRemove(this.blockClientId));
      }
    };
  }

  getWordliftAnalyzeRequest() {
    this.fetchExistingAnnotations();
    return {
      url: `${wlSettings["ajax_url"]}?action=wordlift_analyze`,
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contentLanguage: wlSettings.language,
        contentType: "text/html",
        scope: "all",
        version: "1.0.0",
        content: this.blockContent,
        annotations: this.existingAnnotations
      })
    };
  }

  fetchExistingAnnotations() {
    let richText = wp.richText.create({
      html: this.blockContent
    });
    let annotations = [];
    let lastItem = null;
    let lastIndex = 1;
    richText.formats.forEach((value, index) => {
      let formatIndex = AnnotationService.getFormatIndex(value);
      if (formatIndex !== false) {
        let uri = value[formatIndex].attributes.itemid;
        let end = index + 1;
        if (uri !== lastItem || index !== lastIndex) {
          annotations.push({
            start: index,
            end: end,
            uri: uri
          });
        } else {
          annotations[annotations.length - 1].end = end;
        }
        lastItem = uri;
        lastIndex = end;
      }
    });
    annotations.forEach((value, index) => {
      value.label = richText.text.substring(value.start, value.end);
    });
    this.existingAnnotations = annotations;
  }

  static getFormatIndex(value) {
    let formatIndex = false;
    value.forEach((value_v, value_i) => {
      if (
        value_v.type === "span" &&
        value_v.attributes.class.indexOf("textannotation") > -1 &&
        value_v.attributes.class.indexOf("disambiguated") > -1
      ) {
        formatIndex = value_i;
      }
    });
    return formatIndex;
  }

  static analyseLocalEntities() {
    return dispatch => {
      console.log(`Found ${Object.keys(wordlift.entities).length} entities in configuration...`);

      if (Object.keys(wordlift.entities).length === 0) return;

      let localData = {
        entities: wordlift.entities,
        annotations: {}
      };

      // Get local entities from window.wordlift.entities
      for (var entity in localData.entities) {
        if (wordlift.currentPostUri !== entity) {
          localData.entities[entity].id = entity;
          localData.entities[entity].entityId = entity;
        }
        if (!localData.entities[entity].label) console.log(`Label missing for entity ${entity}`);
        if (!localData.entities[entity].description) console.log(`Description missing for entity ${entity}`);
        localData.entities[entity].occurrences = [];
        localData.entities[entity].annotations = {};
      }

      // Get local annotations from block content
      wp.data
        .select("core/editor")
        .getBlocks()
        .forEach((block, blockIndex) => {
          let richText = wp.richText.create({
            html: block.attributes && block.attributes.content
          });
          let lastItem = null;
          let lastIndex = 1;
          richText.formats.forEach((value, index) => {
            let formatIndex = AnnotationService.getFormatIndex(value);
            if (formatIndex !== false) {
              let uri = value[formatIndex].attributes.itemid;
              let id = value[formatIndex].attributes.id;
              let end = index + 1;
              if (uri !== lastItem || index !== lastIndex) {
                localData.annotations[id] = {
                  start: index,
                  end: end,
                  blockClientId: block.clientId,
                  annotationId: id,
                  entityMatches: [
                    {
                      entityId: uri
                    }
                  ]
                };
              } else {
                localData.annotations[id].end = end;
              }
              lastItem = uri;
              lastIndex = end;
            }
          });
        });

      // Copy annotations data to respective entities
      for (var annotation in localData.annotations) {
        localData.annotations[annotation].entityMatches.forEach(entity => {
          if (typeof localData.entities[entity.entityId] !== "undefined") {
            if (typeof localData.entities[entity.entityId].annotations === "undefined") {
              localData.entities[entity.entityId].annotations = {};
            }
            localData.entities[entity.entityId].annotations[annotation] = localData.annotations[annotation];
            localData.entities[entity.entityId].occurrences.push(annotation);
          }
        });
      }

      dispatch(receiveAnalysisResults(localData));
    };
  }

  static classicEditorNotice() {
    AnnotationService.convertClassicEditorBlocks();
    wp.data
      .dispatch("core/notices")
      .createInfoNotice("WordLift content analysis is not compatible with Classic Editor blocks. ", {
        id: "wordlift-convert-classic-editor-blocks",
        actions: [
          {
            url: "https://wordpress.org/plugins/classic-editor/",
            label: "Switch to Classic Editor"
          },
          {
            url: "javascript:window.wordlift.convertClassicEditorBlocks()",
            label: "Convert to Gutenberg Blocks"
          }
        ]
      });
  }

  static convertClassicEditorBlocks() {
    if (window.wordlift.convertClassicEditorBlocks) {
      return;
    }
    window.wordlift.convertClassicEditorBlocks = function() {
      wp.data
        .select("core/editor")
        .getBlocks()
        .forEach(function(block) {
          if (block.name === "core/freeform") {
            wp.data
              .dispatch("core/editor")
              .replaceBlocks(block.clientId, wp.blocks.rawHandler({ HTML: wp.blocks.getBlockContent(block) }));
          }
        });
      wp.data.dispatch("core/notices").removeNotice("wordlift-convert-classic-editor-blocks");
      wp.data
        .dispatch("core/notices")
        .createSuccessNotice(
          "Classic Editor converted to blocks. Toggle between settings and WordLift sidebar to initiate analysis. ",
          {
            id: "wordlift-convert-classic-editor-blocks"
          }
        );
    };
  }

  static annotateSelected(start, end) {
    return function(dispatch) {
      const selectedBlock = wp.data.select("core/editor").getSelectedBlock();
      if (!selectedBlock) return;

      const existingEntities = Store1.getState().entities;
      let annotationId = undefined;

      if (existingEntities.size > 0) {
        let entitiesToCheck = existingEntities.toJS();

        for (var entity in entitiesToCheck) {
          let currEntity = entitiesToCheck[entity];
          for (var annotation in currEntity.annotations) {
            let currAnnotation = currEntity.annotations[annotation];
            if (
              currAnnotation &&
              currAnnotation.blockClientId === selectedBlock.clientId &&
              currAnnotation.start <= start &&
              currAnnotation.end >= end
            ) {
              annotationId = currAnnotation.annotationId;
            }
          }
        }

        dispatch(setCurrentAnnotation(annotationId));
      }
    };
  }

  static onSelectedEntityTile(entity) {
    let action = "entitySelected";
    if (entity.occurrences.length > 0) {
      action = "entityDeselected";
    }
    console.log(`Action '${action}' on entity ${entity.id} within ${entity.mainType}`);
    console.log(`Calculating occurrences for entity ${entity.id}...`);
    let occurrences = [];
    if (action === "entitySelected") {
      console.log("Adding entity to stack:", entity);
      AnnotationService.addRemoveEntityMeta(entity);
      for (var annotation in entity.annotations) {
        AnnotationService.disambiguate(annotation, true);
        occurrences.push(annotation);
      }
    } else {
      console.log("Removing entity from stack:", entity);
      AnnotationService.addRemoveEntityMeta(entity, false);
      for (var annotation in entity.annotations) {
        AnnotationService.disambiguate(annotation, false);
      }
    }
    console.log(`Found ${occurrences.length} annotation(s) for entity ${entity.id}.`);
    setTimeout(function() {
      console.log(`Updating ${occurrences.length} occurrence(s) for ${entity.id}...`);
      Store1.dispatch(updateOccurrencesForEntity(entity.entityId, occurrences));
    }, 0);
  }

  static addRemoveEntityMeta(entity, add = true) {
    let existingMeta = {};
    let rawMeta = wp.data.select("core/editor").getEditedPostAttribute("meta")[Constants.PLUGIN_META_KEY];
    if (rawMeta) {
      existingMeta = JSON.parse(rawMeta);
    }
    if (add) {
      existingMeta[entity.entityId] = {
        uri: entity.entityId,
        label: entity.label,
        description: entity.description,
        main_type: `wl-${entity.mainType}`,
        type: entity.types,
        image: entity.images,
        sameas: entity.sameAs
      };
    } else {
      delete existingMeta[entity.entityId];
    }
    wp.data.dispatch("core/editor").editPost({
      meta: {
        wl_entities_gutenberg: JSON.stringify(existingMeta)
      }
    });
  }

  static disambiguate(elem, action) {
    const disambiguateClass = "disambiguated";

    wp.data
      .select("core/editor")
      .getBlocks()
      .forEach((block, blockIndex) => {
        if (block.attributes && block.attributes.content) {
          let content = block.attributes.content;
          let blockUid = block.clientId;
          let contentElem = document.createElement("div");
          let selector = elem.replace("urn:", "urn\\3A ");

          contentElem.innerHTML = content;
          if (contentElem.querySelector("#" + selector)) {
            action
              ? contentElem.querySelector("#" + selector).classList.add(disambiguateClass)
              : contentElem.querySelector("#" + selector).classList.remove(disambiguateClass);
            wp.data.dispatch("core/editor").updateBlock(blockUid, {
              attributes: {
                content: contentElem.innerHTML
              }
            });
          }
        }
      });
  }
}

export default AnnotationService;
