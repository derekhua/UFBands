'use strict';

angular.module('core').controller('InstrumentRepairsController', ['$scope', '$http', 'Authentication',
	function($scope, $http, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
                
                $scope.sendEmail = function (){

                    $http.get('/email/repairEmail').success(function(response) {
                    }).error(function(response) {
				$scope.error = response.message;
			});
                };
	}
]);