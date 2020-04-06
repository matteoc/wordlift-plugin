<?php
/**
 * This file hooks to WordPress' post-related events in order to store entities.
 *
 * In particular we register the `wordlift/classification` block type and hook to the `wp_insert_post_data` hook
 * to parse the block type, retrieve the entities data and store it to the database.
 *
 * @authod David Riccitelli <david@wordlift.io>
 * @since 3.23.0
 *
 * @package Wordlift
 * @subpackage Wordlift\Post
 */

namespace Wordlift\Post;

use Wordlift\Entity\Entity_Store;

class Post_Adapter {

	/**
	 * A {@link Wordlift_Log_Service} logging instance.
	 *
	 * @access private
	 * @var \Wordlift_Log_Service A {@link Wordlift_Log_Service} logging instance.
	 */
	private $log;

	/**
	 * A {@link Wordlift_Entity_Service} instance.
	 *
	 * @access private
	 * @var \Wordlift_Entity_Service A {@link Wordlift_Entity_Service} instance.
	 */
	private $entity_service;

	/**
	 * A {@link Entity_Store} instance.
	 *
	 * @access private
	 * @var Entity_Store $entity_store A {@link Entity_Store} instance.
	 */
	private $entity_store;

	public function __construct() {

		// Bail out if block editor's functions aren't available.
		if ( ! function_exists( 'register_block_type' ) || ! function_exists( 'parse_blocks' ) ) {
			return;
		}

		$this->log = \Wordlift_Log_Service::get_logger( get_class() );

		$this->entity_service = \Wordlift_Entity_Service::get_instance();
		$this->entity_store   = Entity_Store::get_instance();

		add_action( 'init', array( $this, 'init' ) );
		add_filter( 'wp_insert_post_data', array( $this, 'wp_insert_post_data' ), 10, 2 );

	}

	/**
	 * Initialize by registering our block type `wordlift/classification`, required for {@link parse_blocks) to work
	 * correctly.
	 */
	public function init() {

		register_block_type( 'wordlift/classification', array(
			'editor_script' => 'wl-block-editor',
			'attributes'    => array(
				'entities' => array( 'type' => 'array' ),
			),
		) );

	}

	/**
	 * A sample structure:
	 *
	 * {
	 *   "entities": [
	 *     {
	 *       "annotations": {
	 *         "urn:enhancement-7e8e66fc": {
	 *           "start": 3480,
	 *           "end": 3486,
	 *           "text": "libero"
	 *         }
	 *       },
	 *       "description": "Le libero ou libéro est un poste défensif du volley-ball. Des règles particulières le concernant ont été introduites à la fin des années 1990. De par sa spécificité, le libéro a un statut à part au sein d’une équipe de volley-ball. Pour être identifié, il doit porter un uniforme qui contraste avec ceux des autres membres de son équipe, titulaires ou remplaçants.",
	 *       "id": "http://fr.dbpedia.org/resource/Libero_(volley-ball)",
	 *       "label": "Libero (volley-ball)",
	 *       "mainType": "other",
	 *       "occurrences": ["urn:enhancement-7e8e66fc"],
	 *       "sameAs": null,
	 *       "synonyms": [],
	 *       "types": ["other"]
	 *     }
	 *   ]
	 * }
	 *
	 * @param array $data An array of slashed post data.
	 * @param array $postarr An array of sanitized, but otherwise unmodified post data.
	 *
	 * @return array The data array.
	 * @throws \Exception
	 */
	public function wp_insert_post_data( $data, $postarr ) {

		$this->log->trace( "The following data has been received by `wp_insert_post_data`:\n"
		                   . var_export( $data, true ) );

		try {
			$entities = $this->parse_content( wp_unslash( $data['post_content'] ) );

			foreach ( $entities as $entity ) {
				$this->create_or_update_entity( $entity, $data['post_status'] );
			}

		} catch ( \Exception $e ) {
			$this->log->error( $e->getMessage() );
		}

		return $data;
	}

