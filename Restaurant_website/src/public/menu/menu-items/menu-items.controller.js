(function () {
	'use strict';
	angular.module('public')
	.controller('MenuItemsController',MenuItemsController);

	MenuItemsController.$inject = ['items']
	function MenuItemsController(items) {
		var itemsCtrl = this;
		itemsCtrl.items = items;
	}
})();