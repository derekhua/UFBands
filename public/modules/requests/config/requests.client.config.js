'use strict';

// Configuring the Articles module
angular.module('requests').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Requests', 'requests', 'item');
	}
]);