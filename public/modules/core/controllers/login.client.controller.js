'use strict';
angular.module('users').controller('LoginController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
            $scope.authentication = Authentication;

            $scope.instruments = ['Piccolo', 'Flute', 'Clarinet', 'Oboe', 'English Horn', 'Basson', 'Contrabass',
            'Contrabass Bassoon', 'Alto Saxophone', 'Tenor Saxophone','Baritone Saxophone', 
            'French Horn', 'Horn', 'Mellophone','Trumpet', 'Cornet', 'Baritone', 'Euphonium', 'Trombone',
            'Bass Trombone', 'Tuba', 'Sousaphone', 'String Bass', 'Bass', 'Bass Guitar', 'Guitar',
            'Percussion', 'Bass Drum', 'Quads', 'Tenors', 'Snare', 'Cymbals', 'Triangle', 'Timpani', 
            'Marimba', 'Vibraphone', 'Xylophone', 'Glockenspiel', 'Drumset', 
            'Celeste', 'Celesta', 'Piano', 'Harp', 'Bongos'];

            $scope.instruments.sort();
                
            // If user is signed in then redirect back home
            $scope.user = Authentication.user;
            if($scope.user.userType==='Current')
                $location.path('/home/current');
            else if($scope.user.userType==='Prospective')
                $location.path('/home/prospective');
            else if($scope.user.userType==='Alumni')
                $location.path('/home/alumni');
            else
                $location.path('/home');
	}
]);
