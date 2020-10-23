<?php

use Wordlift\Dataset\Sync_Page;
use Wordlift\Dataset\Sync_Service;
use Wordlift\Dataset\Sync_Wpjson_Endpoint;
use Wordlift\Jsonld\Jsonld_Service;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Register the Dataset JSON Endpoint.
if ( apply_filters( 'wl_features__enable__dataset', true ) ) {
	$sync_service = new Sync_Service( $api_service, Jsonld_Service::get_instance() );
	new Sync_Wpjson_Endpoint( $sync_service );
	new Sync_Page();
}
