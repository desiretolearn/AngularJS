(function () {
	'use strict';
	angular.module("NarrowItDownApp",[])
	.controller("NarrowItDownController",NarrowItDownController)
	.service("MenuSearchService",MenuSearchService)
	.service("MenuService",MenuService)
	.constant("APIBaseURL","https://davids-restaurant.herokuapp.com")
	.directive("foundItems",FoundItems)
	.controller("FoundItemsDirectiveController",FoundItemsDirectiveController);


	function FoundItems() {
	 	var ddo = {
	 		templateUrl : 'foundItems.html',
	 		scope: {
	 			itemsFound : '<',
	 			onRemove: '&'
	 		},
	 		controller: "FoundItemsDirectiveController as dCtrl",
	 		bindToController: true	 
	 	};
	 	return ddo;
	 }

	function FoundItemsDirectiveController() {
		var dCtrl = this;
		dCtrl.errorMessage = function() {
	 		if(dCtrl.itemsFound != undefined && dCtrl.itemsFound.length === 0) {
	 				return true;
	 		}
	 		return false;
	 	};
	}

	NarrowItDownController.$inject = ["MenuSearchService"];
	function NarrowItDownController(MenuSearchService) {
		var narrowDown = this;
		narrowDown.searchTerm = "";
		narrowDown.getItems = function() {
			narrowDown.found = MenuSearchService.getMatchedMenuItems(narrowDown.searchTerm);
			if(narrowDown.found == 0){
				narrowDown.errorMessage = "No Items Found";
			}
			else {
				narrowDown.errorMessage = "";
			}
		};
		narrowDown.removeItem = function(index) {
			MenuSearchService.removeItem(index);
		}
	}

	MenuSearchService.$inject = ["MenuService"];
	function MenuSearchService (MenuService) {
		var service =this;
		var foundItems;
		service.getMatchedMenuItems = function(searchTerm) {
			foundItems = [];
			var response = MenuService.getMenuItems();
			response
			.then (function(result) {
				var items = result.data.menu_items;
				for(var i in items) {
					if(items[i].description.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1) {
						foundItems.push(items[i]);	
					}
				}
			}).catch (function(error) {
				console.log(error);
			});
			return foundItems;
		}
		service.removeItem = function(index) {
			foundItems.splice(index,1);
		}
	}

	MenuService.$inject = ["APIBaseURL","$http"];
	function MenuService(APIBaseURL,$http) {
		var service = this;
		var foundItems = [];
		service.getMenuItems = function () {
			var response = $http({
				method: "GET",
				url: APIBaseURL+"/menu_items.json"
			});
			return response;
		}
	}
})();

