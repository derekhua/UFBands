'use strict';

angular.module('users').controller('AdminController', ['$scope', '$http', '$location', '$stateParams', 'Users', 'Mods',
	function($scope, $http, $location, $stateParams, Users, Mods) {

		$scope.modTypes = ['Librarian', 'Instrument', 'Uniform'];
        
		//Return a list of moderators
		$scope.listMods = function() {
			$scope.mods = Mods.query();
		};

		//Update the moderator of the type specified by $scope.modType
		$scope.updateMod = function() {
			$scope.mod = Mods.get({roles: 'moderator', userType: $scope.modType}, function() {
			$scope.mod.firstName = $scope.firstName;
			$scope.mod.lastName = $scope.lastName;
			$scope.mod.lastName = $scope.lastName;
			$scope.mod.username = $scope.username;
			$scope.mod.password = $scope.password;
			$scope.mod.displayName = $scope.mod.firstName + '' + $scope.mod.lastName;
			$scope.updated = Date.now;

				$scope.mod.$update(function() {
					$location.path('home/admin');
				}, function(errorResponse) {
					$scope.error = errorResponse.data.message;
				});
			});
		};

		// Find existing mod
		$scope.findOne = function() {
			$scope.mod = Mods.get({ 
				modType: $stateParams.modType
			});
			console.log($scope.mod.modType);
			/*$scope.mod = mod;
			$scope.mod.userType = mod.userType;
			$scope.mod.roles = mod.roles;*/
		};
	}
]);

