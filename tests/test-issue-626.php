<?php
/**
 * Tests: Issue 662
 *
 * JSON-LD is generated by the plugin when the an AJAX call is made. JSON-LD
 * can be generated for the WebSite or for a post/entity. Issue #626 is about
 * caching the JSON-LD for posts/entities.
 *
 * The AJAX request calls the {@link Wordlift_JsonLd_Service} `get` function which
 * in turn uses `get_jsonld`. This is the function we're going to test: we want
 * to test the different caching conditions. The test context is to generated
 * some posts and entities and connect them together and see how the cache reacts
 * when the requested entity or a referenced entity is changed.
 *
 * Tests:
 * - create some posts,
 * - create some entities,
 * - connect posts to entities,
 * - connect entities to entities,
 * - get the JSON-LD of a post (1st time not cached),
 * - get the JSON-LD of a post (2nd time cached) ,
 * - get the JSON-LD of an entity (1st time not cached),
 * - change publisher, invalidate cache.
 *
 *
 * @since      3.16.0
 * @package    Wordlift
 * @subpackage Wordlift/tests
 */

/**
 * Define the {@link Wordlift_Issue_626} class.
 *
 * @since      3.16.0
 * @package    Wordlift
 * @subpackage Wordlift/tests
 * @group issue
 */
class Wordlift_Issue_626 extends Wordlift_Unit_Test_Case {

	/**
	 * The {@link Wordlift_JsonLd_Service} instance.
	 *
	 * @since 3.16.0
	 *
	 * @var \Wordlift_Jsonld_Service $jsonld_service The {@link Wordlift_JsonLd_Service} instance.
	 */
	private $jsonld_service;

	/**
	 * The {@link Wordlift_Sample_Data_Service} instance.
	 *
	 * @since 3.16.0
	 *
	 * @var \Wordlift_Sample_Data_Service $sample_data_service The {@link Wordlift_Sample_Data_Service} instance.
	 */
	private $sample_data_service;

	/**
	 * The {@link Wordlift_Cached_Post_Converter} instance.
	 *
	 * @since 3.16.0
	 * @var \Wordlift_Cached_Post_Converter $cached_postid_to_jsonld_converter The {@link Wordlift_Cached_Post_Converter} instance.
	 */
	private $cached_postid_to_jsonld_converter;

	/**
	 * The {@link Wordlift_Relation_Service} instance.
	 *
	 * @since  3.16.0
	 * @access private
	 * @var \Wordlift_Relation_Service $relation_service The {@link Wordlift_Relation_Service} instance.
	 */
	private $relation_service;

	/**
	 * The {@link Wordlift_Entity_Service} instance.
	 *
	 * @since  3.16.0
	 * @access private
	 * @var \Wordlift_Entity_Service $entity_service The {@link Wordlift_Entity_Service} instance.
	 */
	private $entity_service;

	/**
	 * The {@link \Wordlift_User_Service| instance.
	 *
	 * @since  3.16.0
	 * @access private
	 * @var \Wordlift_User_Service $user_service The {@link \Wordlift_User_Service| instance.
	 */
	private $user_service;

	/**
	 * The {@link Wordlift_Postid_To_Jsonld_Converter} instance.
	 *
	 * @since  3.16.0
	 * @access private
	 * @var \Wordlift_Postid_To_Jsonld_Converter $postid_to_jsonld_converter The {@link Wordlift_Postid_To_Jsonld_Converter} instance.
	 */
	private $postid_to_jsonld_converter;

	/**
	 * @inheritdoc
	 */
	function setUp() {
		parent::setUp();

		$wordlift_test = $this->get_wordlift_test();

		$this->jsonld_service                    = $wordlift_test->get_jsonld_service();
		$this->sample_data_service               = $wordlift_test->get_sample_data_service();
		$this->cached_postid_to_jsonld_converter = $wordlift_test->get_cached_postid_to_jsonld_converter();
		$this->postid_to_jsonld_converter        = $wordlift_test->get_postid_to_jsonld_converter();
		$this->relation_service                  = $wordlift_test->get_relation_service();
		$this->entity_service                    = $wordlift_test->get_entity_service();
		$this->user_service                      = $wordlift_test->get_user_service();

		// Clear the cache.
//		do_action( 'wl_ttl_cache_cleaner__flush' );
		$ttl_cache_cleaner = new \Wordlift\Cache\Ttl_Cache_Cleaner();
		$ttl_cache_cleaner->flush();
	}

