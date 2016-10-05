(function () {
	'use strict';
	angular.module('app',[])
	.controller('ShoppingListController',ShoppingListController)
	 .factory('ShoppingListFactory',ShoppingListFactory)
	 .component('shoppingListComponent',{
	 	templateUrl : 'shoppingList.html',
	 	controller: ShoppingListComponentController,
	 	bindings: {
	 		items: '<',
	 		myTitle: '@title',
	 		onRemove: '&'
	 	} 
	 });

	 ShoppingListComponentController.$inject = ["$element"];
	function ShoppingListComponentController($element) {
	 	var $ctrl = this;
	 	var totalItems;

	 	$ctrl.cookiesInList = function() {
	 		for(var i=0;i<$ctrl.items.length;i++){
	 			var name = $ctrl.items[i].name;
	 			if(name.toLowerCase().indexOf('cookie')!==-1) {
	 				return true;
	 			}
	 		}
	 		return false;
	 	};

	 	$ctrl.remove = function(myIndex) {
	 		$ctrl.onRemove({index:myIndex});
	 	};

	 	$ctrl.$onInit = function() {
	 		totalItems = 0;
	 	};

	 	$ctrl.$onChanges = function(changeObj) {
	 		console.log(changeObj);
	 	};

	 	$ctrl.$doCheck = function() {
	 		if($ctrl.items.length !== totalItems) {
	 			totalItems = $ctrl.items.length;
	 			if($ctrl.cookiesInList()) {
	 				var warningElem = $element.find('div.error');
	 				warningElem.slideDown(900);
	 			}
	 			else {
	 				var warningElem = $element.find('div.error');
	 				warningElem.slideUp(900);
	 			}
	 		}
	 	};


	 	/* $ctrl.$postLink = function() {
	 		$scope.$watch('$ctrl.cookiesInList()', function(newValue,oldValue) {
	 			console.log($element);
	 			if(newValue === true) {
	 				var warningElem = $element.find('div.error');
	 				warningElem.slideDown(900);
	 			}
	 			else {
	 				var warningElem = $element.find('div.error');
	 				warningElem.slideUp(900);
	 			}
	 		})
	 	}; */

	 }

	

	ShoppingListController.$inject = ['ShoppingListFactory'];
	function ShoppingListController(ShoppingListFactory) {
		var list = this;
		/* below line for factory returned as function 
		var shoppingList = ShoppingListFactory(); */

		/* below line for factory returned as objext literal */
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