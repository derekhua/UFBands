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
                
                $scope.band = ['Marching Band', 'Jazz Band', 'Wind Symphony', 'Symphonic Band', 'Basketball Pep Band', 'Volleyball Pep Band'];
                 
                $http.post('/music/musicSearch', $scope.formdata).success(function(response) {
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
                                instrument: this.instrument,
                                band: this.band
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

                var march = 'NOTHIN';
                var jazz = 'NOTHIN';
                var wind = 'NOTHIN';
                var symph = 'NOTHIN';
                var bball_pep = 'NOTHIN';
                var volley_pep = 'NOTHIN';
                if($scope.user.MemberOf.march === true)
                    march = 'Marching Band';
                if($scope.user.MemberOf.jazz === true)
                    jazz = 'Jazz Band';
                if($scope.user.MemberOf.wind === true)
                    wind = 'Wind Symphony';
                if($scope.user.MemberOf.symph === true)
                    symph = 'Symphonic Band';
                if($scope.user.MemberOf.bball_pep === true)
                    bball_pep = 'Basketball Pep Band';
                if($scope.user.MemberOf.volley_pep === true)  
                    volley_pep = 'Volleyball Pep Band';

		// Find a list of Music
		$scope.find = function() {
                    if($scope.user.roles === 'admin')
			$scope.music = Music.query({flag: 'false'});
                    else {
                         $scope.music = Music.query({march: march, 
                                                    jazz: jazz,
                                                     wind: wind, 
                                                     symph: symph, 
                                                     bball_pep: bball_pep,
                                                     volley_pep: volley_pep,  
                                                     flag: 'false'});
                    }
                    
		};
                $scope.findSearch = function() {
                    if($scope.user.roles === 'admin')
                        $scope.music = Music.query({instrument: $scope.formdata.instrument, 
                                                    band: $scope.formdata.band, 
                                                    title: $scope.formdata.title, 
                                                    composer: $scope.formdata.composer,
                                                    flag: 'true'});
                    else {
                         $scope.music = Music.query({instrument: $scope.formdata.instrument,
                                                    band: $scope.formdata.band,
                                                    title: $scope.formdata.title, 
                                                    composer: $scope.formdata.composer, 
                                                    march: march, 
                                                    jazz: jazz,
                                                    wind: wind, 
                                                    symph: symph, 
                                                    bball_pep: bball_pep,
                                                    volley_pep: volley_pep,  
                                                    flag: 'true'});
                    }
                };

		// Find existing Music
		$scope.findOne = function() {
			$scope.music = Music.get({ 
				musicId: $stateParams.musicId
			});
		};

	}
]);