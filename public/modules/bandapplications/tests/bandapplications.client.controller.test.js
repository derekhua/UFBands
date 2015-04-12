'use strict';

(function() {
	// Bandapplications Controller Spec
	describe('Bandapplications Controller Tests', function() {
		// Initialize global variables
		var BandapplicationsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Bandapplications controller.
			BandapplicationsController = $controller('BandapplicationsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Bandapplication object fetched from XHR', inject(function(Bandapplications) {
			// Create sample Bandapplication using the Bandapplications service
			var sampleBandapplication = new Bandapplications({
				name: 'New Bandapplication'
			});

			// Create a sample Bandapplications array that includes the new Bandapplication
			var sampleBandapplications = [sampleBandapplication];

			// Set GET response
			$httpBackend.expectGET('bandapplications').respond(sampleBandapplications);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.bandapplications).toEqualData(sampleBandapplications);
		}));

		it('$scope.findOne() should create an array with one Bandapplication object fetched from XHR using a bandapplicationId URL parameter', inject(function(Bandapplications) {
			// Define a sample Bandapplication object
			var sampleBandapplication = new Bandapplications({
				name: 'New Bandapplication'
			});

			// Set the URL parameter
			$stateParams.bandapplicationId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/bandapplications\/([0-9a-fA-F]{24})$/).respond(sampleBandapplication);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.bandapplication).toEqualData(sampleBandapplication);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Bandapplications) {
			// Create a sample Bandapplication object
			var sampleBandapplicationPostData = new Bandapplications({
				name: 'New Bandapplication'
			});

			// Create a sample Bandapplication response
			var sampleBandapplicationResponse = new Bandapplications({
				_id: '525cf20451979dea2c000001',
				name: 'New Bandapplication'
			});

			// Fixture mock form input values
			scope.name = 'New Bandapplication';

			// Set POST response
			$httpBackend.expectPOST('bandapplications', sampleBandapplicationPostData).respond(sampleBandapplicationResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Bandapplication was created
			expect($location.path()).toBe('/bandapplications/' + sampleBandapplicationResponse._id);
		}));

		it('$scope.update() should update a valid Bandapplication', inject(function(Bandapplications) {
			// Define a sample Bandapplication put data
			var sampleBandapplicationPutData = new Bandapplications({
				_id: '525cf20451979dea2c000001',
				name: 'New Bandapplication'
			});

			// Mock Bandapplication in scope
			scope.bandapplication = sampleBandapplicationPutData;

			// Set PUT response
			$httpBackend.expectPUT(/bandapplications\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/bandapplications/' + sampleBandapplicationPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid bandapplicationId and remove the Bandapplication from the scope', inject(function(Bandapplications) {
			// Create new Bandapplication object
			var sampleBandapplication = new Bandapplications({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Bandapplications array and include the Bandapplication
			scope.bandapplications = [sampleBandapplication];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/bandapplications\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleBandapplication);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.bandapplications.length).toBe(0);
		}));

		it('marching band toggled properly',function() {
			expect(scope.state.marchingBandToggled).to.equal(true);
		}));

		it('volleyball pep band toggled properly',function() {
			expect(scope.state.volleyballPepBandToggled).to.equal(true);
		}));

		it('basketball pep band toggled properly',function() {
			expect(scope.state.basketballPepBandToggled).to.equal(true);
		}));

		it('concert ensemble properly',function() {
			expect(scope.state.concertEnsembleToggled).to.equal(true);
		}));

		it('jazz band toggled properly',function() {
			expect(scope.state.jazzBandToggled).to.equal(true);
		}));

		it('drumline toggled properly',function() {
			expect(scope.state.drumlineToggled).to.equal(true);
		}));

		it('auxiliary toggled properly',function() {
			expect(scope.state.auxiliaryToggled).to.equal(true);
		}));
	});
}());