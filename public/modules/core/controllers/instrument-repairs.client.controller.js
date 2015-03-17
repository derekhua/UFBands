'use strict';

angular.module('core').controller('InstrumentRepairsController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
                $scope.user = Authentication.user;
                
                $scope.sendEmail = function (){

                console.log('hello world');

                    $http.post('/email/instrumentRepairEmail', $scope.formdata).success(function(response) {
                    	console.log(response);
                    }).error(function(response) {
                    	console.log(response);
				$scope.error = response.message;
			});
                alert("Thank you for submitting your repair request. \nPlease press OK to finalize");
                if($scope.user.userType==='Current')
                        $location.path('/home/current');
                    else if($scope.user.userType==='Prospective')
                         $location.path('/home/prospective');
                    else if($scope.user.userType==='Alumni')
                        $location.path('/home/alumni');
                };
	}
]);