'use strict';

// Setting up route
angular.module('forms').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('listForms', {
			url: '/forms',
			templateUrl: 'modules/articles/views/list-articles.client.view.html' //todo
		}).
		state('apply', {
			url: '/forms/apply',
			templateUrl: 'modules/articles/views/create-article.client.view.html' //todo
		}).
		state('viewForm', {
			url: '/forms/:formId',
			templateUrl: 'modules/articles/views/view-article.client.view.html' //todo
		});
	}
]);