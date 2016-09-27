(function () {
	'use strict';
	angular.module('app',[])
	.controller('ShoppingListController1',ShoppingListController1)
	.controller('ShoppingListController2',ShoppingListController2)
	 .factory('ShoppingListFactory',ShoppingListFactory)
	 .directive('listItemDescription',ListItemDescription)
	 .directive('listItem',ListItem);

	 function ListItemDescription() {
	 	var ddo = {
	 		template : '{{item.quantity}} of {{item.name}}'
	 	}
	 	return ddo;
	 }

	 function ListItem() {
	 	var ddo = {
	 		templateUrl : "listItem.html"
	 	}
	 	return ddo;
	 }

	ShoppingListController1.$inject = ['ShoppingListFactory'];
	function ShoppingListController1(ShoppingListFactory) {
		var list1 = this;
		/* below line for factory returned as function 
		var shoppingList = ShoppingListFactory(); */

		/* below line for factory returned as objext literal */
		var shoppingList = ShoppingListFactory.getShoppingListService();
		console.log(shoppingList);

		list1.items = shoppingList.getItems();
		list1.itemName="";
		list1.itemQuantity="";
		list1.addItem = function () {
			shoppingList.addItem(list1.itemName,list1.itemQuantity); 
		};
		list1.removeItem = function(index) {
			shoppingList.removeItem(index);
		};
	}

	ShoppingListController2.$inject = ['ShoppingListFactory'];
	function ShoppingListController2(ShoppingListFactory) {
		var list2 = this;
		/* below line for factory returned as function 
		var shoppingList = ShoppingListFactory(); */

		/* below line for factory returned as objext literal */
		var shoppingList = ShoppingListFactory.getShoppingListService(3);

		list2.items = shoppingList.getItems();
		list2.itemName="";
		list2.itemQuantity="";
		list2.addItem = function () {
			try {
			shoppingList.addItem(list2.itemName,list2.itemQuantity);
			} catch(error) {
				list2.errorMessage = error.message;
			}
		};
		list2.removeItem = function(index) {
			shoppingList.removeItem(index);
		};
	}

	function ShoppingListFactory () {
		/* returns factory as a object literal */
		var factory = {
			getShoppingListService: function(maxItems) {
				return new ShoppingListService(maxItems);
			}
		}; 
		
		/* returns factory as a function 
		var factory = function (maxItems) {
			return new ShoppingListService(maxItems); 
		}; */
		return factory;
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
	}



	
})();