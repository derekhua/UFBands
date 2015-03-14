'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', '$location', 'Menus',
	function($scope, Authentication, $location, Menus) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');
                $scope.user = Authentication.user;
                
                if($scope.user.userType === 'Current')
                    $scope.type = 'current';
                else if($scope.user.userType === 'Prospective')
                    $scope.type = 'prospective';
                else if($scope.user.userType === 'Alumni')
                    $scope.type = 'alumni';
                else
                    $scope.type = '';
		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
                
                $scope.goHome = function (){
                    if($scope.user.userType==='Current')
                        $location.path('/home/current');
                    else if($scope.user.userType==='Prospective')
                         $location.path('/home/prospective');
                    else if($scope.user.userType==='Alumni')
                        $location.path('/home/alumni');
//                    else
//                        $location.path('/home');
                };
	}
]);