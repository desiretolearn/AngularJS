(function () {
	'use strict';
	angular.module('app',[])
	.controller('ShoppingListController1',ShoppingListController1)
	.controller('ShoppingListDirectiveController',ShoppingListDirectiveController)
	 .factory('ShoppingListFactory',ShoppingListFactory)
	 .directive('shoppingList',ShoppingList);

	 function ShoppingList() {
	 	var ddo = {
	 		templateUrl : 'shoppingList.html',
	 		scope: {
	 			items : '<',
	 			title: '@',
	 			badRemove: '=badRemoveItem',
	 			onRemove: '&onRemoveItem'
	 		},
	 		controller: "ShoppingListDirectiveController as list",
	 		//controllerAs:'list',
	 		bindToController: true	 
	 	};
	 	return ddo;
	 }


	 function ShoppingListDirectiveController() {
	 	var list = this;
	 	this.cookiesInList = function() {
	 		for(var i=0;i<list.items.length;i++){
	 			var name = list.items[i].name;
	 			if(name.toLowerCase().indexOf('cookie')!==-1) {
	 				return true;
	 			}
	 		}
	 		return false;
	 	};
	 }

	

	ShoppingListController1.$inject = ['ShoppingListFactory'];
	function ShoppingListController1(ShoppingListFactory) {
		var list1 = this;
		/* below line for factory returned as function 
		var shoppingList = ShoppingListFactory(); */

		/* below line for factory returned as objext literal */
		var shoppingList = ShoppingListFactory.getShoppingListService();

		list1.items = shoppingList.getItems();
		var origTitle = "Shopping List #1";
		list1.title = origTitle + "(" + list1.items.length+ " items)";
		list1.itemName="";
		list1.itemQuantity="";
		list1.addItem = function () {
			shoppingList.addItem(list1.itemName,list1.itemQuantity);
			list1.title = origTitle + "(" + list1.items.length+ " items)"; 
		};
		list1.removeItem = function(index) {
			this.lastRemoved = "last item removed was "+ this.items[index].name;
			shoppingList.removeItem(index);
			list1.title = origTitle + "(" + list1.items.length+ " items)";
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