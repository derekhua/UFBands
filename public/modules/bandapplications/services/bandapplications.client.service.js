'use strict';

//Bandapplications service used to communicate Bandapplications REST endpoints
angular.module('bandapplications').factory('Bandapplications', ['$resource',
	function($resource) {
		return $resource('bandapplications/:bandapplicationId', { bandapplicationId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);