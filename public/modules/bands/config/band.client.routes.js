'use strict';

//Setting up route
angular.module('bands').config(['$stateProvider',
	function($stateProvider) {
		// Bands state routing
		$stateProvider.
		state('list-bands', {
			url: '/bands',
			templateUrl: 'modules/bands/views/list-band.client.view.html'
		}).
		state('edit-band', {
			url: '/bands/:bandId',
			templateUrl: 'modules/bands/views/edit-band.client.view.html'
		});
	}
]);