'use strict';

// Bandapplications controller
angular.module('bandapplications').controller('BandapplicationsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Bandapplications',
	function($scope, $stateParams, $location, Authentication, Bandapplications) {
		$scope.authentication = Authentication;

                $scope.instruments = ['piccolo', 'picc', 'flute', 'clarinet', 'oboe', 'english horn', 'basson', 'contrabass',
		'contrabass bassoon', 'sax', 'saxophone', 'alto saxophone', 'alto sax', 'alto', 'tenor saxophone', 
		'tenor sax', 'tenor', 'baritone saxophone', 'bari saxophone', 'bari sax', 'bari', 
		'french horn', 'horn', 'mellophone', 'mello', 'trumpet', 'cornet', 'baritone', 'euphonium', 'trombone',
		'bass trombone', 'tuba', 'sousaphone', 'string bass', 'bass', 'bass guitar', 'guitar',
		'percussion', 'bass drum', 'quads', 'tenors', 'snare', 'cymbals', 'triangle', 'tympany', 
		'marimba', 'vibraphone', 'xylophone', 'glockenspiel', 'drumset', 
		'celeste', 'celesta', 'piano', 'harp', 'bongos'];
                
                $scope.status = ['University of Florida', 'Santa Fe', 'Innovation Academy', 'Other State School'];
                $scope.marchingBandFlag = false;
                $scope.pepBandFlag = false;
                
                $scope.size = ['XS', 'S', 'M', 'L', 'XL'];
                
                $scope.marchingBandToggle = function() {
                    $scope.marchingBandFlag = !$scope.marchingBandFlag;
		};
                 $scope.pepBandToggle = function() {
                    $scope.pepBandFlag = !$scope.pepBandFlag;
		};   
		// Create new Bandapplication
		$scope.create = function() {
			// Create new Bandapplication object
			var bandapplication = new Bandapplications ({
				name: this.name
			});

			// Redirect after save
			bandapplication.$save(function(response) {
				$location.path('bandapplications/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Bandapplication
		$scope.remove = function(bandapplication) {
			if ( bandapplication ) { 
				bandapplication.$remove();

				for (var i in $scope.bandapplications) {
					if ($scope.bandapplications [i] === bandapplication) {
						$scope.bandapplications.splice(i, 1);
					}
				}
			} else {
				$scope.bandapplication.$remove(function() {
					$location.path('bandapplications');
				});
			}
		};

		// Update existing Bandapplication
		$scope.update = function() {
			var bandapplication = $scope.bandapplication;

			bandapplication.$update(function() {
				$location.path('bandapplications/' + bandapplication._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Bandapplications
		$scope.find = function() {
			$scope.bandapplications = Bandapplications.query();
		};

		// Find existing Bandapplication
		$scope.findOne = function() {
			$scope.bandapplication = Bandapplications.get({ 
				bandapplicationId: $stateParams.bandapplicationId
			});
		};
	}
]);