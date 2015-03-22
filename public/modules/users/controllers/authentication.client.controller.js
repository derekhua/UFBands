'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
                $scope.authentication = Authentication;

		$scope.currentFlag = 'false';
		$scope.alumniFlag = 'false';
		$scope.prospectiveFlag = 'false';

                $scope.instruments = ['Piccolo', 'Flute', 'Clarinet', 'Oboe', 'English Horn', 'Basson', 'Contrabass',
		'Contrabass Bassoon', 'Alto Saxophone', 'Tenor Saxophone','Baritone Saxophone', 
		'French Horn', 'Horn', 'Mellophone','Trumpet', 'Cornet', 'Baritone', 'Euphonium', 'Trombone',
		'Bass Trombone', 'Tuba', 'Sousaphone', 'String Bass', 'Bass', 'Bass Guitar', 'Guitar',
		'Percussion', 'Bass Drum', 'Quads', 'Tenors', 'Snare', 'Cymbals', 'Triangle', 'Timpani', 
		'Marimba', 'Vibraphone', 'Xylophone', 'Glockenspiel', 'Drumset', 
		'Celeste', 'Celesta', 'Piano', 'Harp', 'Bongos'];
                $scope.instruments.sort();
                
		// If user is signed in then redirect back home
		if ($scope.authentication.user) {
                    if($scope.currentFlag==='true')
                       $location.path('/home/current');
                    else if($scope.prospectiveFlag==='true')
                        $location.path('/home/prospective');
                    else if($scope.alumniFlag==='true')
                        $location.path('/home/alumni');
                    else
                        $location.path('/home');           
                }

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
                                if($scope.currentFlag==='true')
                                    $location.path('/home/current');
                                else if($scope.prospectiveFlag==='true')
                                    $location.path('/home/prospective');
                                else if($scope.alumniFlag==='true')
                                    $location.path('/home/alumni');
                                else
                                    $location.path('/home');
                                
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;
                                $scope.user = Authentication.user;
				// And redirect to the index page
                                if($scope.user.userType==='Current')
                                    $location.path('/home/current');
                                else if($scope.user.userType==='Prospective')
                                    $location.path('/home/prospective');
                                else if($scope.user.userType==='Alumni')
                                    $location.path('/home/alumni');
                                else
                                    $location.path('/home');
                                
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

            $scope.currentUser = function() {
	        $scope.currentFlag = 'true';
	        $scope.alumniFlag = 'false';
	        $scope.prospectiveFlag = 'false';
	    };

	    $scope.prospectiveUser = function() {
	        $scope.currentFlag = 'false';
	        $scope.alumniFlag = 'false';
	        $scope.prospectiveFlag = 'true';
	    };		
	
		$scope.alumniUser = function() {
	        $scope.currentFlag = 'false';
	        $scope.alumniFlag = 'true';
	        $scope.prospectiveFlag = 'false';
	    };	
	}
]);
