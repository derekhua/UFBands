'use strict';

angular.module('users').controller('AdminController', ['$scope', '$http', '$location', 'Users',
	function($scope, $http, $location, Users) {

		$scope.modTypes = ['Librarian', 'Instrument', 'Uniform'];
		$scope.modType = '';

		//Return a list of moderators
		$scope.listMods = function() {
			$scope.mods = Users.get({roles: 'moderator'}, function() {
				console.log($scope.mods);
			});
		};

		//Update the moderator of the type specified by $scope.modType
		$scope.updateMod = function() {
			$scope.mod = Users.get({roles: 'moderator', usertype: $scope.modType}, function() {
			$scope.mod.firstName = $scope.firstName;
			$scope.mod.lastName = $scope.lastName;
			$scope.mod.lastName = $scope.lastName;
			$scope.mod.usertype = $scope.usertype;
			$scope.mod.username = $scope.username;
			$scope.mod.password = $scope.password;
			$scope.mod.displayName = $scope.displayName;
			$scope.updated = Date.now;

				$scope.mod.$update(function() {
					$location.path('home/admin');
				}, function(errorResponse) {
					$scope.error = errorResponse.data.message;
				});
			});
		};
	}
]);