	/**
	 * Test the post conversion.
	 *
	 * @since 3.16.0
	 */
	public function test() {

		// Create the sample data.
		$this->sample_data_service->create();

		// Get post #5, i.e. the post with relations to all the other entities.
		$post_1 = $this->get_post( 'post_5' );
		$this->_test_that_the_non_cached_and_the_cached_results_are_equal( $post_1 );

		$post_2 = $this->get_post( 'nullam_tempor_lectus_sit_amet_tincidunt_euismod' );
		$this->_test_that_the_non_cached_and_the_cached_results_are_equal( $post_2 );

		// Delete the sample data.
		$this->sample_data_service->delete();

	}


	/**
	 * In this test we create sample data and then we call the converter twice.
	 * The first time we expect non cached data, the second time we expect cached
	 * data and both time we expect the data to match the results we get by
	 * calling the converter directly with no caching.
	 *
	 * @param \WP_Post $post The {@link WP_Post} to test.
	 *
	 * @since 3.16.0
	 *
	 */
	private function _test_that_the_non_cached_and_the_cached_results_are_equal( $post ) {

		// Check that we have a valid value.
		$this->assertTrue( $post instanceof WP_Post );

		// Check that the post isn't cached the 1st time and it's cached the 2nd.
		$this->assert_no_cache_and_then_cache( $post->ID );

		// Now change the post title and check that the cache is deleted.
		$result = wp_update_post( array(
			'ID'         => $post->ID,
			'post_title' => uniqid( 'title-' ),
		) );

		$this->assertFalse( is_wp_error( $result ) );

		// Check that the post isn't cached the 1st time and it's cached the 2nd.
		$this->assert_no_cache_and_then_cache( $post->ID );

		// Try adding a meta.
		add_post_meta( $post->ID, '_meta_test', uniqid( 'meta-' ) );

		// Check that the post isn't cached the 1st time and it's cached the 2nd.
		$this->assert_no_cache_and_then_cache( $post->ID );

		// Try updating a meta.
		update_post_meta( $post->ID, '_meta_test', uniqid( 'meta-' ) );

		// Check that the post isn't cached the 1st time and it's cached the 2nd.
		$this->assert_no_cache_and_then_cache( $post->ID );

		// Try deleting a meta.
		delete_post_meta( $post->ID, '_meta_test' );

		// Check that the post isn't cached the 1st time and it's cached the 2nd.
		$this->assert_no_cache_and_then_cache( $post->ID );

		// Get the current relations.
		$relations_1 = $this->relation_service->get_objects( $post->ID );

		// Delete the relations.
		wl_core_delete_relation_instances( $post->ID );

		// Check that we don't have any more relations.
		$relations_2 = $this->relation_service->get_objects( $post->ID );
		$this->assertCount( 0, $relations_2 );

		// Check that the post isn't cached the 1st time and it's cached the 2nd.
		$this->assert_no_cache_and_then_cache( $post->ID );

		// Add back the relations.
		$this->assertNotEmpty( $relations_1, 'There must be at least one relation.' );
		foreach ( $relations_1 as $relation ) {
			wl_core_add_relation_instance( $post->ID, $this->entity_service->get_classification_scope_for( $relation->ID ), $relation->ID );
		}

		// Check that the relations are back as before.
		$relations_3 = $this->relation_service->get_objects( $post->ID );

		// We're using PHP Unit 4:
		// assertEquals( $expected, $actual, $message = '', $delta = 0.0, $maxDepth = 10, $canonicalize = false )
		$this->assertEquals( $relations_1, $relations_3, '', 0.0, 10, true );

		// Check that the post isn't cached the 1st time and it's cached the 2nd.
		$this->assert_no_cache_and_then_cache( $post->ID );

		// Now change the author.
		$author_id      = $post->post_author;
		$author_post_id = $this->user_service->get_entity( $author_id );
		$this->assertNotEmpty( $author_post_id );

		// Check that author post isn't cached and then cached.
		$this->assert_no_cache_and_then_cache( $author_post_id );

		// Update and check again.
		wp_update_post( array(
			'ID'         => $author_post_id,
			'post_title' => 'Stephen King',
		) );

		// Check that author post isn't cached and then cached.
		$this->assert_no_cache_and_then_cache( $author_post_id );

		// Check that the post is still cached since the author is referenced
		// via its URI.
		$this->assert_cache( $post->ID, true );

		// Now try updating the publisher.
		wp_update_post( array(
			'ID'         => $this->publisher_id,
			'post_title' => uniqid( 'Acme Inc. ' ),
		) );

		// Check that author post isn't cached and then cached.
		$this->assert_no_cache_and_then_cache( $post->ID );

		// The following won't work until https://github.com/insideout10/wordlift-plugin/issues/702
		// is resolved:
		//		foreach ( $relations_3 as $relation ) {
		//			wp_delete_post( $relation->ID );
		//
		//			// Check that the post isn't cached the 1st time and it's cached the 2nd.
		//			$this->assert_no_cache_and_then_cache( $post->ID );
		//		}

	}

