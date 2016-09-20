(function () {
	'use strict';
	angular.module('app',[])
	.controller('ShoppingListController',ShoppingListController)
	
	 .provider('ShoppingListService',ShoppingListServiceProvider)
	 .config(Config);

	  /* This is to limit the maxItems to 2 which is set default to 10 in provider definition
	  This is run before any service,controller or factory is created or instantiated */
	 Config.$inject = ['ShoppingListServiceProvider'];
	 function Config(ShoppingListServiceProvider) {
	 	ShoppingListServiceProvider.defaults.maxItems = 2;
	 }

	ShoppingListController.$inject = ['ShoppingListService'];
	function ShoppingListController(ShoppingListService) {
		var list = this;
		console.log(ShoppingListService);
		list.items = ShoppingListService.getItems();
		list.itemName="";
		list.itemQuantity="";
		list.addItem = function () {
			try {
			ShoppingListService.addItem(list.itemName,list.itemQuantity); 
			} catch(error) {
				list.errorMessage = error.message;
			}
		};
		list.removeItem = function(index) {
			ShoppingListService.removeItem(index);
			console.log(list.items.length);
			console.log(list.maxItems);
			if(list.items.length < ShoppingListService.maxItems) {
				list.errorMessage = "";
			}
		};
	}

	function ShoppingListServiceProvider() {
		var provider = this;

		provider.defaults = {
			maxItems: 10
		};

		provider.$get = function() {
			var shoppingList = new ShoppingListService(provider.defaults.maxItems);
			return shoppingList;
		};
	}

	
		
	function ShoppingListService(maxItems){
		var service = this;
		var items = [];
		service.addItem = function (itemName,itemQuantity) {
			if ((maxItems === undefined) ||
				(maxItems !== undefined) && (items.length < maxItems)) {
				var item = {
					name: itemName,
					quantity: itemQuantity
				}
				items.push(item);
			}
			else {
				throw new Error("Max Items (" + maxItems + ") reached");
			}
		};

		service.getItems = function () {
			return items;
		};

		service.removeItem = function(index) {
			items.splice(index,1);
		};

		service.maxItems = maxItems;
	}



	
})();