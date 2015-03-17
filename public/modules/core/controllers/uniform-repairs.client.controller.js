'use strict';

angular.module('core').controller('UniformRepairsController', ['$scope', '$http', 'Authentication',
	function($scope, $http, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
                
                $scope.sendEmail = function (){

                    $http.post('/email/uniformRepairEmail').success(function(response) {
                    }).error(function(response) {
				$scope.error = response.message;
			});
                };
	}
]);