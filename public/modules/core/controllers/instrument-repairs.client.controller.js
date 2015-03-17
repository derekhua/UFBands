'use strict';

angular.module('core').controller('InstrumentRepairsController', ['$scope', '$http', 'Authentication',
	function($scope, $http, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
                
                $scope.sendEmail = function (){

console.log('hello world');

                    $http.post('/email/repairEmail', $scope.formdata).success(function(response) {
                    	console.log(response);
                    }).error(function(response) {
                    	console.log(response);
				$scope.error = response.message;
			});
                };
	}
]);