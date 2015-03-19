'use strict';

// Music controller
angular.module('music').controller('MusicController', ['$scope', '$stateParams', '$location', 'Authentication', 'Music',
	function($scope, $stateParams, $location, Authentication, Music) {
		$scope.authentication = Authentication;
               
                $scope.instruments = ['piccolo', 'flute', 'clarinet', 'oboe', 'english horn', 'basson', 'contrabass',
		'contrabass bassoon', 'alto saxophone', 'tenor saxophone','baritone saxophone', 
		'french horn', 'horn', 'mellophone','trumpet', 'cornet', 'baritone', 'euphonium', 'trombone',
		'bass trombone', 'tuba', 'sousaphone', 'string bass', 'bass', 'bass guitar', 'guitar',
		'percussion', 'bass drum', 'quads', 'tenors', 'snare', 'cymbals', 'triangle', 'timpani', 
		'marimba', 'vibraphone', 'xylophone', 'glockenspiel', 'drumset', 
		'celeste', 'celesta', 'piano', 'harp', 'bongos'];
                $scope.instruments.sort();


		// Create new Music
		$scope.create = function() {
			// Create new Music object
			var music = new Music ({
				title: this.title,
                                composer: this.composer,
                                path: this.path,
                                instrument: this.instrument
			});

			// Redirect after save
			music.$save(function(response) {
				$location.path('music/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Music
		$scope.remove = function(music) {
			if ( music ) { 
				music.$remove();

				for (var i in $scope.music) {
					if ($scope.music [i] === music) {
						$scope.music.splice(i, 1);
					}
				}
			} else {
				$scope.music.$remove(function() {
					$location.path('music');
				});
			}
		};

		// Update existing Music
		$scope.update = function() {
			var music = $scope.music;

			music.$update(function() {
				$location.path('music/' + music._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Music
		$scope.find = function() {
			$scope.music = Music.query();
		};

		// Find existing Music
		$scope.findOne = function() {
			$scope.music = Music.get({ 
				musicId: $stateParams.musicId
			});
		};

	}
]);