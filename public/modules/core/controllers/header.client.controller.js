'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', '$location', 'Menus',
	function($scope, Authentication, $location, Menus) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
        $scope.user = Authentication.user;
        
        //Determine user type to determine correct home page.
        var userType = ($scope.user.userType).toLowerCase();
        if ($scope.user.roles === 'admin')
            $scope.type = 'admin';
        else if ($scope.user.roles === 'moderator')
            $scope.type = '/mod/' + userType; // /mod/librarian or /instrument or /uniform
        else
            $scope.type = userType;

        $scope.menu = Menus.getMenu('topbar');
        //$scope.adminMenu = Menus.getMenu('admin-topbar');
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