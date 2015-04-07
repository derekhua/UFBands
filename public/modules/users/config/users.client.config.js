'use strict';

// Configuring the Users module menu
/*
 * Menu method reference
 * Menus.addMenu(menuId, [isPublic], [roles])
 * Menus.addMenuItem(menuId, menuItemTitle, menuItemType, menuItemURL, 
 * 	[menuItemUIRoute], [isPublic], [roles], [position]);
 * Menus.addSubMenuItem(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, 
 * [menuItemUIRoute], [isPublic], [roles]);
 */

angular.module('users').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Rosters', 'item', 'admin/rosters', 'rosters', 'false', ['admin']);
		Menus.addMenuItem('topbar', 'Uniforms', 'item', 'admin/uniforms', 'uniforms', 'false', ['admin']);
		Menus.addMenuItem('topbar', 'Instruments', 'item', 'admin/instruments', 'instruments', 'false', ['admin']);
		Menus.addMenuItem('topbar', 'Manage Moderators', 'item', 'mods/list', '', 'false', ['admin']);
	}
]);

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Authentication',
			function($q, $location, Authentication) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								Authentication.user = null;

								// Redirect to signin page
								$location.path('signin');
								break;
							case 403:
								// Add unauthorized behaviour 
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
]);