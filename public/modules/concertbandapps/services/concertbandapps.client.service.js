'use strict';

//Concertbandapps service used to communicate Concertbandapps REST endpoints
angular.module('concertbandapps').factory('Concertbandapps', ['$resource',
	function($resource) {
		return $resource('concertbandapps/:concertbandappId', { concertbandappId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);