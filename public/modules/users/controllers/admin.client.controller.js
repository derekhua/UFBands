'use strict';

angular.module('users').controller('AdminController', ['$scope', '$http', '$state', '$location', '$stateParams', 'Users', 'Mods',
	function($scope, $http, $state, $location, $stateParams, Users, Mods) {

		$scope.modTypes = ['Librarian', 'Instrument', 'Uniform'];
        
		//Return a list of moderators
		$scope.listMods = function() {
			$scope.mods = Mods.query();
		};

		//Update the moderator of the type specified by $scope.modType
		$scope.updateMod = function() {
			var mod = $scope.mod; 
			mod.updated = Date.now;
			mod.$update(function() {
				$location.path('mods/list');
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.editMods = function(modType) {
			$state.go('edit-mods', {modType: modType});
		};
		// Find existing mod

		$scope.findOne = function() {
			$scope.mod = Mods.get({ 
				modType: $stateParams.modType
			});
		};
	}
]);

