(function () {
	'use strict';

	angular.module('ShoppingList')
	.controller('ItemDetailController',ItemDetailController);

	ItemDetailController.$inject = ['$stateParams','items'];
	function ItemDetailController($stateParams,items) {
		var itemdetail = this;
		var item = items[$stateParams.itemId];
		itemdetail.name = item.name;
		itemdetail.quantity = item.quantity;
		itemdetail.description = item.description;
	}
})();