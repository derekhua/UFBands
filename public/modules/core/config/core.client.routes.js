'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/home',
			templateUrl: 'modules/core/views/home.client.view.html'
		}).
                state('homecurrent', {
			url: '/home/current',
			templateUrl: 'modules/core/views/homecurrent.client.view.html'
		}).
                state('homeprospective', {
			url: '/home/prospective',
			templateUrl: 'modules/core/views/homeprospective.client.view.html'
		}).
                state('homealumni', {
			url: '/home/alumni',
			templateUrl: 'modules/core/views/homealumni.client.view.html'
		}).
                state('login', {
			url: '/',
			templateUrl: 'modules/core/views/login.client.view.html'
		});
	}
]);