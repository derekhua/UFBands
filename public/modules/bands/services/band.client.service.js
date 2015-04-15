'use strict';

//Band service used to communicate Band REST endpoints
angular.module('bands').factory('Bands', ['$resource',
	function($resource) {
		return $resource('bands/:bandId', { bandId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);