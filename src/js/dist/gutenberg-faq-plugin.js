!function(n){var e={};function t(i){if(e[i])return e[i].exports;var F=e[i]={i:i,l:!1,exports:{}};return n[i].call(F.exports,F,F.exports,t),F.l=!0,F.exports}t.m=n,t.c=e,t.d=function(n,e,i){t.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:i})},t.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},t.t=function(n,e){if(1&e&&(n=t(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var i=Object.create(null);if(t.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var F in n)t.d(i,F,function(e){return n[e]}.bind(null,F));return i},t.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(e,"a",e),e},t.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},t.p="",t(t.s=192)}({110:function(module,__webpack_exports__,__webpack_require__){"use strict";eval('/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return FAQ_QUESTION_HIGHLIGHTING_CLASS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FAQ_ANSWER_HIGHLIGHTING_CLASS; });\n/* harmony import */ var backbone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);\n/* harmony import */ var backbone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(backbone__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _constants_faq_hook_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39);\n/* harmony import */ var _mappings_blocks_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(30);\n/**\n * TinyMceHighlightHandler handles the toolbar button.\n * @since 3.26.0\n * @author Naveen Muthusamy <naveen@wordlift.io>\n */\n\n/**\n * External dependencies.\n */\n\n/**\n * Internal dependencies.\n */\n\n\n\nconst FAQ_QUESTION_HIGHLIGHTING_CLASS = "wl-faq--question";\nconst FAQ_ANSWER_HIGHLIGHTING_CLASS = "wl-faq--answer";\n\nclass TinymceHighlightHandler {\n  /**\n   * Construct highlight handler instance.\n   * @param editor {tinymce.Editor} The Tinymce editor instance.\n   * @param store Redux store.\n   */\n  constructor(editor, store) {\n    this.editor = editor;\n    this.store = store;\n    /**\n     * Listen for highlighting events, then highlight the text.\n     * Expected object from the event\n     * {\n     *     text: string,\n     *     isQuestion:Boolean\n     *     id: Int\n     * }\n     */\n\n    Object(backbone__WEBPACK_IMPORTED_MODULE_0__["on"])(_constants_faq_hook_constants__WEBPACK_IMPORTED_MODULE_1__[/* FAQ_HIGHLIGHT_TEXT */ "b"], result => {\n      this.highlightSelectedText(result.text, result.isQuestion, result.id);\n    });\n  }\n  /**\n   * Highlight the selection done by the user.\n   * @param selectedText The text which was selected by the user.\n   * @param isQuestion {Boolean} Indicates if its question or answer.\n   * @param id {Int} Unique id for question and answer.\n   */\n\n\n  highlightSelectedText(selectedText, isQuestion, id) {\n    if (this.editor.selection === null) {\n      /**\n       * Bail out if there is no selection on the editor.\n       */\n      return;\n    }\n\n    const html = this.editor.selection.getContent();\n    const className = Object(_mappings_blocks_helper__WEBPACK_IMPORTED_MODULE_2__[/* classExtractor */ "a"])({\n      [FAQ_QUESTION_HIGHLIGHTING_CLASS]: isQuestion,\n      [FAQ_ANSWER_HIGHLIGHTING_CLASS]: !isQuestion\n    });\n    /**\n     * Prepare unique identifier for the string, we are appending the classname because ids should\n     * be unique.\n     * @type {string}\n     */\n\n    const identifier = `${className}--${id}`;\n    const editor = this.editor;\n    const highlightedElement = `<span class="${className}" id="${identifier}">${html}</span>`;\n    editor.selection.setContent(highlightedElement);\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__["c"] = (TinymceHighlightHandler);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZmFxL2hvb2tzL3RpbnltY2UvdGlueW1jZS1oaWdobGlnaHQtaGFuZGxlci5qcz8xNTRlIl0sIm5hbWVzIjpbIkZBUV9RVUVTVElPTl9ISUdITElHSFRJTkdfQ0xBU1MiLCJGQVFfQU5TV0VSX0hJR0hMSUdIVElOR19DTEFTUyIsIlRpbnltY2VIaWdobGlnaHRIYW5kbGVyIiwiY29uc3RydWN0b3IiLCJlZGl0b3IiLCJzdG9yZSIsIm9uIiwiRkFRX0hJR0hMSUdIVF9URVhUIiwicmVzdWx0IiwiaGlnaGxpZ2h0U2VsZWN0ZWRUZXh0IiwidGV4dCIsImlzUXVlc3Rpb24iLCJpZCIsInNlbGVjdGVkVGV4dCIsInNlbGVjdGlvbiIsImh0bWwiLCJnZXRDb250ZW50IiwiY2xhc3NOYW1lIiwiY2xhc3NFeHRyYWN0b3IiLCJpZGVudGlmaWVyIiwiaGlnaGxpZ2h0ZWRFbGVtZW50Iiwic2V0Q29udGVudCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7OztBQU1BOzs7QUFHQTtBQUVBOzs7O0FBR0E7QUFDQTtBQUVPLE1BQU1BLCtCQUErQixHQUFHLGtCQUF4QztBQUNBLE1BQU1DLDZCQUE2QixHQUFHLGdCQUF0Qzs7QUFFUCxNQUFNQyx1QkFBTixDQUE4QjtBQUM1Qjs7Ozs7QUFLQUMsYUFBVyxDQUFDQyxNQUFELEVBQVNDLEtBQVQsRUFBZ0I7QUFDekIsU0FBS0QsTUFBTCxHQUFjQSxNQUFkO0FBQ0EsU0FBS0MsS0FBTCxHQUFhQSxLQUFiO0FBQ0E7Ozs7Ozs7Ozs7QUFTQUMsdURBQUUsQ0FBQ0Msd0ZBQUQsRUFBcUJDLE1BQU0sSUFBSTtBQUMvQixXQUFLQyxxQkFBTCxDQUEyQkQsTUFBTSxDQUFDRSxJQUFsQyxFQUF3Q0YsTUFBTSxDQUFDRyxVQUEvQyxFQUEyREgsTUFBTSxDQUFDSSxFQUFsRTtBQUNELEtBRkMsQ0FBRjtBQUdEO0FBRUQ7Ozs7Ozs7O0FBTUFILHVCQUFxQixDQUFDSSxZQUFELEVBQWVGLFVBQWYsRUFBMkJDLEVBQTNCLEVBQStCO0FBQ2xELFFBQUssS0FBS1IsTUFBTCxDQUFZVSxTQUFaLEtBQTBCLElBQS9CLEVBQXFDO0FBQ25DOzs7QUFHQTtBQUNEOztBQUNELFVBQU1DLElBQUksR0FBRyxLQUFLWCxNQUFMLENBQVlVLFNBQVosQ0FBc0JFLFVBQXRCLEVBQWI7QUFDQSxVQUFNQyxTQUFTLEdBQUdDLHNGQUFjLENBQUM7QUFDL0IsT0FBQ2xCLCtCQUFELEdBQW1DVyxVQURKO0FBRS9CLE9BQUNWLDZCQUFELEdBQWlDLENBQUNVO0FBRkgsS0FBRCxDQUFoQztBQUlBOzs7Ozs7QUFLQSxVQUFNUSxVQUFVLEdBQUksR0FBRUYsU0FBVSxLQUFJTCxFQUFHLEVBQXZDO0FBQ0EsVUFBTVIsTUFBTSxHQUFHLEtBQUtBLE1BQXBCO0FBQ0EsVUFBTWdCLGtCQUFrQixHQUFJLGdCQUFlSCxTQUFVLFNBQVFFLFVBQVcsS0FBSUosSUFBSyxTQUFqRjtBQUNBWCxVQUFNLENBQUNVLFNBQVAsQ0FBaUJPLFVBQWpCLENBQTRCRCxrQkFBNUI7QUFDRDs7QUFsRDJCOztBQXFEZmxCLGdGQUFmIiwiZmlsZSI6IjExMC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVGlueU1jZUhpZ2hsaWdodEhhbmRsZXIgaGFuZGxlcyB0aGUgdG9vbGJhciBidXR0b24uXG4gKiBAc2luY2UgMy4yNi4wXG4gKiBAYXV0aG9yIE5hdmVlbiBNdXRodXNhbXkgPG5hdmVlbkB3b3JkbGlmdC5pbz5cbiAqL1xuXG4vKipcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llcy5cbiAqL1xuaW1wb3J0IHsgb24gfSBmcm9tIFwiYmFja2JvbmVcIjtcblxuLyoqXG4gKiBJbnRlcm5hbCBkZXBlbmRlbmNpZXMuXG4gKi9cbmltcG9ydCB7IEZBUV9ISUdITElHSFRfVEVYVCwgRkFRX0lURU1TX0NIQU5HRUQgfSBmcm9tIFwiLi4vLi4vY29uc3RhbnRzL2ZhcS1ob29rLWNvbnN0YW50c1wiO1xuaW1wb3J0IHsgY2xhc3NFeHRyYWN0b3IgfSBmcm9tIFwiLi4vLi4vLi4vbWFwcGluZ3MvYmxvY2tzL2hlbHBlclwiO1xuXG5leHBvcnQgY29uc3QgRkFRX1FVRVNUSU9OX0hJR0hMSUdIVElOR19DTEFTUyA9IFwid2wtZmFxLS1xdWVzdGlvblwiO1xuZXhwb3J0IGNvbnN0IEZBUV9BTlNXRVJfSElHSExJR0hUSU5HX0NMQVNTID0gXCJ3bC1mYXEtLWFuc3dlclwiO1xuXG5jbGFzcyBUaW55bWNlSGlnaGxpZ2h0SGFuZGxlciB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgaGlnaGxpZ2h0IGhhbmRsZXIgaW5zdGFuY2UuXG4gICAqIEBwYXJhbSBlZGl0b3Ige3RpbnltY2UuRWRpdG9yfSBUaGUgVGlueW1jZSBlZGl0b3IgaW5zdGFuY2UuXG4gICAqIEBwYXJhbSBzdG9yZSBSZWR1eCBzdG9yZS5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGVkaXRvciwgc3RvcmUpIHtcbiAgICB0aGlzLmVkaXRvciA9IGVkaXRvcjtcbiAgICB0aGlzLnN0b3JlID0gc3RvcmU7XG4gICAgLyoqXG4gICAgICogTGlzdGVuIGZvciBoaWdobGlnaHRpbmcgZXZlbnRzLCB0aGVuIGhpZ2hsaWdodCB0aGUgdGV4dC5cbiAgICAgKiBFeHBlY3RlZCBvYmplY3QgZnJvbSB0aGUgZXZlbnRcbiAgICAgKiB7XG4gICAgICogICAgIHRleHQ6IHN0cmluZyxcbiAgICAgKiAgICAgaXNRdWVzdGlvbjpCb29sZWFuXG4gICAgICogICAgIGlkOiBJbnRcbiAgICAgKiB9XG4gICAgICovXG4gICAgb24oRkFRX0hJR0hMSUdIVF9URVhULCByZXN1bHQgPT4ge1xuICAgICAgdGhpcy5oaWdobGlnaHRTZWxlY3RlZFRleHQocmVzdWx0LnRleHQsIHJlc3VsdC5pc1F1ZXN0aW9uLCByZXN1bHQuaWQpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEhpZ2hsaWdodCB0aGUgc2VsZWN0aW9uIGRvbmUgYnkgdGhlIHVzZXIuXG4gICAqIEBwYXJhbSBzZWxlY3RlZFRleHQgVGhlIHRleHQgd2hpY2ggd2FzIHNlbGVjdGVkIGJ5IHRoZSB1c2VyLlxuICAgKiBAcGFyYW0gaXNRdWVzdGlvbiB7Qm9vbGVhbn0gSW5kaWNhdGVzIGlmIGl0cyBxdWVzdGlvbiBvciBhbnN3ZXIuXG4gICAqIEBwYXJhbSBpZCB7SW50fSBVbmlxdWUgaWQgZm9yIHF1ZXN0aW9uIGFuZCBhbnN3ZXIuXG4gICAqL1xuICBoaWdobGlnaHRTZWxlY3RlZFRleHQoc2VsZWN0ZWRUZXh0LCBpc1F1ZXN0aW9uLCBpZCkge1xuICAgIGlmICggdGhpcy5lZGl0b3Iuc2VsZWN0aW9uID09PSBudWxsKSB7XG4gICAgICAvKipcbiAgICAgICAqIEJhaWwgb3V0IGlmIHRoZXJlIGlzIG5vIHNlbGVjdGlvbiBvbiB0aGUgZWRpdG9yLlxuICAgICAgICovXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3QgaHRtbCA9IHRoaXMuZWRpdG9yLnNlbGVjdGlvbi5nZXRDb250ZW50KCk7XG4gICAgY29uc3QgY2xhc3NOYW1lID0gY2xhc3NFeHRyYWN0b3Ioe1xuICAgICAgW0ZBUV9RVUVTVElPTl9ISUdITElHSFRJTkdfQ0xBU1NdOiBpc1F1ZXN0aW9uLFxuICAgICAgW0ZBUV9BTlNXRVJfSElHSExJR0hUSU5HX0NMQVNTXTogIWlzUXVlc3Rpb25cbiAgICB9KTtcbiAgICAvKipcbiAgICAgKiBQcmVwYXJlIHVuaXF1ZSBpZGVudGlmaWVyIGZvciB0aGUgc3RyaW5nLCB3ZSBhcmUgYXBwZW5kaW5nIHRoZSBjbGFzc25hbWUgYmVjYXVzZSBpZHMgc2hvdWxkXG4gICAgICogYmUgdW5pcXVlLlxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgY29uc3QgaWRlbnRpZmllciA9IGAke2NsYXNzTmFtZX0tLSR7aWR9YDtcbiAgICBjb25zdCBlZGl0b3IgPSB0aGlzLmVkaXRvcjtcbiAgICBjb25zdCBoaWdobGlnaHRlZEVsZW1lbnQgPSBgPHNwYW4gY2xhc3M9XCIke2NsYXNzTmFtZX1cIiBpZD1cIiR7aWRlbnRpZmllcn1cIj4ke2h0bWx9PC9zcGFuPmA7XG4gICAgZWRpdG9yLnNlbGVjdGlvbi5zZXRDb250ZW50KGhpZ2hsaWdodGVkRWxlbWVudCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVGlueW1jZUhpZ2hsaWdodEhhbmRsZXI7XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///110\n')},113:function(module,exports){eval('(function() { module.exports = this["wp"]["richText"]; }());//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1widGhpc1wiOltcIndwXCIsXCJyaWNoVGV4dFwiXX0/YTdiZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxhQUFhLHlDQUF5QyxFQUFFIiwiZmlsZSI6IjExMy5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wid3BcIl1bXCJyaWNoVGV4dFwiXTsgfSgpKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///113\n')},192:function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n\n// EXTERNAL MODULE: external "Backbone"\nvar external_Backbone_ = __webpack_require__(21);\n\n// EXTERNAL MODULE: ./src/faq/constants/faq-hook-constants.js\nvar faq_hook_constants = __webpack_require__(39);\n\n// EXTERNAL MODULE: external {"this":["wp","richText"]}\nvar external_this_wp_richText_ = __webpack_require__(113);\n\n// EXTERNAL MODULE: ./src/faq/hooks/tinymce/tinymce-highlight-handler.js\nvar tinymce_highlight_handler = __webpack_require__(110);\n\n// CONCATENATED MODULE: ./src/faq/hooks/gutenberg/gutenberg-format-type-handler.js\n/**\n * GutenbergFormatTypeHandler Registers the format type required for the FAQ section in\n * the gutenberg.\n *\n * @since 3.26.0\n * @author Naveen Muthusamy <naveen@wordlift.io>\n */\n\n/**\n * WordPress dependencies\n */\n\n/**\n * Internal dependencies.\n */\n\n\nconst FAQ_ANSWER_FORMAT_NAME = "wordlift/faq-answer";\nconst FAQ_QUESTION_FORMAT_NAME = "wordlift/faq-question";\n\nclass gutenberg_format_type_handler_GutenbergFormatTypeHandler {\n  registerAnswerFormatType() {\n    Object(external_this_wp_richText_["registerFormatType"])(FAQ_ANSWER_FORMAT_NAME, {\n      title: "Question",\n      tagName: "span",\n      className: tinymce_highlight_handler["a" /* FAQ_ANSWER_HIGHLIGHTING_CLASS */]\n    });\n  }\n\n  registerQuestionFormatType() {\n    Object(external_this_wp_richText_["registerFormatType"])(FAQ_QUESTION_FORMAT_NAME, {\n      title: "Question",\n      tagName: "span",\n      className: tinymce_highlight_handler["b" /* FAQ_QUESTION_HIGHLIGHTING_CLASS */]\n    });\n  }\n  /**\n   * Registers all the format types needed by FAQ\n   */\n\n\n  registerAllFormatTypes() {\n    this.registerQuestionFormatType();\n    this.registerAnswerFormatType();\n  }\n\n}\n\n/* harmony default export */ var gutenberg_format_type_handler = (gutenberg_format_type_handler_GutenbergFormatTypeHandler);\n// CONCATENATED MODULE: ./src/faq/hooks/gutenberg/gutenberg-highlight-handler.js\n/**\n * GutenbergHighlightHandler handles the highlight event from event handler and\n * applies the format type to gutenberg\n *\n * @since 3.26.0\n * @author Naveen Muthusamy <naveen@wordlift.io>\n */\n\n/**\n * External dependencies.\n */\n\n/**\n * Internal dependencies.\n */\n\n\n\n\n\nclass gutenberg_highlight_handler_GutenbergHighlightHandler {\n  constructor() {\n    this.selectedTextObject = null;\n  }\n  /**\n   * Start listening for highlight events from\n   * the store.\n   */\n\n\n  listenForHighlightEvent() {\n    Object(external_Backbone_["on"])(faq_hook_constants["b" /* FAQ_HIGHLIGHT_TEXT */], result => {\n      const {\n        isQuestion,\n        id\n      } = result;\n      /**\n       * Apply format depending on the type.\n       */\n\n      if (isQuestion) {\n        Object(external_this_wp_richText_["applyFormat"])(this.selectedTextObject, {\n          type: FAQ_QUESTION_FORMAT_NAME\n        });\n      } else {\n        Object(external_this_wp_richText_["applyFormat"])(this.selectedTextObject, {\n          type: FAQ_ANSWER_FORMAT_NAME\n        });\n      }\n    });\n  }\n\n}\n\n/* harmony default export */ var gutenberg_highlight_handler = (gutenberg_highlight_handler_GutenbergHighlightHandler);\n// CONCATENATED MODULE: ./src/faq/hooks/gutenberg/gutenberg-faq-plugin.js\n\n\n\n\n/**\n * Register all the format types required by FAQ\n * for the gutenberg\n */\n\nconst formatTypeHandler = new gutenberg_format_type_handler();\nformatTypeHandler.registerAllFormatTypes();\nconst highlightHandler = new gutenberg_highlight_handler();\n/**\n * Event handler / store emits highlight event upon faqitem\n * save or edit.\n */\n\nhighlightHandler.listenForHighlightEvent();\n/**\n * Register the toolbar button and the format.\n */\n\n(function (wp) {\n  const AddFaqButton = function (props) {\n    return wp.element.createElement(wp.editor.RichTextToolbarButton, {\n      title: "Add Question / Answer",\n      icon: "plus-alt",\n      onClick: function () {\n        /**\n         * We pass props.value in to extras, in order to make\n         * gutenberg highlight on the highlight event.\n         */\n        highlightHandler.selectedTextObject = props.value;\n        const {\n          text,\n          start,\n          end\n        } = props.value;\n        const selectedText = text.slice(start, end);\n        Object(external_Backbone_["trigger"])(faq_hook_constants["a" /* FAQ_EVENT_HANDLER_SELECTION_CHANGED */], {\n          selectedText: selectedText,\n          selectedHTML: selectedText\n        });\n      },\n      isActive: false\n    });\n  };\n\n  wp.richText.registerFormatType("wordlift/faq-plugin", {\n    title: "Add Question/Answer",\n    tagName: "faq-gutenberg",\n    className: null,\n    edit: AddFaqButton\n  });\n})(window.wp);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZmFxL2hvb2tzL2d1dGVuYmVyZy9ndXRlbmJlcmctZm9ybWF0LXR5cGUtaGFuZGxlci5qcz8xZTc0Iiwid2VicGFjazovLy8uL3NyYy9mYXEvaG9va3MvZ3V0ZW5iZXJnL2d1dGVuYmVyZy1oaWdobGlnaHQtaGFuZGxlci5qcz9iNDE3Iiwid2VicGFjazovLy8uL3NyYy9mYXEvaG9va3MvZ3V0ZW5iZXJnL2d1dGVuYmVyZy1mYXEtcGx1Z2luLmpzPzA5ZTUiXSwibmFtZXMiOlsiRkFRX0FOU1dFUl9GT1JNQVRfTkFNRSIsIkZBUV9RVUVTVElPTl9GT1JNQVRfTkFNRSIsIkd1dGVuYmVyZ0Zvcm1hdFR5cGVIYW5kbGVyIiwicmVnaXN0ZXJBbnN3ZXJGb3JtYXRUeXBlIiwicmVnaXN0ZXJGb3JtYXRUeXBlIiwidGl0bGUiLCJ0YWdOYW1lIiwiY2xhc3NOYW1lIiwiRkFRX0FOU1dFUl9ISUdITElHSFRJTkdfQ0xBU1MiLCJyZWdpc3RlclF1ZXN0aW9uRm9ybWF0VHlwZSIsIkZBUV9RVUVTVElPTl9ISUdITElHSFRJTkdfQ0xBU1MiLCJyZWdpc3RlckFsbEZvcm1hdFR5cGVzIiwiR3V0ZW5iZXJnSGlnaGxpZ2h0SGFuZGxlciIsImNvbnN0cnVjdG9yIiwic2VsZWN0ZWRUZXh0T2JqZWN0IiwibGlzdGVuRm9ySGlnaGxpZ2h0RXZlbnQiLCJvbiIsIkZBUV9ISUdITElHSFRfVEVYVCIsInJlc3VsdCIsImlzUXVlc3Rpb24iLCJpZCIsImFwcGx5Rm9ybWF0IiwidHlwZSIsImZvcm1hdFR5cGVIYW5kbGVyIiwiaGlnaGxpZ2h0SGFuZGxlciIsIndwIiwiQWRkRmFxQnV0dG9uIiwicHJvcHMiLCJlbGVtZW50IiwiY3JlYXRlRWxlbWVudCIsImVkaXRvciIsIlJpY2hUZXh0VG9vbGJhckJ1dHRvbiIsImljb24iLCJvbkNsaWNrIiwidmFsdWUiLCJ0ZXh0Iiwic3RhcnQiLCJlbmQiLCJzZWxlY3RlZFRleHQiLCJzbGljZSIsInRyaWdnZXIiLCJGQVFfRVZFTlRfSEFORExFUl9TRUxFQ1RJT05fQ0hBTkdFRCIsInNlbGVjdGVkSFRNTCIsImlzQWN0aXZlIiwicmljaFRleHQiLCJlZGl0Iiwid2luZG93Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7QUFRQTs7O0FBR0E7QUFFQTs7OztBQUdBO0FBRU8sTUFBTUEsc0JBQXNCLEdBQUcscUJBQS9CO0FBQ0EsTUFBTUMsd0JBQXdCLEdBQUcsdUJBQWpDOztBQUVQLE1BQU1DLHdEQUFOLENBQWlDO0FBQy9CQywwQkFBd0IsR0FBRztBQUN6QkMsNERBQWtCLENBQUNKLHNCQUFELEVBQXlCO0FBQ3pDSyxXQUFLLEVBQUUsVUFEa0M7QUFFekNDLGFBQU8sRUFBRSxNQUZnQztBQUd6Q0MsZUFBUyxFQUFFQyxrRUFBNkJBO0FBSEMsS0FBekIsQ0FBbEI7QUFLRDs7QUFDREMsNEJBQTBCLEdBQUc7QUFDM0JMLDREQUFrQixDQUFDSCx3QkFBRCxFQUEyQjtBQUMzQ0ksV0FBSyxFQUFFLFVBRG9DO0FBRTNDQyxhQUFPLEVBQUUsTUFGa0M7QUFHM0NDLGVBQVMsRUFBRUcsb0VBQStCQTtBQUhDLEtBQTNCLENBQWxCO0FBS0Q7QUFFRDs7Ozs7QUFHQUMsd0JBQXNCLEdBQUc7QUFDdkIsU0FBS0YsMEJBQUw7QUFDQSxTQUFLTix3QkFBTDtBQUNEOztBQXRCOEI7O0FBeUJsQkQsMEhBQWYsRTs7QUM5Q0E7Ozs7Ozs7O0FBUUE7OztBQUdBO0FBRUE7Ozs7QUFHQTtBQUNBO0FBQ0E7O0FBRUEsTUFBTVUscURBQU4sQ0FBZ0M7QUFDOUJDLGFBQVcsR0FBRztBQUNaLFNBQUtDLGtCQUFMLEdBQTBCLElBQTFCO0FBQ0Q7QUFDRDs7Ozs7O0FBSUFDLHlCQUF1QixHQUFHO0FBQ3hCQyxvQ0FBRSxDQUFDQyxnREFBRCxFQUFxQkMsTUFBTSxJQUFJO0FBQy9CLFlBQU07QUFBRUMsa0JBQUY7QUFBY0M7QUFBZCxVQUFxQkYsTUFBM0I7QUFDQTs7OztBQUdBLFVBQUtDLFVBQUwsRUFBaUI7QUFDZkUseURBQVcsQ0FBQyxLQUFLUCxrQkFBTixFQUEwQjtBQUFDUSxjQUFJLEVBQUVyQix3QkFBd0JBO0FBQS9CLFNBQTFCLENBQVg7QUFDRCxPQUZELE1BR0s7QUFDSG9CLHlEQUFXLENBQUMsS0FBS1Asa0JBQU4sRUFBMEI7QUFBQ1EsY0FBSSxFQUFFdEIsc0JBQXNCQTtBQUE3QixTQUExQixDQUFYO0FBQ0Q7QUFDRixLQVhDLENBQUY7QUFZRDs7QUFyQjZCOztBQXdCakJZLHFIQUFmLEU7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7O0FBSUEsTUFBTVcsaUJBQWlCLEdBQUcsSUFBSXJCLDZCQUFKLEVBQTFCO0FBQ0FxQixpQkFBaUIsQ0FBQ1osc0JBQWxCO0FBRUEsTUFBTWEsZ0JBQWdCLEdBQUcsSUFBSVosMkJBQUosRUFBekI7QUFDQTs7Ozs7QUFJQVksZ0JBQWdCLENBQUNULHVCQUFqQjtBQUVBOzs7O0FBR0EsQ0FBQyxVQUFTVSxFQUFULEVBQWE7QUFDWixRQUFNQyxZQUFZLEdBQUcsVUFBU0MsS0FBVCxFQUFnQjtBQUNuQyxXQUFPRixFQUFFLENBQUNHLE9BQUgsQ0FBV0MsYUFBWCxDQUF5QkosRUFBRSxDQUFDSyxNQUFILENBQVVDLHFCQUFuQyxFQUEwRDtBQUMvRDFCLFdBQUssRUFBRSx1QkFEd0Q7QUFFL0QyQixVQUFJLEVBQUUsVUFGeUQ7QUFHL0RDLGFBQU8sRUFBRSxZQUFXO0FBQ2xCOzs7O0FBSUFULHdCQUFnQixDQUFDVixrQkFBakIsR0FBc0NhLEtBQUssQ0FBQ08sS0FBNUM7QUFDQSxjQUFNO0FBQUVDLGNBQUY7QUFBUUMsZUFBUjtBQUFlQztBQUFmLFlBQXVCVixLQUFLLENBQUNPLEtBQW5DO0FBQ0EsY0FBTUksWUFBWSxHQUFHSCxJQUFJLENBQUNJLEtBQUwsQ0FBV0gsS0FBWCxFQUFrQkMsR0FBbEIsQ0FBckI7QUFDQUcsNkNBQU8sQ0FBQ0MsaUVBQUQsRUFBc0M7QUFDM0NILHNCQUFZLEVBQUVBLFlBRDZCO0FBRTNDSSxzQkFBWSxFQUFFSjtBQUY2QixTQUF0QyxDQUFQO0FBSUQsT0FmOEQ7QUFnQi9ESyxjQUFRLEVBQUU7QUFoQnFELEtBQTFELENBQVA7QUFrQkQsR0FuQkQ7O0FBcUJBbEIsSUFBRSxDQUFDbUIsUUFBSCxDQUFZeEMsa0JBQVosQ0FBK0IscUJBQS9CLEVBQXNEO0FBQ3BEQyxTQUFLLEVBQUUscUJBRDZDO0FBRXBEQyxXQUFPLEVBQUUsZUFGMkM7QUFHcERDLGFBQVMsRUFBRSxJQUh5QztBQUlwRHNDLFFBQUksRUFBRW5CO0FBSjhDLEdBQXREO0FBTUQsQ0E1QkQsRUE0QkdvQixNQUFNLENBQUNyQixFQTVCViIsImZpbGUiOiIxOTIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEd1dGVuYmVyZ0Zvcm1hdFR5cGVIYW5kbGVyIFJlZ2lzdGVycyB0aGUgZm9ybWF0IHR5cGUgcmVxdWlyZWQgZm9yIHRoZSBGQVEgc2VjdGlvbiBpblxuICogdGhlIGd1dGVuYmVyZy5cbiAqXG4gKiBAc2luY2UgMy4yNi4wXG4gKiBAYXV0aG9yIE5hdmVlbiBNdXRodXNhbXkgPG5hdmVlbkB3b3JkbGlmdC5pbz5cbiAqL1xuXG4vKipcbiAqIFdvcmRQcmVzcyBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgcmVnaXN0ZXJGb3JtYXRUeXBlIH0gZnJvbSBcIkB3b3JkcHJlc3MvcmljaC10ZXh0XCI7XG5cbi8qKlxuICogSW50ZXJuYWwgZGVwZW5kZW5jaWVzLlxuICovXG5pbXBvcnQgeyBGQVFfQU5TV0VSX0hJR0hMSUdIVElOR19DTEFTUywgRkFRX1FVRVNUSU9OX0hJR0hMSUdIVElOR19DTEFTUyB9IGZyb20gXCIuLi90aW55bWNlL3RpbnltY2UtaGlnaGxpZ2h0LWhhbmRsZXJcIjtcblxuZXhwb3J0IGNvbnN0IEZBUV9BTlNXRVJfRk9STUFUX05BTUUgPSBcIndvcmRsaWZ0L2ZhcS1hbnN3ZXJcIjtcbmV4cG9ydCBjb25zdCBGQVFfUVVFU1RJT05fRk9STUFUX05BTUUgPSBcIndvcmRsaWZ0L2ZhcS1xdWVzdGlvblwiO1xuXG5jbGFzcyBHdXRlbmJlcmdGb3JtYXRUeXBlSGFuZGxlciB7XG4gIHJlZ2lzdGVyQW5zd2VyRm9ybWF0VHlwZSgpIHtcbiAgICByZWdpc3RlckZvcm1hdFR5cGUoRkFRX0FOU1dFUl9GT1JNQVRfTkFNRSwge1xuICAgICAgdGl0bGU6IFwiUXVlc3Rpb25cIixcbiAgICAgIHRhZ05hbWU6IFwic3BhblwiLFxuICAgICAgY2xhc3NOYW1lOiBGQVFfQU5TV0VSX0hJR0hMSUdIVElOR19DTEFTU1xuICAgIH0pO1xuICB9XG4gIHJlZ2lzdGVyUXVlc3Rpb25Gb3JtYXRUeXBlKCkge1xuICAgIHJlZ2lzdGVyRm9ybWF0VHlwZShGQVFfUVVFU1RJT05fRk9STUFUX05BTUUsIHtcbiAgICAgIHRpdGxlOiBcIlF1ZXN0aW9uXCIsXG4gICAgICB0YWdOYW1lOiBcInNwYW5cIixcbiAgICAgIGNsYXNzTmFtZTogRkFRX1FVRVNUSU9OX0hJR0hMSUdIVElOR19DTEFTU1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBhbGwgdGhlIGZvcm1hdCB0eXBlcyBuZWVkZWQgYnkgRkFRXG4gICAqL1xuICByZWdpc3RlckFsbEZvcm1hdFR5cGVzKCkge1xuICAgIHRoaXMucmVnaXN0ZXJRdWVzdGlvbkZvcm1hdFR5cGUoKTtcbiAgICB0aGlzLnJlZ2lzdGVyQW5zd2VyRm9ybWF0VHlwZSgpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEd1dGVuYmVyZ0Zvcm1hdFR5cGVIYW5kbGVyO1xuIiwiLyoqXG4gKiBHdXRlbmJlcmdIaWdobGlnaHRIYW5kbGVyIGhhbmRsZXMgdGhlIGhpZ2hsaWdodCBldmVudCBmcm9tIGV2ZW50IGhhbmRsZXIgYW5kXG4gKiBhcHBsaWVzIHRoZSBmb3JtYXQgdHlwZSB0byBndXRlbmJlcmdcbiAqXG4gKiBAc2luY2UgMy4yNi4wXG4gKiBAYXV0aG9yIE5hdmVlbiBNdXRodXNhbXkgPG5hdmVlbkB3b3JkbGlmdC5pbz5cbiAqL1xuXG4vKipcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llcy5cbiAqL1xuaW1wb3J0IHsgb24gfSBmcm9tIFwiYmFja2JvbmVcIjtcblxuLyoqXG4gKiBJbnRlcm5hbCBkZXBlbmRlbmNpZXMuXG4gKi9cbmltcG9ydCB7IEZBUV9ISUdITElHSFRfVEVYVCB9IGZyb20gXCIuLi8uLi9jb25zdGFudHMvZmFxLWhvb2stY29uc3RhbnRzXCI7XG5pbXBvcnQge0ZBUV9BTlNXRVJfRk9STUFUX05BTUUsIEZBUV9RVUVTVElPTl9GT1JNQVRfTkFNRX0gZnJvbSBcIi4vZ3V0ZW5iZXJnLWZvcm1hdC10eXBlLWhhbmRsZXJcIjtcbmltcG9ydCB7IGFwcGx5Rm9ybWF0IH0gZnJvbSBcIkB3b3JkcHJlc3MvcmljaC10ZXh0XCI7XG5cbmNsYXNzIEd1dGVuYmVyZ0hpZ2hsaWdodEhhbmRsZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnNlbGVjdGVkVGV4dE9iamVjdCA9IG51bGw7XG4gIH1cbiAgLyoqXG4gICAqIFN0YXJ0IGxpc3RlbmluZyBmb3IgaGlnaGxpZ2h0IGV2ZW50cyBmcm9tXG4gICAqIHRoZSBzdG9yZS5cbiAgICovXG4gIGxpc3RlbkZvckhpZ2hsaWdodEV2ZW50KCkge1xuICAgIG9uKEZBUV9ISUdITElHSFRfVEVYVCwgcmVzdWx0ID0+IHtcbiAgICAgIGNvbnN0IHsgaXNRdWVzdGlvbiwgaWQgfSA9IHJlc3VsdDtcbiAgICAgIC8qKlxuICAgICAgICogQXBwbHkgZm9ybWF0IGRlcGVuZGluZyBvbiB0aGUgdHlwZS5cbiAgICAgICAqL1xuICAgICAgaWYgKCBpc1F1ZXN0aW9uKSB7XG4gICAgICAgIGFwcGx5Rm9ybWF0KHRoaXMuc2VsZWN0ZWRUZXh0T2JqZWN0LCB7dHlwZTogRkFRX1FVRVNUSU9OX0ZPUk1BVF9OQU1FfSk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgYXBwbHlGb3JtYXQodGhpcy5zZWxlY3RlZFRleHRPYmplY3QsIHt0eXBlOiBGQVFfQU5TV0VSX0ZPUk1BVF9OQU1FfSlcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHdXRlbmJlcmdIaWdobGlnaHRIYW5kbGVyO1xuIiwiaW1wb3J0IHsgdHJpZ2dlciwgb24gfSBmcm9tIFwiYmFja2JvbmVcIjtcbmltcG9ydCB7IEZBUV9FVkVOVF9IQU5ETEVSX1NFTEVDVElPTl9DSEFOR0VELCBGQVFfSElHSExJR0hUX1RFWFQgfSBmcm9tIFwiLi4vLi4vY29uc3RhbnRzL2ZhcS1ob29rLWNvbnN0YW50c1wiO1xuaW1wb3J0IEd1dGVuYmVyZ0Zvcm1hdFR5cGVIYW5kbGVyLCB7IEZBUV9RVUVTVElPTl9GT1JNQVRfTkFNRSB9IGZyb20gXCIuL2d1dGVuYmVyZy1mb3JtYXQtdHlwZS1oYW5kbGVyXCI7XG5pbXBvcnQgR3V0ZW5iZXJnSGlnaGxpZ2h0SGFuZGxlciBmcm9tIFwiLi9ndXRlbmJlcmctaGlnaGxpZ2h0LWhhbmRsZXJcIjtcblxuLyoqXG4gKiBSZWdpc3RlciBhbGwgdGhlIGZvcm1hdCB0eXBlcyByZXF1aXJlZCBieSBGQVFcbiAqIGZvciB0aGUgZ3V0ZW5iZXJnXG4gKi9cbmNvbnN0IGZvcm1hdFR5cGVIYW5kbGVyID0gbmV3IEd1dGVuYmVyZ0Zvcm1hdFR5cGVIYW5kbGVyKCk7XG5mb3JtYXRUeXBlSGFuZGxlci5yZWdpc3RlckFsbEZvcm1hdFR5cGVzKCk7XG5cbmNvbnN0IGhpZ2hsaWdodEhhbmRsZXIgPSBuZXcgR3V0ZW5iZXJnSGlnaGxpZ2h0SGFuZGxlcigpO1xuLyoqXG4gKiBFdmVudCBoYW5kbGVyIC8gc3RvcmUgZW1pdHMgaGlnaGxpZ2h0IGV2ZW50IHVwb24gZmFxaXRlbVxuICogc2F2ZSBvciBlZGl0LlxuICovXG5oaWdobGlnaHRIYW5kbGVyLmxpc3RlbkZvckhpZ2hsaWdodEV2ZW50KCk7XG5cbi8qKlxuICogUmVnaXN0ZXIgdGhlIHRvb2xiYXIgYnV0dG9uIGFuZCB0aGUgZm9ybWF0LlxuICovXG4oZnVuY3Rpb24od3ApIHtcbiAgY29uc3QgQWRkRmFxQnV0dG9uID0gZnVuY3Rpb24ocHJvcHMpIHtcbiAgICByZXR1cm4gd3AuZWxlbWVudC5jcmVhdGVFbGVtZW50KHdwLmVkaXRvci5SaWNoVGV4dFRvb2xiYXJCdXR0b24sIHtcbiAgICAgIHRpdGxlOiBcIkFkZCBRdWVzdGlvbiAvIEFuc3dlclwiLFxuICAgICAgaWNvbjogXCJwbHVzLWFsdFwiLFxuICAgICAgb25DbGljazogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBXZSBwYXNzIHByb3BzLnZhbHVlIGluIHRvIGV4dHJhcywgaW4gb3JkZXIgdG8gbWFrZVxuICAgICAgICAgKiBndXRlbmJlcmcgaGlnaGxpZ2h0IG9uIHRoZSBoaWdobGlnaHQgZXZlbnQuXG4gICAgICAgICAqL1xuICAgICAgICBoaWdobGlnaHRIYW5kbGVyLnNlbGVjdGVkVGV4dE9iamVjdCA9IHByb3BzLnZhbHVlO1xuICAgICAgICBjb25zdCB7IHRleHQsIHN0YXJ0LCBlbmQgfSA9IHByb3BzLnZhbHVlO1xuICAgICAgICBjb25zdCBzZWxlY3RlZFRleHQgPSB0ZXh0LnNsaWNlKHN0YXJ0LCBlbmQpO1xuICAgICAgICB0cmlnZ2VyKEZBUV9FVkVOVF9IQU5ETEVSX1NFTEVDVElPTl9DSEFOR0VELCB7XG4gICAgICAgICAgc2VsZWN0ZWRUZXh0OiBzZWxlY3RlZFRleHQsXG4gICAgICAgICAgc2VsZWN0ZWRIVE1MOiBzZWxlY3RlZFRleHRcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgaXNBY3RpdmU6IGZhbHNlXG4gICAgfSk7XG4gIH07XG5cbiAgd3AucmljaFRleHQucmVnaXN0ZXJGb3JtYXRUeXBlKFwid29yZGxpZnQvZmFxLXBsdWdpblwiLCB7XG4gICAgdGl0bGU6IFwiQWRkIFF1ZXN0aW9uL0Fuc3dlclwiLFxuICAgIHRhZ05hbWU6IFwiZmFxLWd1dGVuYmVyZ1wiLFxuICAgIGNsYXNzTmFtZTogbnVsbCxcbiAgICBlZGl0OiBBZGRGYXFCdXR0b25cbiAgfSk7XG59KSh3aW5kb3cud3ApO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///192\n')},21:function(module,exports){eval("module.exports = Backbone;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJCYWNrYm9uZVwiPzViYzAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiMjEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IEJhY2tib25lOyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///21\n")},30:function(module,__webpack_exports__,__webpack_require__){"use strict";eval('/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return classExtractor; });\n/**\n * This file is used to provide helpers for styling.\n * @author Naveen Muthusamy <naveen@wordlift.io>\n * @since 3.25.0\n *\n */\n\n/**\n * classExtractor helps to return class name by applying boolean logic.\n * @param classConfig {Object} should be in format { "class-name": Boolean }\n * @returns {string} combined class name.\n */\nconst classExtractor = classConfig => {\n  let className = "";\n\n  for (let key of Object.keys(classConfig)) {\n    if (classConfig[key]) {\n      className += ` ${key}`;\n    }\n  }\n\n  return className.trim();\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWFwcGluZ3MvYmxvY2tzL2hlbHBlci5qcz82ZWYwIl0sIm5hbWVzIjpbImNsYXNzRXh0cmFjdG9yIiwiY2xhc3NDb25maWciLCJjbGFzc05hbWUiLCJrZXkiLCJPYmplY3QiLCJrZXlzIiwidHJpbSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTs7Ozs7OztBQU9BOzs7OztBQUtPLE1BQU1BLGNBQWMsR0FBR0MsV0FBVyxJQUFJO0FBQzNDLE1BQUlDLFNBQVMsR0FBRyxFQUFoQjs7QUFDQSxPQUFLLElBQUlDLEdBQVQsSUFBZ0JDLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZSixXQUFaLENBQWhCLEVBQTBDO0FBQ3hDLFFBQUlBLFdBQVcsQ0FBQ0UsR0FBRCxDQUFmLEVBQXNCO0FBQ3BCRCxlQUFTLElBQUssSUFBR0MsR0FBSSxFQUFyQjtBQUNEO0FBQ0Y7O0FBQ0QsU0FBT0QsU0FBUyxDQUFDSSxJQUFWLEVBQVA7QUFDRCxDQVJNIiwiZmlsZSI6IjMwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBUaGlzIGZpbGUgaXMgdXNlZCB0byBwcm92aWRlIGhlbHBlcnMgZm9yIHN0eWxpbmcuXG4gKiBAYXV0aG9yIE5hdmVlbiBNdXRodXNhbXkgPG5hdmVlbkB3b3JkbGlmdC5pbz5cbiAqIEBzaW5jZSAzLjI1LjBcbiAqXG4gKi9cblxuLyoqXG4gKiBjbGFzc0V4dHJhY3RvciBoZWxwcyB0byByZXR1cm4gY2xhc3MgbmFtZSBieSBhcHBseWluZyBib29sZWFuIGxvZ2ljLlxuICogQHBhcmFtIGNsYXNzQ29uZmlnIHtPYmplY3R9IHNob3VsZCBiZSBpbiBmb3JtYXQgeyBcImNsYXNzLW5hbWVcIjogQm9vbGVhbiB9XG4gKiBAcmV0dXJucyB7c3RyaW5nfSBjb21iaW5lZCBjbGFzcyBuYW1lLlxuICovXG5leHBvcnQgY29uc3QgY2xhc3NFeHRyYWN0b3IgPSBjbGFzc0NvbmZpZyA9PiB7XG4gIGxldCBjbGFzc05hbWUgPSBcIlwiO1xuICBmb3IgKGxldCBrZXkgb2YgT2JqZWN0LmtleXMoY2xhc3NDb25maWcpKSB7XG4gICAgaWYgKGNsYXNzQ29uZmlnW2tleV0pIHtcbiAgICAgIGNsYXNzTmFtZSArPSBgICR7a2V5fWA7XG4gICAgfVxuICB9XG4gIHJldHVybiBjbGFzc05hbWUudHJpbSgpO1xufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///30\n')},39:function(module,__webpack_exports__,__webpack_require__){"use strict";eval('/* unused harmony export FAQ_REQUEST_ADD_NEW_QUESTION */\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FAQ_EVENT_HANDLER_SELECTION_CHANGED; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return FAQ_ITEMS_CHANGED; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return FAQ_HIGHLIGHT_TEXT; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return FAQ_ITEM_SELECTED_ON_TEXT_EDITOR; });\n/**\n * Constants for the FAQ hooks.\n *\n * @since 3.26.0\n * @author Naveen Muthusamy <naveen@wordlift.io>\n */\n\n/**\n * Event name when the text selection changed in any of text editor, emitted\n * from the hooks.\n * @type {string}\n */\nconst FAQ_REQUEST_ADD_NEW_QUESTION = "FAQ_REQUEST_ADD_NEW_QUESTION";\n/**\n * Event emitted by hook when the text selection is changed.\n * @type {string}\n */\n\nconst FAQ_EVENT_HANDLER_SELECTION_CHANGED = "FAQ_EVENT_HANDLER_SELECTION_CHANGED";\n/**\n * Event emitted by the store when the faq items are changed\n * @type {string}\n */\n\nconst FAQ_ITEMS_CHANGED = "FAQ_ITEMS_CHANGED";\n/**\n * Event emitted by the store when a question or answer\n * is added by ui, asking the editor to highlight the text.\n */\n\nconst FAQ_HIGHLIGHT_TEXT = "FAQ_HIGHLIGHT_TEXT";\n/**\n * Event emitted by the hook to event handler when the faq is selected by the user.\n */\n\nconst FAQ_ITEM_SELECTED_ON_TEXT_EDITOR = "FAQ_ITEM_SELECTED_ON_TEXT_EDITOR";//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZmFxL2NvbnN0YW50cy9mYXEtaG9vay1jb25zdGFudHMuanM/MmQ5OCJdLCJuYW1lcyI6WyJGQVFfUkVRVUVTVF9BRERfTkVXX1FVRVNUSU9OIiwiRkFRX0VWRU5UX0hBTkRMRVJfU0VMRUNUSU9OX0NIQU5HRUQiLCJGQVFfSVRFTVNfQ0hBTkdFRCIsIkZBUV9ISUdITElHSFRfVEVYVCIsIkZBUV9JVEVNX1NFTEVDVEVEX09OX1RFWFRfRURJVE9SIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7Ozs7QUFPQTs7Ozs7QUFLTyxNQUFNQSw0QkFBNEIsR0FBRyw4QkFBckM7QUFFUDs7Ozs7QUFJTyxNQUFNQyxtQ0FBbUMsR0FBRyxxQ0FBNUM7QUFFUDs7Ozs7QUFJTyxNQUFNQyxpQkFBaUIsR0FBRyxtQkFBMUI7QUFFUDs7Ozs7QUFJTyxNQUFNQyxrQkFBa0IsR0FBRyxvQkFBM0I7QUFHUDs7OztBQUdPLE1BQU1DLGdDQUFnQyxHQUFHLGtDQUF6QyIsImZpbGUiOiIzOS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29uc3RhbnRzIGZvciB0aGUgRkFRIGhvb2tzLlxuICpcbiAqIEBzaW5jZSAzLjI2LjBcbiAqIEBhdXRob3IgTmF2ZWVuIE11dGh1c2FteSA8bmF2ZWVuQHdvcmRsaWZ0LmlvPlxuICovXG5cbi8qKlxuICogRXZlbnQgbmFtZSB3aGVuIHRoZSB0ZXh0IHNlbGVjdGlvbiBjaGFuZ2VkIGluIGFueSBvZiB0ZXh0IGVkaXRvciwgZW1pdHRlZFxuICogZnJvbSB0aGUgaG9va3MuXG4gKiBAdHlwZSB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgRkFRX1JFUVVFU1RfQUREX05FV19RVUVTVElPTiA9IFwiRkFRX1JFUVVFU1RfQUREX05FV19RVUVTVElPTlwiO1xuXG4vKipcbiAqIEV2ZW50IGVtaXR0ZWQgYnkgaG9vayB3aGVuIHRoZSB0ZXh0IHNlbGVjdGlvbiBpcyBjaGFuZ2VkLlxuICogQHR5cGUge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IEZBUV9FVkVOVF9IQU5ETEVSX1NFTEVDVElPTl9DSEFOR0VEID0gXCJGQVFfRVZFTlRfSEFORExFUl9TRUxFQ1RJT05fQ0hBTkdFRFwiO1xuXG4vKipcbiAqIEV2ZW50IGVtaXR0ZWQgYnkgdGhlIHN0b3JlIHdoZW4gdGhlIGZhcSBpdGVtcyBhcmUgY2hhbmdlZFxuICogQHR5cGUge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IEZBUV9JVEVNU19DSEFOR0VEID0gXCJGQVFfSVRFTVNfQ0hBTkdFRFwiO1xuXG4vKipcbiAqIEV2ZW50IGVtaXR0ZWQgYnkgdGhlIHN0b3JlIHdoZW4gYSBxdWVzdGlvbiBvciBhbnN3ZXJcbiAqIGlzIGFkZGVkIGJ5IHVpLCBhc2tpbmcgdGhlIGVkaXRvciB0byBoaWdobGlnaHQgdGhlIHRleHQuXG4gKi9cbmV4cG9ydCBjb25zdCBGQVFfSElHSExJR0hUX1RFWFQgPSBcIkZBUV9ISUdITElHSFRfVEVYVFwiO1xuXG5cbi8qKlxuICogRXZlbnQgZW1pdHRlZCBieSB0aGUgaG9vayB0byBldmVudCBoYW5kbGVyIHdoZW4gdGhlIGZhcSBpcyBzZWxlY3RlZCBieSB0aGUgdXNlci5cbiAqL1xuZXhwb3J0IGNvbnN0IEZBUV9JVEVNX1NFTEVDVEVEX09OX1RFWFRfRURJVE9SID0gXCJGQVFfSVRFTV9TRUxFQ1RFRF9PTl9URVhUX0VESVRPUlwiO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///39\n')}});