	/**
	 * Parse the post content to find the `wordlift/classification` block and return the entities' data.
	 *
	 * @param string $post_content The post content.
	 *
	 * @return array An array of entities' structures.
	 * @throws \Exception
	 */
	private function parse_content( $post_content ) {

		$all_blocks = parse_blocks( $post_content );
		$this->log->trace( "The following blocks have been parsed while in `wp_insert_post`:\n"
		                   . var_export( $all_blocks, true ) );

		$blocks = array_filter( $all_blocks, function ( $item ) {
			return ! empty( $item['blockName'] ) && 'wordlift/classification' === $item['blockName'];
		} );

		// Bail out if the blocks' array is empty.
		if ( empty( $blocks ) ) {
			return array();
		}

		$block = current( $blocks );
		$this->log->trace( "The following block has been found while in `wp_insert_post`:\n"
		                   . var_export( $block, true ) );

		// Bail out if the entities array is empty.
		if ( empty( $block['attrs'] ) && empty( $block['attrs']['entities'] ) ) {
			return array();
		}

		return $block['attrs']['entities'];
	}

	/**
	 * Collect entity labels from the entity array.
	 *
	 * This function expects an array with the following keys:
	 *
	 * array(
	 *   'label'       => ...,
	 *   'synonyms'    => array( ... ),
	 *   'annotations' => array(
	 *     ...id...      => array( text => ... ),
	 *   ),
	 *   'occurrences' => array( ... ),
	 * )
	 *
	 * and it is going to output an array with all the labels, keeping the `label` at first position:
	 *
	 * array(
	 *   ...label...,
	 *   ...synonyms...,
	 *   ...texts...,
	 * )
	 *
	 * This function is going to collect the label from the `label` property, from the `synonyms` property and from
	 * `annotations` property. Since the `annotations` property contains all the annotations including those that
	 * haven't been selected, this function is going to only get the `text` for the annotations property listed in
	 * `occurrences`.
	 *
	 * @param array $entity {
	 *  The entity data.
	 *
	 * @type string $label The entity label.
	 * @type array $synonyms The entity synonyms.
	 * @type array $occurrences The selected occurrences.
	 * @type array $annotations The annotations.
	 * }
	 *
	 * @return array An array of labels.
	 */
	public function get_labels( $entity ) {

		$args = wp_parse_args( $entity, array(
			'label'       => array(),
			'synonyms'    => array(),
			'annotations' => array(),
			'occurrences' => array(),
		) );

		// We gather all the labels, occurrences texts and synonyms into one array.
		$initial = array_merge(
			(array) $args['label'],
			(array) $args['synonyms']
		);

		$annotations = $args['annotations'];

		return array_reduce( $args['occurrences'], function ( $carry, $item ) use ( $annotations ) {

			// Bail out if occurrences->$item->text isn't set or its contents are already
			// in `$carry`.
			if ( ! isset( $annotations[ $item ]['text'] )
			     || in_array( $annotations[ $item ]['text'], $carry ) ) {
				return $carry;
			}

			// Push the label.
			$carry[] = $annotations[ $item ]['text'];

			return $carry;
		}, $initial );
	}

	/**
	 * Create or update the entity.
	 *
	 * An entity lookup is performed on the local vocabulary using the `id` and `sameAs` URIs. If an entity is found
	 * the {@link Entity_Store} update function is called to update the `labels` and the `sameAs` values.
	 *
	 * If an entity is not found the {@link Entity_Store} create function is called to create a new entity.
	 *
	 * @param array $entity {
	 * The entity parameters.
	 *
	 * @type string The entity item id URI.
	 * @type string|array The entity sameAs URI(s).
	 * @type string $description The entity description.
	 * }
	 *
	 * @param       $string $post_status The post status, default 'draft'.
	 *
	 * @return int|\WP_Error
	 * @throws \Exception
	 */
	private function create_or_update_entity( $entity, $post_status = 'draft' ) {

		// Get only valid IDs.
		$ids = array_filter( (array) $entity['id'], function ( $id ) {
			return preg_match( '|^https?://|', $id );
		} );

		$uris = array_merge(
			(array) $ids,
			(array) $entity['sameAs']
		);

		$post = $this->get_first_matching_entity_by_uri( $uris );

		$this->log->trace( 'Entity' . ( empty( $post ) ? ' not' : '' ) . " found with the following URIs:\n"
		                   . var_export( $uris, true ) );

		// Get the labels.
		$labels = $this->get_labels( $entity );

		if ( empty( $post ) ) {
			// Create the entity if it doesn't exist.
			$post_id = $this->entity_store->create( array(
				'labels'      => $labels,
				'description' => $entity['description'],
				'same_as'     => $uris,
			), $post_status );

			// Return the WP_Error if we got one.
			if ( is_wp_error( $post_id ) ) {
				return $post_id;
			}

			// Add the entity type.
			if ( isset( $entity['mainType'] ) ) {
				wp_set_object_terms( $post_id, $entity['mainType'], \Wordlift_Entity_Type_Taxonomy_Service::TAXONOMY_NAME );
			}
		} else {
			// Update the entity otherwise.
			$post_id = $this->entity_store->update( array(
				'ID'      => $post->ID,
				'labels'  => $labels,
				'same_as' => $uris,
			) );

			// Add the entity type.
			if ( isset( $entity['mainType'] ) ) {
				wp_add_object_terms( $post_id, $entity['mainType'], \Wordlift_Entity_Type_Taxonomy_Service::TAXONOMY_NAME );
			}
		}

		return $post_id;
	}

