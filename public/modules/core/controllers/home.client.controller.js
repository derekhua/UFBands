'use strict';


angular.module('core').controller('HomeController', ['$scope', '$location', 'Authentication',
	function($scope, $location, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
                $scope.user = Authentication.user;
                if($scope.user.userType==='Current')
                    $location.path('/home/current');
                else if($scope.user.userType==='Prospective')
                    $location.path('/home/prospective');
                else if($scope.user.userType==='Alumni')
                    $location.path('/home/alumni');
                else
                    $location.path('http://localhost:3000/#!/');           
                
	}
]);