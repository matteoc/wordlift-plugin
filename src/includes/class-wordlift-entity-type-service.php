<?php
/**
 * Define the Entity Type Service.
 *
 * @since   3.7.0
 * @package Wordlift
 */

/**
 * The Wordlift_Entity_Type_Service provides functions to manipulate an entity
 * type.
 *
 * @since 3.7.0
 */
class Wordlift_Entity_Type_Service {

	/**
	 * The {@link Wordlift_Schema_Service} instance.
	 *
	 * @since  3.7.0
	 * @access private
	 * @var \Wordlift_Schema_Service $schema_service The {@link Wordlift_Schema_Service} instance.
	 */
	private $schema_service;

	/**
	 * A {@link Wordlift_Log_Service} instance.
	 *
	 * @since  3.8.0
	 * @access private
	 * @var \Wordlift_Log_Service $log A {@link Wordlift_Log_Service} instance.
	 */
	private $log;

	/**
	 * The {@link Wordlift_Entity_Type_Service} singleton instance.
	 *
	 * @since  3.7.0
	 * @access private
	 * @var \Wordlift_Entity_Type_Service $instance The {@link Wordlift_Entity_Type_Service} singleton instance.
	 */
	private static $instance;

	/**
	 * Wordlift_Entity_Type_Service constructor.
	 *
	 * @since 3.7.0
	 *
	 * @param \Wordlift_Schema_Service $schema_service The {@link Wordlift_Schema_Service} instance.
	 */
	public function __construct( $schema_service ) {

		$this->log = Wordlift_Log_Service::get_logger( 'Wordlift_Entity_Type_Service' );

		$this->schema_service = $schema_service;

		self::$instance = $this;

	}

	/**
	 * Get the {@link Wordlift_Entity_Type_Service} singleton instance.
	 *
	 * @since 3.7.0
	 * @return \Wordlift_Entity_Type_Service The {@link Wordlift_Entity_Type_Service} singleton instance.
	 */
	public static function get_instance() {

		return self::$instance;
	}

	/**
	 * Get the types associated with the specified entity post id.
	 *
	 * @since 3.7.0
	 *
	 * @param int $post_id The post id.
	 *
	 * @return array|null {
	 * An array of type properties or null if no term is associated
	 *
	 * @type string css_class     The css class, e.g. `wl-thing`.
	 * @type string uri           The schema.org class URI, e.g. `http://schema.org/Thing`.
	 * @type array  same_as       An array of same as attributes.
	 * @type array  custom_fields An array of custom fields.
	 * }
	 */
	public function get( $post_id ) {

		$post_type = get_post_type( $post_id );
		if ( Wordlift_Entity_Service::is_valid_entity_post_type( $post_type ) ) {
			// Get the type from the associated classification.

			$terms = wp_get_object_terms( $post_id, Wordlift_Entity_Types_Taxonomy_Service::TAXONOMY_NAME );

			if ( is_wp_error( $terms ) ) {
				// TODO: handle error
				return null;
			}

			// If there are not terms associated, default to article.
			if ( 0 === count( $terms ) ) {
				return array(
					'uri'       => 'http://schema.org/Article',
					'css_class' => 'wl-post',
				);
			}

			// Return the entity type with the specified id.
			return $this->schema_service->get_schema( $terms[0]->slug );

		} else {
			// Everything else is considered a Creative Work.
			return array(
				'uri'       => 'http://schema.org/Thing',
				'css_class' => 'wl-thing',
			);
		}

	}

	/**
	 * Set the main type for the specified entity post, given the type URI.
	 *
	 * @since 3.8.0
	 *
	 * @param int    $post_id  The post id.
	 * @param string $type_uri The type URI.
	 */
	public function set( $post_id, $type_uri ) {

		// If the type URI is empty we remove the type.
		if ( empty( $type_uri ) ) {
			$this->log->debug( "Removing entity type for post $post_id..." );

			wp_set_object_terms( $post_id, null, Wordlift_Entity_Types_Taxonomy_Service::TAXONOMY_NAME );

			return;
		}

		$this->log->debug( "Setting entity type for post $post_id..." );

		// Get all the terms bound to the wl_entity_type taxonomy.
		$terms = get_terms( Wordlift_Entity_Types_Taxonomy_Service::TAXONOMY_NAME, array(
			'hide_empty' => false,
			// Because of #334 (and the AAM plugin) we changed fields from 'id=>slug' to 'all'.
			// An issue has been opened with the AAM plugin author as well.
			//
			// see https://github.com/insideout10/wordlift-plugin/issues/334
			// see https://wordpress.org/support/topic/idslug-not-working-anymore?replies=1#post-8806863
			'fields'     => 'all',
		) );

		// Check which term matches the specified URI.
		foreach ( $terms as $term ) {

			$term_id   = $term->term_id;
			$term_slug = $term->slug;

			$this->log->trace( "Parsing term {$term->slug}..." );

			// Load the type data.
			$type = $this->schema_service->get_schema( $term_slug );

			// Set the related term ID.
			if ( $type_uri === $type['uri'] || $type_uri === $type['css_class'] ) {

				$this->log->debug( "Setting entity type [ post id :: $post_id ][ term id :: $term_id ][ term slug :: $term_slug ][ type uri :: {$type['uri']} ][ type css class :: {$type['css_class']} ]" );

				wp_set_object_terms( $post_id, (int) $term_id, Wordlift_Entity_Types_Taxonomy_Service::TAXONOMY_NAME );

				return;
			}
		}

		$this->log->error( "Type not found [ post id :: $post_id ][ type uri :: $type_uri ]" );

	}


	/**
	 * Check whether an entity type is set for the {@link WP_Post} with the
	 * specified id.
	 *
	 * @since 3.15.0
	 *
	 * @param int $post_id The {@link WP_Post}'s `id`.
	 *
	 * @return bool True if an entity type is set otherwise false.
	 */
	public function has_entity_type( $post_id ) {

		// Get the post terms for the specified post ID.
		$terms = wp_get_post_terms( $post_id, Wordlift_Entity_Types_Taxonomy_Service::TAXONOMY_NAME );

		// True if there's at least one term bound to the post.
		return ( 0 < count( $terms ) );
	}

}
