'use strict';

// Configuring the Music module
angular.module('music').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Music', 'dropdown', 'music', '/music(/create)?');
		Menus.addSubMenuItem('topbar', 'music', 'List Music', 'music');
		Menus.addSubMenuItem('topbar', 'music', 'New Music', 'music/create', 'music/create', false, ['admin']);

	}
]);