<?php
/**
 * This file defines the Analysis_Response_Ops_Test class providing the unit tests for the Analysis_Response_Ops class.
 *
 * @since 3.21.5
 * @author David Riccitelli <david@wordlift.io>
 * @package Wordlift\Analysis\Response
 * @group analysis
 */

namespace Wordlift\Analysis\Response;

use Exception;
use stdClass;
use Wordlift_Entity_Type_Taxonomy_Service;

/**
 * Define the {@link Analysis_Response_Ops_Test} class.
 *
 * @since 3.21.5
 * @package Wordlift\Analysis\Response
 * @group api
 */
class Analysis_Response_Ops_Test extends \Wordlift_Unit_Test_Case {

	/**
	 * @var \Wordlift_Entity_Service
	 */
	private $entity_service;

	function setUp() {
		parent::setUp(); // TODO: Change the autogenerated stub

		$this->entity_service = $this->get_wordlift_test()->get_entity_service();
	}

	/**
	 * Test that an exception is raised when the passed response is not an array.
	 *
	 * @expectedException Exception
	 * @expectedExceptionMessage `body` is required in response.
	 */
	public function test_response_not_an_array() {

		Analysis_Response_Ops_Factory::get_instance()
		                             ->create_with_response( "something else" );

	}

	/**
	 * Test that an exception is raised when the passed response doesn't contain the `body` key.
	 *
	 * @expectedException Exception
	 * @expectedExceptionMessage `body` is required in response.
	 */
	public function test_response_array_without_body() {

		Analysis_Response_Ops_Factory::get_instance()
		                             ->create_with_response( array() );

	}

	/**
	 * Test that an exception is raised when the `body` is null.
	 *
	 * @expectedException Exception
	 * @expectedExceptionMessage `body` is required in response.
	 */
	public function test_response_body() {

		Analysis_Response_Ops_Factory::get_instance()
		                             ->create_with_response( array( 'body' => null ) );

	}

	/**
	 * Test the `make_entities_local` function.
	 *
	 * In this test we create an entity with a remote sameAs, e.g. `http://example.org/xyz`. Then we build an
	 * Analysis Response with this entity along with one annotation which references the entity using the `entityMatches`
	 * property and we give it to the {@link Analysis_Response_Ops} instance.
	 *
	 * We then call  the `make_entities_local` function and we check that the entities key has been switched to the local
	 * URI and that the remote URI is set into the sameAs. We also check that the reference in the entityMatches is
	 * switched to the local URI.
	 *
	 * @since 3.21.5
	 */
	public function test_make_entities_local() {

		$dataset_uri = $this->configuration_service->get_dataset_uri();
		if ( empty( $dataset_uri ) ) {
			$this->markTestSkipped( 'This test requires the dataset URI to be set.' );
		}

		// Create the entity post.
		$post_id = $this->factory()->post->create( array(
			'post_type'   => 'entity',
			'post_status' => 'draft',
			'post_title'  => 'Test Analysis Response Ops test_make_entities_local'
		) );

		// Get the local URI (generated by WLP) and a fake remote URI.
		$local_uri  = $this->entity_service->get_uri( $post_id );
		$remote_uri = "http://example.org/$post_id";

		// Assign the remote URI as sameAs.
		add_post_meta( $post_id, \Wordlift_Schema_Service::FIELD_SAME_AS, $remote_uri );

		// Build the response.
		$analysis_response                                            = new StdClass();
		$analysis_response->entities                                  = new StdClass();
		$analysis_response->entities->{$remote_uri}                   = new StdClass();
		$analysis_response->annotations                               = new StdClass();
		$analysis_response->annotations->{"urn:enhancement-12345678"} = new StdClass();
		$analysis_response->annotations->{"urn:enhancement-12345678"}
			->entityMatches                                           = array( new StdClass() );
		$analysis_response->annotations->{"urn:enhancement-12345678"}
			->entityMatches[0]->entityId                              = $remote_uri;

		// Create the Analysis_Response_Ops with the response.
		$ops = Analysis_Response_Ops_Factory::get_instance()->create_with_response(
			array( 'body' => json_encode( $analysis_response, JSON_UNESCAPED_UNICODE ) ) );

		// Make local and get the JSON.
		$json = json_decode( $ops->make_entities_local()->to_string(), true );

		$this->assertArrayHasKey( $local_uri, $json['entities'],
			'The entities array must contain the local URI: ' . wp_json_encode( $json, 128 ) );
		$this->assertContains( $remote_uri, $json['entities'][ $local_uri ]['sameAs'], 'The sameAs array must contain the remote URI.' );
		$this->assertEquals( $local_uri, $json['annotations']['urn:enhancement-12345678']['entityMatches'][0]['entityId'], 'The entityId must match the local URI.' );

	}

	public function test_local_entity_brings_in_annotations() {

		// Create an entity, by also setting its entity URL and type.
		$post_id = $this->factory()->post->create( array(
			'post_type'   => 'entity',
			'post_title'  => 'Analysis Response Ops 1',
			'post_status' => 'publish',
		) );
		update_post_meta( $post_id, 'entity_url', 'http://example.org/content_analysis_test_1' );
		wp_add_object_terms( $post_id, 'thing', Wordlift_Entity_Type_Taxonomy_Service::TAXONOMY_NAME );

		// Get the mock request.
		$request_body = file_get_contents( dirname( __FILE__ ) . '/assets/content-analysis-request-1.json' );
		$request_json = json_decode( $request_body, true );

		$response_json = Analysis_Response_Ops_Factory
			::get_instance()
			->create( json_decode( '{ "entities": {}, "annotations": {}, "topics": {} }' ) )
			->make_entities_local()
			->add_occurrences( $request_json['content'] )
			->get_json();

		$this->assertTrue( isset( $response_json->entities ), 'The entities property must exist.' );
		$this->assertTrue( isset( $response_json->annotations ), 'The annotations property must exist.' );
		$this->assertTrue( isset( $response_json->topics ), 'The topics property must exist.' );

		$this->assertTrue( isset( $response_json->entities->{"http://example.org/content_analysis_test_1"} ),
			'Our mock entity must be there.' );

		$entity = $response_json->entities->{"http://example.org/content_analysis_test_1"};

		$this->assertTrue( isset( $entity->occurrences ), 'Our mock entity must have occurrences.' );
		$this->assertTrue( is_array( $entity->occurrences ), 'Our entity`s occurrences must be an array.' );
		$this->assertEquals( array( 'urn:content-classification-test-1' ), $entity->occurrences, 'Our entity`s occurrences must match.' );

		$this->assertTrue( isset( $entity->annotations ), 'Our mock entity must have annotations.' );
		$this->assertTrue( is_array( $entity->annotations ), 'Our entity`s annotations must be an array.' );
		$this->assertEquals( array( 'urn:content-classification-test-1' => array( 'id' => 'urn:content-classification-test-1' ), ), $entity->annotations,
			'Our mock entity must have annotations.' );

	}

}
