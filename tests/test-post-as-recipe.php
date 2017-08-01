<?php
/**
 * Created by PhpStorm.
 * User: david
 * Date: 01/08/2017
 * Time: 11:07
 */

class Wordlift_Post_As_Recipe_Test extends Wordlift_Unit_Test_Case {

	/**
	 * The {@link Wordlift_Entity_Type_Service} instance.
	 *
	 * @since  3.15.0
	 * @access private
	 * @var \Wordlift_Entity_Type_Service $entity_type_service The {@link Wordlift_Entity_Type_Service} instance.
	 */
	private $entity_type_service;

	/**
	 * The {@link Wordlift_Post_To_JsonLd_Converter} instance.
	 *
	 * @since  3.15.0
	 * @access private
	 * @var \Wordlift_Post_To_Jsonld_Converter $post_to_jsonld_converter The {@link Wordlift_Post_To_JsonLd_Converter} instance.
	 */
	private $post_to_jsonld_converter;

	/**
	 * @inheritdoc
	 */
	function setUp() {
		parent::setUp();

		$this->entity_type_service      = $this->get_wordlift_test()->get_entity_type_service();
		$this->post_to_jsonld_converter = $this->get_wordlift_test()->get_post_to_jsonld_converter();

	}

	/**
	 * Check that a {@link WP_Post} is automatically assigned with the `Article`
	 * entity type.
	 *
	 * @since 3.15.0
	 */
	public function test_post_as_article() {

		// Create a post
		$post_id = $this->factory->post->create( array(
			'status' => 'publish',
		) );

		// Check that the post by default is marked as `http://schema.org/Article`.
		$type = $this->entity_type_service->get( $post_id );

		// Assertions.
		$this->assertTrue( is_array( $type ) );
		$this->assertArrayHasKey( 'uri', $type, 'The type array must contain the schema.org URI.' );
		$this->assertEquals( 'http://schema.org/Article', $type['uri'], 'The schema.org URI must be http://schema.org/Article.' );

		// Try to find the post with an `article` taxonomy query.
		$posts = get_posts( array(
			'posts_per_page' => 1,
			'orderby'        => 'ID',
			'order'          => 'desc',
			'tax_query'      => array(
				array(
					'taxonomy' => Wordlift_Entity_Types_Taxonomy_Service::TAXONOMY_NAME,
					'field'    => 'slug',
					'terms'    => 'article',
				),
			),
		) );

		// JSON-LD.
		$jsonld    = $this->post_to_jsonld_converter->convert( $post_id );
		$permalink = get_permalink( $post_id );

		// Assertions.
		$this->assertCount( 1, $posts, 'There must be one post found.' );
		$this->assertEquals( $post_id, $posts[0]->ID, 'The found post ID must match the ID of the test post.' );
		$this->assertArraySubset( array(
			'@type'            => 'Article',
			'mainEntityOfPage' => $permalink,
		), $jsonld, 'Expect the JSON-LD to use `Article`.' );

	}

	/**
	 * Check that a {@link WP_Post} can be assigned the `Recipe` entity type.
	 *
	 * @since 3.15.0
	 */
	public function test_post_as_recipe() {

		// Create a post
		$post_id = $this->factory->post->create();

		// Assign the `Recipe` class.
		$this->entity_type_service->set( $post_id, 'http://schema.org/Recipe' );

		// Check that the post is now configured as `http://schema.org/Recipe`.
		$type = $this->entity_type_service->get( $post_id );

		// Assertions.
		$this->assertTrue( is_array( $type ) );
		$this->assertArrayHasKey( 'uri', $type, 'The type array must contain the schema.org URI.' );
		$this->assertEquals( 'http://schema.org/Recipe', $type['uri'], 'The schema.org URI must be http://schema.org/Recipe.' );

		// Try to find the post with an `article` taxonomy query.
		$posts = get_posts( array(
			'posts_per_page' => 1,
			'orderby'        => 'ID',
			'order'          => 'desc',
			'tax_query'      => array(
				array(
					'taxonomy' => Wordlift_Entity_Types_Taxonomy_Service::TAXONOMY_NAME,
					'field'    => 'slug',
					'terms'    => 'recipe',
				),
			),
		) );

		// Assertions.
		$this->assertCount( 1, $posts, 'There must be one post found.' );
		$this->assertEquals( $post_id, $posts[0]->ID, 'The found post ID must match the ID of the test post.' );

		// JSON-LD.
		$jsonld    = $this->post_to_jsonld_converter->convert( $post_id );
		$permalink = get_permalink( $post_id );

		// Assertions.
		$this->assertCount( 1, $posts, 'There must be one post found.' );
		$this->assertEquals( $post_id, $posts[0]->ID, 'The found post ID must match the ID of the test post.' );
		$this->assertArraySubset( array(
			'@type'            => 'Recipe',
			'mainEntityOfPage' => $permalink,
		), $jsonld, 'Expect the JSON-LD to use `Recipe`.' );

	}

}
