'use strict';

// Bands controller
angular.module('bands').controller('BandsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Bands',
	function($scope, $stateParams, $location, Authentication, Bands) {
		$scope.authentication = Authentication;
		
		// Update existing Band
		$scope.update = function() {
			var band = $scope.band;

			//Update band dates with new dates
			band.startDate = new Date($scope.startYear, $scope.startMonth-1, $scope.startDay);
			band.endDate = new Date($scope.endYear, $scope.endMonth-1, $scope.endDay);
			band.openDate = new Date($scope.openYear, $scope.openMonth-1, $scope.openDay);
			band.closeDate = new Date($scope.closeYear, $scope.closeMonth-1, $scope.closeDay);

			band.$update(function() {
				$location.path('bands');
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
				alert($scope.error);
			});
		};

		// Find a list of Bands
		$scope.find = function() {
			$scope.bands = Bands.query();
		};

		// Find existing Band
		$scope.findOne = function() {
			var Band = Bands.get({
				bandId: $stateParams.bandId
			}).$promise.then(function(band) {
				getDates(band);
				$scope.band = band;
			});
		};
		//Helper method to get the relevant dates for a band
		var getDates = function(band) {
			//Bring dates into scope
			var startDate = new Date(band.startDate);
			var endDate = new Date(band.endDate);
			var openDate = new Date(band.openDate);
			var closeDate = new Date(band.closeDate);
			//startDate day, month, and year
			$scope.startDay = startDate.getDate();
			$scope.startMonth = startDate.getMonth()+1;
			$scope.startYear = startDate.getFullYear();

			//endDate day, month, and year
			$scope.endDay = endDate.getDate();
			$scope.endMonth = endDate.getMonth()+1;
			$scope.endYear = endDate.getFullYear();

			//openDate day, month, and year
			$scope.openDay = openDate.getDate();
			$scope.openMonth = openDate.getMonth()+1;
			$scope.openYear = openDate.getFullYear();

			//closeDate day, month, and year
			$scope.closeDay = closeDate.getDate();
			$scope.closeMonth = closeDate.getMonth()+1;
			$scope.closeYear = closeDate.getFullYear();
		};
		$scope.getDates = getDates;
	}
]);