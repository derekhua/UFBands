'use strict';

//Setting up route
angular.module('concertbandapps').config(['$stateProvider',
	function($stateProvider) {
		// Concertbandapps state routing
		$stateProvider.
		state('listConcertbandapps', {
			url: '/concertbandapps',
			templateUrl: 'modules/concertbandapps/views/list-concertbandapps.client.view.html'
		}).
		state('createConcertbandapp', {
			url: '/concertbandapps/create',
			templateUrl: 'modules/concertbandapps/views/create-concertbandapp.client.view.html'
		}).
		state('viewConcertbandapp', {
			url: '/concertbandapps/:concertbandappId',
			templateUrl: 'modules/concertbandapps/views/view-concertbandapp.client.view.html'
		}).
		state('editConcertbandapp', {
			url: '/concertbandapps/:concertbandappId/edit',
			templateUrl: 'modules/concertbandapps/views/edit-concertbandapp.client.view.html'
		});
	}
]);