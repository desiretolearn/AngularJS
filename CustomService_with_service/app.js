(function () {
	'use strict';
	angular.module('app',[])
	.controller('ShoppingListAddController',ShoppingListAddController)
	.controller('ShoppingListShowController',ShoppingListShowController)
	 .service('ShoppingListService',ShoppingListService);

	ShoppingListAddController.$inject = ['ShoppingListService'];
	function ShoppingListAddController(ShoppingListService) {
		var addList = this;
		
		addList.itemName="";
		addList.itemQuantity="";
		addList.addItem = function () {
			ShoppingListService.addItem(addList.itemName,addList.itemQuantity); 
		};
		
	}

	ShoppingListShowController.$inject = ['ShoppingListService'];
	function ShoppingListShowController(ShoppingListService) {
		var showList = this;
		showList.items = ShoppingListService.getItems();
		showList.removeItem = function(index) {
			ShoppingListService.removeItem(index);
		};
	}

	
	function ShoppingListService(){
		var service = this;
		var items = [];
		service.addItem = function (itemName,itemQuantity) {
			var item = {
				name: itemName,
				quantity: itemQuantity
			}
			items.push(item);
		}
			
		service.getItems = function () {
			return items;
		};

		service.removeItem = function(index) {
			items.splice(index,1);
		};
	}



	
})();