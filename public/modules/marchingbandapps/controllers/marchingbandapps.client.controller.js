'use strict';

// Marchingbandapps controller
angular.module('marchingbandapps').controller('MarchingbandappsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Marchingbandapps',
	function($scope, $stateParams, $location, Authentication, Marchingbandapps) {
		$scope.authentication = Authentication;


                $scope.instruments = ['piccolo', 'picc', 'flute', 'clarinet', 'oboe', 'english horn', 'basson', 'contrabass',
		'contrabass bassoon', 'sax', 'saxophone', 'alto saxophone', 'alto sax', 'alto', 'tenor saxophone', 
		'tenor sax', 'tenor', 'baritone saxophone', 'bari saxophone', 'bari sax', 'bari', 
		'french horn', 'horn', 'mellophone', 'mello', 'trumpet', 'cornet', 'baritone', 'euphonium', 'trombone',
		'bass trombone', 'tuba', 'sousaphone', 'string bass', 'bass', 'bass guitar', 'guitar',
		'percussion', 'bass drum', 'quads', 'tenors', 'snare', 'cymbals', 'triangle', 'tympany', 
		'marimba', 'vibraphone', 'xylophone', 'glockenspiel', 'drumset', 
		'celeste', 'celesta', 'piano', 'harp', 'bongos'];
                    
		// Create new Marchingbandapp
		$scope.create = function() {
			// Create new Marchingbandapp object
			var marchingbandapp = new Marchingbandapps ({
				name: this.name
			});

			// Redirect after save
			marchingbandapp.$save(function(response) {
				$location.path('marchingbandapps/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Marchingbandapp
		$scope.remove = function(marchingbandapp) {
			if ( marchingbandapp ) { 
				marchingbandapp.$remove();

				for (var i in $scope.marchingbandapps) {
					if ($scope.marchingbandapps [i] === marchingbandapp) {
						$scope.marchingbandapps.splice(i, 1);
					}
				}
			} else {
				$scope.marchingbandapp.$remove(function() {
					$location.path('marchingbandapps');
				});
			}
		};

		// Update existing Marchingbandapp
		$scope.update = function() {
			var marchingbandapp = $scope.marchingbandapp;

			marchingbandapp.$update(function() {
				$location.path('marchingbandapps/' + marchingbandapp._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Marchingbandapps
		$scope.find = function() {
			$scope.marchingbandapps = Marchingbandapps.query();
		};

		// Find existing Marchingbandapp
		$scope.findOne = function() {
			$scope.marchingbandapp = Marchingbandapps.get({ 
				marchingbandappId: $stateParams.marchingbandappId
			});
		};
                
                
                        
                    
	}
]);