'use strict';

(function() {
	// Concertbandapps Controller Spec
	describe('Concertbandapps Controller Tests', function() {
		// Initialize global variables
		var ConcertbandappsController,
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

			// Initialize the Concertbandapps controller.
			ConcertbandappsController = $controller('ConcertbandappsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Concertbandapp object fetched from XHR', inject(function(Concertbandapps) {
			// Create sample Concertbandapp using the Concertbandapps service
			var sampleConcertbandapp = new Concertbandapps({
				name: 'New Concertbandapp'
			});

			// Create a sample Concertbandapps array that includes the new Concertbandapp
			var sampleConcertbandapps = [sampleConcertbandapp];

			// Set GET response
			$httpBackend.expectGET('concertbandapps').respond(sampleConcertbandapps);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.concertbandapps).toEqualData(sampleConcertbandapps);
		}));

		it('$scope.findOne() should create an array with one Concertbandapp object fetched from XHR using a concertbandappId URL parameter', inject(function(Concertbandapps) {
			// Define a sample Concertbandapp object
			var sampleConcertbandapp = new Concertbandapps({
				name: 'New Concertbandapp'
			});

			// Set the URL parameter
			$stateParams.concertbandappId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/concertbandapps\/([0-9a-fA-F]{24})$/).respond(sampleConcertbandapp);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.concertbandapp).toEqualData(sampleConcertbandapp);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Concertbandapps) {
			// Create a sample Concertbandapp object
			var sampleConcertbandappPostData = new Concertbandapps({
				name: 'New Concertbandapp'
			});

			// Create a sample Concertbandapp response
			var sampleConcertbandappResponse = new Concertbandapps({
				_id: '525cf20451979dea2c000001',
				name: 'New Concertbandapp'
			});

			// Fixture mock form input values
			scope.name = 'New Concertbandapp';

			// Set POST response
			$httpBackend.expectPOST('concertbandapps', sampleConcertbandappPostData).respond(sampleConcertbandappResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Concertbandapp was created
			expect($location.path()).toBe('/concertbandapps/' + sampleConcertbandappResponse._id);
		}));

		it('$scope.update() should update a valid Concertbandapp', inject(function(Concertbandapps) {
			// Define a sample Concertbandapp put data
			var sampleConcertbandappPutData = new Concertbandapps({
				_id: '525cf20451979dea2c000001',
				name: 'New Concertbandapp'
			});

			// Mock Concertbandapp in scope
			scope.concertbandapp = sampleConcertbandappPutData;

			// Set PUT response
			$httpBackend.expectPUT(/concertbandapps\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/concertbandapps/' + sampleConcertbandappPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid concertbandappId and remove the Concertbandapp from the scope', inject(function(Concertbandapps) {
			// Create new Concertbandapp object
			var sampleConcertbandapp = new Concertbandapps({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Concertbandapps array and include the Concertbandapp
			scope.concertbandapps = [sampleConcertbandapp];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/concertbandapps\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleConcertbandapp);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.concertbandapps.length).toBe(0);
		}));
	});
}());