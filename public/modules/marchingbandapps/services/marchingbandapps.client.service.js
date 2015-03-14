'use strict';

//Marchingbandapps service used to communicate Marchingbandapps REST endpoints
angular.module('marchingbandapps').factory('Marchingbandapps', ['$resource',
	function($resource) {
		return $resource('marchingbandapps/:marchingbandappId', { marchingbandappId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);