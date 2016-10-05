(function () {
	'use strict';
	angular.module("Data")
	.service("MenuDataService",MenuDataService);

	MenuDataService.$inject = ["APIBaseURL","$http"];
	function MenuDataService(APIBaseURL,$http) {
		var service =this;
		service.getAllCategories = function() {
			var response = $http({
				method: "GET",
				url: (APIBaseURL+"/categories.json")
			});
			return response;
		}
		service.getItemsForCategory = function(shortName) {
			var response = $http({
				method: "GET",
				url: (APIBaseURL+"/menu_items.json"),
				params: {
					category : shortName
				}
			});
			return response;
		}
	}
})();