	/**
	 * Get post #5, i.e. the sample post connected to all the entities.
	 *
	 * @return WP_Post Post #5.
	 * @since 3.16.0
	 */
	private function get_post( $post_name ) {

		// Get the post #5 which is the one that binds to all the entities.
		$posts = get_posts( array(
			'name'        => $post_name,
			'numberposts' => 1,
			'post_type'   => 'any'
		) );

		// Check that we got one post.
		$this->assertCount( 1, $posts );

		// Get the first post.
		$post = current( $posts );

		return $post;
	}

	/**
	 * Test the conversion.
	 *
	 * This function will convert the provided post and check that the conversion
	 * is either cached or non cached and that it is equal to the non cached
	 * version.
	 *
	 * @param int $post_id The {@link WP_Post} id.
	 * @param bool $expect Expect the response to be cached or not (by default cached).
	 *
	 * @return mixed The cached response.
	 * @since 3.16.0
	 *
	 */
	private function assert_cache( $post_id, $expect = true ) {
		global $wpdb;

		// Store the number of queries.
		$num_queries = $wpdb->num_queries;

		// Get the cached response.
		$references_infos = array();
		$cached           = $this->cached_postid_to_jsonld_converter->convert( $post_id, $cached_references, $references_infos, $cache );

		// Expect the first response not to be cached.
		$this->assertEquals( $expect, $cache, "The first response for post $post_id " . ( $expect ? 'should' : 'shouldn`t' ) . ' be cached.' );

		// If the response is cached we expect no queries.
		$this->assertEquals( $cache, $num_queries === $wpdb->num_queries );

		// Get the original - non-cached - response.
		$original = $this->postid_to_jsonld_converter->convert( $post_id, $original_references );

		// Check that the responses match.
		$this->assertEquals( $original, $cached );
		$this->assertEquals( $original_references, $cached_references );

		return $cached;
	}

	/**
	 * Calls `assert_cache` twice, the first time expects no cache, the 2nd time
	 * expects caching.
	 *
	 * @param int $post_id The {@link WP_Post} id.
	 *
	 * @return mixed The cached response.
	 * @since 3.16.0
	 *
	 */
	private function assert_no_cache_and_then_cache( $post_id ) {

		$cached_1 = $this->assert_cache( $post_id, false );
		$cached_2 = $this->assert_cache( $post_id, true );

		$this->assertEquals( $cached_1, $cached_2 );

		return $cached_2;
	}

}
