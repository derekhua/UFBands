'use strict';

// Concertbandapps controller
angular.module('concertbandapps').controller('ConcertbandappsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Concertbandapps',
	function($scope, $stateParams, $location, Authentication, Concertbandapps) {
		$scope.authentication = Authentication;

		// Create new Concertbandapp
		$scope.create = function() {
			// Create new Concertbandapp object
			var concertbandapp = new Concertbandapps ({
				name: this.name
			});

			// Redirect after save
			concertbandapp.$save(function(response) {
				$location.path('concertbandapps/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Concertbandapp
		$scope.remove = function(concertbandapp) {
			if ( concertbandapp ) { 
				concertbandapp.$remove();

				for (var i in $scope.concertbandapps) {
					if ($scope.concertbandapps [i] === concertbandapp) {
						$scope.concertbandapps.splice(i, 1);
					}
				}
			} else {
				$scope.concertbandapp.$remove(function() {
					$location.path('concertbandapps');
				});
			}
		};

		// Update existing Concertbandapp
		$scope.update = function() {
			var concertbandapp = $scope.concertbandapp;

			concertbandapp.$update(function() {
				$location.path('concertbandapps/' + concertbandapp._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Concertbandapps
		$scope.find = function() {
			$scope.concertbandapps = Concertbandapps.query();
		};

		// Find existing Concertbandapp
		$scope.findOne = function() {
			$scope.concertbandapp = Concertbandapps.get({ 
				concertbandappId: $stateParams.concertbandappId
			});
		};
	}
]);