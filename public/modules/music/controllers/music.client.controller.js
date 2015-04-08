'use strict';

// Music controller
angular.module('music').controller('MusicController', ['$scope', '$stateParams', '$http', '$location', 'Authentication', 'Music',
	function($scope, $stateParams, $http, $location, Authentication, Music) {
		$scope.authentication = Authentication;
               
               // allows for the user to be able to access the music view page
               $scope.viewShow = false;
               
                $scope.user = Authentication.user;
                if($scope.user.roles === 'admin' || $scope.user.roles === 'moderator' || $scope.user.userType === 'librarian') {
                    $scope.viewShow = true;
                } else {
                    $location.path('/music');               
                }
                
                
                $scope.instruments = ['Piccolo', 'Flute', 'Clarinet', 'Oboe', 'English Horn', 'Basson', 'Contrabass',
		'Contrabass Bassoon', 'Alto Saxophone', 'Tenor Saxophone','Baritone Saxophone', 
		'French Horn', 'Horn', 'Mellophone','Trumpet', 'Cornet', 'Baritone', 'Euphonium', 'Trombone',
		'Bass Trombone', 'Tuba', 'Sousaphone', 'String Bass', 'Bass', 'Bass Guitar', 'Guitar',
		'Percussion', 'Bass Drum', 'Quads', 'Tenors', 'Snare', 'Cymbals', 'Triangle', 'Timpani', 
		'Marimba', 'Vibraphone', 'Xylophone', 'Glockenspiel', 'Drumset', 
		'Celeste', 'Celesta', 'Piano', 'Harp', 'Bongos'];
                $scope.instruments.sort();
                 
                    $http.post('/music', $scope.formdata).success(function(response) {
                    	console.log(response);
                    }).error(function(response) {
                    	console.log(response);
				$scope.error = response.message;
			});

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
			$scope.music = Music.query({
                        });
		};
                
	    $scope.findSearch = function() {
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