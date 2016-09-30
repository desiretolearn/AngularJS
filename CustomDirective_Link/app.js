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
	 			onRemove: '&onRemoveItem'
	 		},
	 		controller: "ShoppingListDirectiveController as list",
	 		//controllerAs:'list',
	 		bindToController: true,
	 		link: ShoppingListDirectiveLink 
	 	};
	 	return ddo;
	 }

	 function ShoppingListDirectiveLink(scope,element,attrs,controller) {
	 	console.log("link scope is:", scope);
	 	console.log("link element is:", element);
	 	console.log("link attrs is:", attrs);
	 	console.log("link controller is:", controller);
	 	scope.$watch('list.cookiesInList()', function(newValue,oldValue) {
	 		console.log("oldValue :", oldValue);
	 		console.log("newValue :", newValue);
	 		if(newValue === true) {
	 			displayCookieWarning();
	 		}
	 		else {
	 			removeCookieWarning();
	 		}

	 	});
	 	function displayCookieWarning() {
	 		//Using JQlite
	 		/*var warn_ele = element.find("div");
	 		console.log(warn_ele);
	 		warn_ele.css('display','block'); */
	 		// If Jquery file is b4 Angularjs file
	 		var warn_ele = element.find("div.error");
	 		warn_ele.slideDown(900);
	 }

	 function removeCookieWarning() {
	 		//Using JQlite
	 		/*var warn_ele = element.find("div");
	 		warn_ele.css('display','none'); */

	 		//If JQuery is b4 angularjs
	 		var warn_ele = element.find("div.error");
	 		warn_ele.slideUp(900);
	 }

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

	ShoppingListController2.$inject = ['ShoppingListFactory'];
	function ShoppingListController2(ShoppingListFactory) {
		var list2 = this;
		/* below line for factory returned as function 
		var shoppingList = ShoppingListFactory(); */

		/* below line for factory returned as objext literal */
		var shoppingList = ShoppingListFactory.getShoppingListService(3);

		list2.items = shoppingList.getItems();
		var origTitle = "Shopping List #2 (limited to 3 items)";
		list2.title = origTitle + "(" + list2.items.length+ " items)";
		list2.itemName="";
		list2.itemQuantity="";
		list2.addItem = function () {
			try {
			shoppingList.addItem(list2.itemName,list2.itemQuantity);
			list2.title = origTitle + "(" + list2.items.length+ " items)";
			} catch(error) {
				list2.errorMessage = error.message;
			}
		};
		list2.removeItem = function(index) {
			shoppingList.removeItem(index);
			list2.title = origTitle + "(" + list2.items.length+ " items)";
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