	/**
	 * Get the first matching entity for the provided URI array.
	 *
	 * Entities IDs and sameAs are searched.
	 *
	 * @param array $uris An array of URIs.
	 *
	 * @return \WP_Post|null The entity WP_Post if found or null if not found.
	 */
	private function get_first_matching_entity_by_uri( $uris ) {

		foreach ( $uris as $uri ) {
			$existing_entity = $this->entity_service->get_entity_post_by_uri( $uri );
			if ( isset( $existing_entity ) ) {
				return $existing_entity;
			}
		}

		return null;
	}

	//	/**
//	 * @param int      $post_ID Post ID.
//	 * @param \WP_Post $post Post object.
//	 * @param bool     $update Whether this is an existing post being updated or not.
//	 *
//	 * @throws \Exception
//	 */
//	public function wp_insert_post( $post_ID, $post, $update ) {
//
//		preg_match_all(
//			'/<span id="[^"]+" class="textannotation disambiguated(?:\s.*)?" itemid="([^"]+)">/i', $post->post_content, $matches
//		);
//
//		$uris = array_unique( $matches[1] );
//		// $this->log->trace( "`wp_insert_post` received the following post content:\n" . $post->post_content );
//		$this->log->trace( count( $uris ) . " URI(s) found in post_content:\n"
//		                   . var_export( $uris, true ) );
//
//		$query_args = array(
//			// See https://github.com/insideout10/wordlift-plugin/issues/654.
//			'ignore_sticky_posts' => 1,
//			'posts_per_page'      => - 1,
//			'numberposts'         => - 1,
//			'post_status'         => 'any',
//			'post_type'           => \Wordlift_Entity_Service::valid_entity_post_types(),
//			'meta_query'          => array(
//				'relation' => 'OR',
//				array(
//					'key'     => WL_ENTITY_URL_META_NAME,
//					'value'   => $uris,
//					'compare' => 'IN',
//				),
//				array(
//					'key'     => \Wordlift_Schema_Service::FIELD_SAME_AS,
//					'value'   => $uris,
//					'compare' => 'IN',
//				),
//			),
//		);
//
//		$posts = get_posts( $query_args );
//
//		$this->log->trace( count( $posts ) . " post(s) found in post_content:\n"
//		                   . var_export( $posts, true ) );
//
////		wp_die();
//
////
////		$data = (array) $post;
////
////		$this->log->trace( "The following data has been received with `wp_insert_post`:\n"
////		                   . var_export( $data, true ) . "\n"
////		                   . "Called from:\n"
////		                   . var_export( debug_backtrace( DEBUG_BACKTRACE_IGNORE_ARGS, 10 ), true ) );
////
////		// Bail out if there's no post_content or no `wordlift/classification` block.
////		if ( empty( $data['post_content'] )
////		     || ! function_exists( 'has_block' )
////		     || ! function_exists( 'parse_blocks' )
////		     || ! has_block( 'wordlift/classification', $data['post_content'] ) ) {
////			return;
////		}
////
////		$this->on_insert_post( $data['post_content'] );
//	}

}
