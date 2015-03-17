'use strict';

//Setting up route
angular.module('bandapplications').config(['$stateProvider',
	function($stateProvider) {
		// Bandapplications state routing
		$stateProvider.
		state('listBandapplications', {
			url: '/bandapplications',
			templateUrl: 'modules/bandapplications/views/list-bandapplications.client.view.html'
		}).
		state('createBandapplication', {
			url: '/bandapplications/create',
			templateUrl: 'modules/bandapplications/views/create-bandapplication.client.view.html'
		}).
		state('viewBandapplication', {
			url: '/bandapplications/:bandapplicationId',
			templateUrl: 'modules/bandapplications/views/view-bandapplication.client.view.html'
		}).
		state('editBandapplication', {
			url: '/bandapplications/:bandapplicationId/edit',
			templateUrl: 'modules/bandapplications/views/edit-bandapplication.client.view.html'
		});
	}
]);