(function () {
	'use strict';
	angular.module("app",[])
	.controller("ShoppingListController",ShoppingListController)
	.controller("ShoppingController",ShoppingController)
	.service("ShoppingListService",ShoppingListService)
	.service("WeightLossFilterService",WeightLossFilterService);

	ShoppingListController.$inject = ["ShoppingListService"];
	function ShoppingListController(ShoppingListService) {
		var list = this;
		list.itemName = "";
		list.itemQuantity = "";

		list.addItem = function () {
			ShoppingListService.addItem(list.itemName,list.itemQuantity);
		}

	}

	ShoppingController.$inject = ["ShoppingListService"];
	function ShoppingController(ShoppingListService) {
		var showList = this;
		showList.items = ShoppingListService.getItems();

		showList.removeItem = function (index) {
			ShoppingListService.removeItem(index);
		}
	}

	ShoppingListService.$inject = ['$q','WeightLossFilterService']
	function ShoppingListService($q,WeightLossFilterService) {
		var service = this;
		var items = [];

		service.getItems = function() {
			return items;
		}
		// service.addItem = function(itemName,itemQuantity) {
		// 	var promise = WeightLossFilterService.checkName(itemName);
		// 	promise
		// 	.then(function (response) {
		// 		return WeightLossFilterService.checkQuantity(itemQuantity);
		// 	})
		// 	.then(function (response) {
		// 		var item = {
		// 			name :itemName,
		// 			quantity:itemQuantity
		// 		};
		// 		items.push(item); 
		// 	})
		// 	.catch(function (errorResponse) {
		// 			console.log(errorResponse.message);
		// 	});	
		// }

		service.addItem = function(itemName,itemQuantity) {
			var namePromise = WeightLossFilterService.checkName(itemName);
			var quantityPromise = WeightLossFilterService.checkQuantity(itemQuantity);

			$q.all([namePromise,quantityPromise])
			.then(function (response) {
				var item = {
					name :itemName,
					quantity:itemQuantity
				};
				items.push(item);
			})
			.catch(function (errorResponse) {
					console.log(errorResponse.message);
			});
		}

		service.removeItem = function(index) {
			items.splice(index,1);
		}
	}

	WeightLossFilterService.$inject = ['$q','$timeout'];
	function WeightLossFilterService($q,$timeout) {
		var service = this;
		service.checkName = function(name) {
			var deferred = $q.defer();
			var result = {
				message: ""
			}
			$timeout(function () {
				if(name.toLowerCase().indexOf('cookie') == -1) {
					deferred.resolve(result);
				}
				else {
					result.message = "Stay away from cookies...."
					deferred.reject(result);
				}
			},3000);
			return deferred.promise;
		};

		service.checkQuantity = function(quantity) {
			var deferred = $q.defer();
			var result = {
				message: ""
			}
			$timeout(function () {
				if(quantity <=5) {
					deferred.resolve(result);
				}
				else {
					result.message = "Thats too much";
					deferred.reject(result);
				}
			},1000);
			return deferred.promise;
		}; 
	}

})();