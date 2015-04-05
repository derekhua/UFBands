'use strict';

angular.module('users').controller('AdminController', ['$scope', '$http', '$location', 'Users',
	function($scope, $http, $location, Users) {

		$scope.updateMod = function() {
			$scope.mod = Users.get({roles: 'moderator'}, function() {
				$scope.mod.firstName = $scope.firstName;
				$scope.mod.lastName = $scope.lastName;
				$scope.mod.lastName = $scope.lastName;
				$scope.mod.usertype = $scope.usertype;
				$scope.mod.username = $scope.username;
				$scope.mod.password = $scope.password;
				$scope.mod.displayName = $scope.displayName;

				$scope.mod.$update(function() {
					$location.path('home/admin');
				}, function(errorResponse) {
					$scope.error = errorResponse.data.message;
				});
			});
		};
	}
]);