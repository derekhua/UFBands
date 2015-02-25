'use strict';

// Configuring the Articles module
angular.module('bands').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'My Bands', 'bands', 'item');
	}
]);