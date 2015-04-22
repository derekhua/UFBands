'use strict';

// Bandapplications controller
angular.module('bandapplications').controller('BandapplicationsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Bandapplications', 'Users',
	function($scope, $stateParams, $location, Authentication, Bandapplications, Users) {
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
                

        $scope.sizes = ['XS', 'S', 'M', 'L', 'XL'];     
        $scope.statuses = ['University of Florida', 'Santa Fe', 'Innovation Academy', 'Other State School'];
        
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
	$scope.drumlineToggle = function() {
            $scope.drumlineFlag = !$scope.drumlineFlag;
	};
	$scope.auxiliaryToggle = function() {
            $scope.auxiliaryFlag = !$scope.auxiliaryFlag;
	};
        // Create new Bandapplication
        $scope.create = function() {
                // Create new Bandapplication object
            var bandapplication = new Bandapplications({
                user: this.user,
                created: this.created,
                marchingBand: this.marchingBand,
                concertEnsembles: this.concertEnsembles,
                jazzBand: this.jazzBand,
                volleyballPepBand: this.volleyballPepBand,
                basketballPepBand: this.basketballPepBand,
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
                    // Clear form fields
                    $scope.success = true;
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
                
//        // Update existing Bandapplication
//        $scope.update = function() {
//                var bandapplication = $scope.bandapplication;
//
//                bandapplication.$update(function() {
//                        $location.path('bandapplications/' + bandapplication._id);
//                }, function(errorResponse) {
//                        $scope.error = errorResponse.data.message;
//                });
//        };

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
            var current = Authentication.user;

            bandapplication.user.MemberOf.march = true; 
            
            $scope.applicant = bandapplication.user;
            var user = new Users($scope.applicant);  

            user.$update(function(response) {
                    $scope.successMarching = true;
                    //$location.path('bandapplications/' + bandapplication._id);
                    Authentication.user = current;
            }, function(response) {
                            $scope.errorMarching = response.data.message;
            });
        };
        
        $scope.acceptWind = function(bandapplication) {
			
            bandapplication.user.MemberOf.wind = true; 
            
            $scope.applicant = bandapplication.user;
            var user = new Users($scope.applicant);  

            user.$update(function(response) {
                    $scope.successWind = true;
                    //$location.path('bandapplications/' + bandapplication._id);
                    //Authentication.user = response;
            }, function(response) {
                            $scope.errorWind = response.data.message;
            });
        };
        $scope.acceptSymph = function(bandapplication) {
			
            bandapplication.user.MemberOf.symph = true; 
            
            $scope.applicant = bandapplication.user;
            var user = new Users($scope.applicant);  

            user.$update(function(response) {
                    $scope.successSymph = true;
                    //$location.path('bandapplications/' + bandapplication._id);
                    //Authentication.user = response;
            }, function(response) {
                            $scope.errorSymph = response.data.message;
            });
        };
        $scope.acceptJazz = function(bandapplication) {
		
            bandapplication.user.MemberOf.jazz = true; 
            
            $scope.applicant = bandapplication.user;
            var user = new Users($scope.applicant);  

            user.$update(function(response) {
                    $scope.successJazz = true;
                    //$location.path('bandapplications/' + bandapplication._id);
                    //Authentication.user = response;
            }, function(response) {
                            $scope.errorJazz = response.data.message;
            });
        };
        $scope.acceptVolley = function(bandapplication) {
			
            bandapplication.user.MemberOf.volley = true; 
            
            $scope.applicant = bandapplication.user;
            var user = new Users($scope.applicant);  

            user.$update(function(response) {
                    $scope.successVolley = true;
                    //$location.path('bandapplications/' + bandapplication._id);
                    //Authentication.user = response;
            }, function(response) {
                            $scope.errorVolley = response.data.message;
            });
        };
        $scope.acceptBball = function(bandapplication) {
			
            bandapplication.user.MemberOf.bball_pep = true; 
            
            $scope.applicant = bandapplication.user;
            var user = new Users($scope.applicant);  

            user.$update(function(response) {
                    $scope.successBBall = true;
                    //$location.path('bandapplications/' + bandapplication._id);
                    //Authentication.user = response;
            }, function(response) {
                            $scope.errorBBall = response.data.message;
            });
        };
            
}
]);