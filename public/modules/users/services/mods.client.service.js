'use strict';

// Mods service used for communicating with the users REST endpoint
angular.module('users').factory('Mods', ['$resource',
	function($resource) {
		return $resource('mods', {modType: 'userType'}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);