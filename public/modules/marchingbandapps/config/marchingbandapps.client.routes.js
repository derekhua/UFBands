'use strict';

//Setting up route
angular.module('marchingbandapps').config(['$stateProvider',
	function($stateProvider) {
		// Marchingbandapps state routing
		$stateProvider.
		state('listMarchingbandapps', {
			url: '/marchingbandapps',
			templateUrl: 'modules/marchingbandapps/views/list-marchingbandapps.client.view.html'
		}).
		state('createMarchingbandapp', {
			url: '/marchingbandapps/create',
			templateUrl: 'modules/marchingbandapps/views/create-marchingbandapp.client.view.html'
		}).
		state('viewMarchingbandapp', {
			url: '/marchingbandapps/:marchingbandappId',
			templateUrl: 'modules/marchingbandapps/views/view-marchingbandapp.client.view.html'
		}).
		state('editMarchingbandapp', {
			url: '/marchingbandapps/:marchingbandappId/edit',
			templateUrl: 'modules/marchingbandapps/views/edit-marchingbandapp.client.view.html'
		});
	}
]);