'use strict';

// Bandapplications controller
angular.module('bandapplications').controller('BandapplicationsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Bandapplications',
	function($scope, $stateParams, $location, Authentication, Bandapplications) {
		$scope.authentication = Authentication;

		//Marching Band Instruments
		$scope.marchingBandInstruments = ['Piccolo', 'Clarinet', 'Saxophone', 'Mellophone', 'Trumpet', 
		'Baritone', 'Trombone', 'Sousaphone'];

		//Wind Symphony, Symphonic Band, Jazz Band Instruments
		$scope.concertEnsemblesInstruments = ['Piccolo', 'Flute', 'Clarinet', 'Oboe', 'Basson', 
        'Saxophone', 'French Horn', 'Trumpet', 'Euphonium', 'Trombone',  'Tuba', 
        'String Bass', 'Percussion'];
		
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
                
        $scope.size = ['XS', 'S', 'M', 'L', 'XL'];     
        $scope.status = ['University of Florida', 'Santa Fe', 'Innovation Academy', 'Other State School'];
        
        $scope.r1 = 1;
        $scope.r2 = 2;
        $scope.r3 = 3;
        $scope.r4 = 4;

        $scope.marchingBandFlag = false;
        $scope.volleyballPepBandFlag = false;
        $scope.basketballPepBandFlag = false;
        $scope.jazzBandFlag = false;
        $scope.concertEnsemblesFlag = false;
        $scope.drumlineFlag = false;
        $scope.auxiliaryFlag = false;

        $scope.size = ['XS', 'S', 'M', 'L', 'XL'];
        
        $scope.marchingBandToggle = function() {
            $scope.marchingBandFlag = !$scope.marchingBandFlag;
            $scope.state.marchingBandToggled= true; 
		};
        $scope.volleyballPepBandToggle = function() {
            $scope.volleyballPepBandFlag = !$scope.volleyballPepBandFlag;
            $scope.state.volleyballPepgBandToggled= true; 
		}; 
		$scope.basketballPepBandToggle = function() {
            $scope.basketballPepBandFlag = !$scope.basketballPepBandFlag;
        	$scope.state.basketballPepgBandToggled= true; 
		}; 
		$scope.concertEnsemblesToggle = function() {
            $scope.concertEnsemblesFlag = !$scope.concertEnsemblesFlag;
           	$scope.state.concertEnsemblesToggled= true; 
		}; 
		$scope.jazzBandToggle = function() {
            $scope.jazzBandFlag = !$scope.jazzBandFlag;
            $scope.state.jazzBandToggled= true; 
		};
		$scope.drumlineToggle = function() {
            $scope.drumlineFlag = !$scope.drumlineFlag;
        	$scope.state.drumlineToggled= true; 
		};
		$scope.auxiliaryToggle = function() {
            $scope.auxiliaryFlag = !$scope.auxiliaryFlag;
            $scope.state.auxiliaryToggled= true; 
		};
		// Create new Bandapplication
		$scope.create = function() {
			// Create new Bandapplication object
			var bandapplication = new Bandapplications ({

				user: this.user,
                created: this.created,
                marchingBand: this.marchingBand,
                concertEnsembles: this.concertEnsembles,
                jazzBand: this.jazzBand,
                volleyballPepBand: this.volleyballPepBand,
                basketballPepBand: this.volleyballPepBand,
                MBSecondary: this.MBSecondary,
                CESecondary: this.CESecondary,
                JBSecondary: this.JBSecondary,
                VBSecondary: this.VBSecondary,
                BBSecondary: this.BBSecondary,
                MBSecondaryYearsExp: this.MBSecondaryYearsExp,
                CESecondaryYearsExp: this.CESecondaryYearsExp,
                JBSecondaryYearsExp: this.JBSecondaryYearsExp,
                VBSecondaryYearsExp: this.VBSecondaryYearsExp,
                BBSecondaryYearsExp: this.BBSecondaryYearsExp,
                drumlineInterest: this.drumlineInterest,
                drumlineRank: [parseInt(this.r1), parseInt(this.r2), parseInt(this.r3), parseInt(this.r4)],
                auxiliary: [this.gatorettes, this.fve],
                status: this.status,
                weight: this.weight,
                shirtSize: this.shirtSize
			});

			// Redirect after save
			bandapplication.$save(function(response) {
				$location.path('bandapplications/' + response._id);

				// Clear form fields
				$scope.name = ' ';
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

                $scope.marching = function() {
			$scope.bandapplications = Bandapplications.query();
                        
		};
                $scope.jazz = function() {
			$scope.bandapplications = Bandapplications.query();
                        
		};
                $scope.concert = function() {
			$scope.bandapplications = Bandapplications.query();
                        
		};
                $scope.volleyball = function() {
			$scope.bandapplications = Bandapplications.query();
                        
		};
                $scope.basketball = function() {
			$scope.bandapplications = Bandapplications.query();
                        
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
                
                $scope.acceptMarching = function(bandapplication) {
                        alert(bandapplication.user.MemberOf.march);
			bandapplication.user.MemberOf.march = true; 
                        alert(bandapplication.user.MemberOf.march);
                        
                        var user = bandapplication.user;
                        user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
		};
            
	}
]);