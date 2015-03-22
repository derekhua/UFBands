'use strict';

// Bandapplications controller
angular.module('bandapplications').controller('BandapplicationsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Bandapplications',
	function($scope, $stateParams, $location, Authentication, Bandapplications) {
		$scope.authentication = Authentication;

		//Marching Band Instruments
		$scope.marchingBandInstruments = ['Flute/Piccolo', 'Clarinet', 'Saxophone', 'Mellophone', 'Trumpet', 
		'Baritone/Euphonium', 'Trombone', 'Tuba/Sousaphone', 'Snare', 'Tenors', 'Bass Drum', 'Cymbals'];

		//Wind Symphony, Symphonic Band, Jazz Band Instruments
		$scope.concertEnsemblesInstruments = ['Piccolo', 'Flute', 'Clarinet', 'Oboe', 'English Horn', 'Basson', 
        'Saxophone', 'Alto Saxophone', 'Tenor Saxophone', 'Baritone Saxophone', 
        'French Horn', 'Trumpet', 'Baritone', 'Euphonium', 'Trombone', 'Bass Trombone', 'Tuba', 
        'String Bass', 'Percussion', 'Drumset'];
		
		//Volleyball and Basketball Pep Band Instruments
		$scope.pepBandInstruments = ['Piccolo', 'Clarinet', 'Saxophone', 'Mellophone', 'Trumpet', 
		'Baritone', 'Trombone', 'Sousaphone', 'Bass Guitar', 'Drumset'];
                
         $scope.instruments = ['Piccolo', 'Flute', 'Clarinet', 'Oboe', 'English Horn', 'Basson', 'Contrabass',
		'Contrabass Bassoon', 'Alto Saxophone', 'Tenor Saxophone','Baritone Saxophone', 
		'French Horn', 'Horn', 'Mellophone','Trumpet', 'Cornet', 'Baritone', 'Euphonium', 'Trombone',
		'Bass Trombone', 'Tuba', 'Sousaphone', 'String Bass', 'Bass', 'Bass Guitar', 'Guitar',
		'Percussion', 'Bass Drum', 'Quads', 'Tenors', 'Snare', 'Cymbals', 'Triangle', 'Timpani', 
		'Marimba', 'Vibraphone', 'Xylophone', 'Glockenspiel', 'Drumset', 
		'Celeste', 'Celesta', 'Piano', 'Harp', 'Bongos'];
        $scope.instruments.sort();
        
        $scope.status = ['University of Florida', 'Santa Fe', 'Innovation Academy', 'Other State School'];
        $scope.marchingBandFlag = false;
        $scope.pepBandFlag = false;
        
        $scope.size = ['XS', 'S', 'M', 'L', 'XL'];
                
        $scope.status = ['University of Florida', 'Santa Fe', 'Innovation Academy', 'Other State School'];
        $scope.marchingBandFlag = false;
        $scope.volleyballPepBandFlag = false;
        $scope.basketballPepBandFlag = false;
        $scope.jazzBandFlag = false;
        $scope.concertEnsemblesFlag = false;

        $scope.size = ['XS', 'S', 'M', 'L', 'XL'];
        
        $scope.marchingBandToggle = function() {
            $scope.marchingBandFlag = !$scope.marchingBandFlag;
		};
        $scope.volleyballPepBandToggle = function() {
            $scope.volleyballPepBandFlag = !$scope.volleyballPepBandFlag;
		}; 
		$scope.basketballPepBandToggle = function() {
            $scope.basketballPepBandFlag = !$scope.basketballPepBandFlag;
		}; 
		$scope.concertEnsemblesToggle = function() {
            $scope.concertEnsemblesFlag = !$scope.concertEnsemblesFlag;
		}; 
		$scope.jazzBandToggle = function() {
            $scope.jazzBandFlag = !$scope.jazzBandFlag;
		};
		// Create new Bandapplication
		$scope.create = function() {
			// Create new Bandapplication object
			var bandapplication = new Bandapplications ({
				name: this.name,
				user: this.user,
                created: this.created,
                marchingBand: this.name,
                windSymphony: this.windSymphony,
                symphonicBand: this.symphonicBand,
                jazzBand: this.jazzBand,
                pepBand: this.pepBand,
                secondaryYears: this.secondaryYears,
                status: this.status,
                secondary: this.secondary,
                weight: this.weight,
                shirtSize:this.shirtSize
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