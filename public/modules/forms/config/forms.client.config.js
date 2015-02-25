'use strict';

// Configuring the Articles module
angular.module('forms').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'My Forms', 'forms', 'dropdown');
		Menus.addSubMenuItem('topbar', 'forms', 'List Forms', 'forms');
		Menus.addSubMenuItem('topbar', 'forms', 'Status', 'forms/status');
		Menus.addSubMenuItem('topbar', 'forms', 'Apply', 'forms/apply');
	}
]);