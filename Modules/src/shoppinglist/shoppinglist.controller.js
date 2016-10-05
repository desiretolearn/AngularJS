(function () {
	'use strict';

	angular.module('ShoppingList')
	.controller("ShoppingListController",ShoppingListController);

	ShoppingListController.$inject = ['ShoppingListFactory'];
	function ShoppingListController(ShoppingListFactory) {
		var list = this;
		var shoppingList = ShoppingListFactory.getShoppingListService();

		list.items = shoppingList.getItems();
		var origTitle = "Shopping List #1";
		list.title = origTitle + "(" + list.items.length+ " items)";
		list.itemName="";
		list.itemQuantity="";
		list.addItem = function () {
			shoppingList.addItem(list.itemName,list.itemQuantity);
			list.title = origTitle + "(" + list.items.length+ " items)";
		};
		list.removeItem = function(index) {
			this.lastRemoved = "last item removed was "+ this.items[index].name;
			shoppingList.removeItem(index);
			list.title = origTitle + "(" + list.items.length+ " items)";
		};
	}
})();