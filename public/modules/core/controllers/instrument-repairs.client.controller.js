'use strict';

angular.module('core').controller('InstrumentRepairsController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
                $scope.user = Authentication.user;

                $scope.instruments = ['Piccolo', 'Flute', 'Clarinet', 'Oboe', 'English Horn', 'Basson', 'Contrabass',
		'Contrabass Bassoon', 'Alto Saxophone', 'Tenor Saxophone','Baritone Saxophone',
		'French Horn', 'Horn', 'Mellophone','Trumpet', 'Cornet', 'Baritone', 'Euphonium', 'Trombone',
		'Bass Trombone', 'Tuba', 'Sousaphone', 'String Bass', 'Bass', 'Bass Guitar', 'Guitar',
		'Percussion', 'Bass Drum', 'Quads', 'Tenors', 'Snare', 'Cymbals', 'Triangle', 'Timpani',
		'Marimba', 'Vibraphone', 'Xylophone', 'Glockenspiel', 'Drumset',
		'Celeste', 'Celesta', 'Piano', 'Harp', 'Bongos'];
                $scope.instruments.sort();
                $scope.sendEmail = function (){

                console.log('hello world');

                    $http.post('/email/instrumentRepairEmail', $scope.formdata).success(function(response) {
                    	console.log(response);
                    }).error(function(response) {
                    	console.log(response);
				$scope.error = response.message;
			});
                //alert("Thank you for submitting your repair request. \nPlease press OK to finalize");
                if($scope.user.userType==='Current')
                        $location.path('/home/current');
                    else if($scope.user.userType==='Prospective')
                         $location.path('/home/prospective');
                    else if($scope.user.userType==='Alumni')
                        $location.path('/home/alumni');
                };
	}
]);
