(function () {
	'use strict';
	angular.module("public")
	.component('menuItem', {
		templateUrl: 'src/public/menu/menu-items/menu-item.html',
		bindings: {
			item: '<'
		},
		controller:MenuItemController,
		controllerAs:'menuItemCtrl'
	});
	MenuItemController.$inject =['ApiPath'];
	function MenuItemController(ApiPath) {
		var menuItemCtrl = this;
		menuItemCtrl.basePath = ApiPath;
	}
})();