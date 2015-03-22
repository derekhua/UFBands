'use strict';
angular.module('users').controller('LoginController', ['$scope', '$location', 'Authentication',
	function($scope, $location, Authentication) {
            
            //problems w/ signout
//            $scope.authentication = Authentication;
//            $scope.user = Authentication.user;
//            if($scope.user.userType==='Current')
//                $location.path('/home/current');
//            else if($scope.user.userType==='Prospective')
//                $location.path('/home/prospective');
//            else if($scope.user.userType==='Alumni')
//                $location.path('/home/alumni');
//            else
//                $location.path('http://localhost:3000/#!/');  
	}
]);
