'use strict';

(function() {
	// Marchingbandapps Controller Spec
	describe('Marchingbandapps Controller Tests', function() {
		// Initialize global variables
		var MarchingbandappsController,
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

			// Initialize the Marchingbandapps controller.
			MarchingbandappsController = $controller('MarchingbandappsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Marchingbandapp object fetched from XHR', inject(function(Marchingbandapps) {
			// Create sample Marchingbandapp using the Marchingbandapps service
			var sampleMarchingbandapp = new Marchingbandapps({
				name: 'New Marchingbandapp'
			});

			// Create a sample Marchingbandapps array that includes the new Marchingbandapp
			var sampleMarchingbandapps = [sampleMarchingbandapp];

			// Set GET response
			$httpBackend.expectGET('marchingbandapps').respond(sampleMarchingbandapps);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.marchingbandapps).toEqualData(sampleMarchingbandapps);
		}));

		it('$scope.findOne() should create an array with one Marchingbandapp object fetched from XHR using a marchingbandappId URL parameter', inject(function(Marchingbandapps) {
			// Define a sample Marchingbandapp object
			var sampleMarchingbandapp = new Marchingbandapps({
				name: 'New Marchingbandapp'
			});

			// Set the URL parameter
			$stateParams.marchingbandappId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/marchingbandapps\/([0-9a-fA-F]{24})$/).respond(sampleMarchingbandapp);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.marchingbandapp).toEqualData(sampleMarchingbandapp);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Marchingbandapps) {
			// Create a sample Marchingbandapp object
			var sampleMarchingbandappPostData = new Marchingbandapps({
				name: 'New Marchingbandapp'
			});

			// Create a sample Marchingbandapp response
			var sampleMarchingbandappResponse = new Marchingbandapps({
				_id: '525cf20451979dea2c000001',
				name: 'New Marchingbandapp'
			});

			// Fixture mock form input values
			scope.name = 'New Marchingbandapp';

			// Set POST response
			$httpBackend.expectPOST('marchingbandapps', sampleMarchingbandappPostData).respond(sampleMarchingbandappResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Marchingbandapp was created
			expect($location.path()).toBe('/marchingbandapps/' + sampleMarchingbandappResponse._id);
		}));

		it('$scope.update() should update a valid Marchingbandapp', inject(function(Marchingbandapps) {
			// Define a sample Marchingbandapp put data
			var sampleMarchingbandappPutData = new Marchingbandapps({
				_id: '525cf20451979dea2c000001',
				name: 'New Marchingbandapp'
			});

			// Mock Marchingbandapp in scope
			scope.marchingbandapp = sampleMarchingbandappPutData;

			// Set PUT response
			$httpBackend.expectPUT(/marchingbandapps\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/marchingbandapps/' + sampleMarchingbandappPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid marchingbandappId and remove the Marchingbandapp from the scope', inject(function(Marchingbandapps) {
			// Create new Marchingbandapp object
			var sampleMarchingbandapp = new Marchingbandapps({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Marchingbandapps array and include the Marchingbandapp
			scope.marchingbandapps = [sampleMarchingbandapp];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/marchingbandapps\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleMarchingbandapp);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.marchingbandapps.length).toBe(0);
		}));
	});
}());