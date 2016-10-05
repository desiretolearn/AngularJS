(function () {
	'use strict';

angular.module('ShoppingList')
.component('shoppingListComponent',{
	templateUrl : 'src/shoppinglist/shoppinglist.template.html',
	 	controller: ShoppingListComponentController,
	 	bindings: {
	 		items: '<',
	 		myTitle: '@title',
	 		onRemove: '&'
	} 
});

ShoppingListComponentController.$inject = ["$element","$rootScope","$q","WeightLossFilterService"];
	function ShoppingListComponentController($element,$rootScope,$q,WeightLossFilterService) {
	 	var $ctrl = this;
	 	var totalItems;

	 	$ctrl.remove = function(myIndex) {
	 		$ctrl.onRemove({index:myIndex});
	 	}; 

	 	$ctrl.$onInit = function() {
	 		totalItems = 0;
	 	};

	 	$ctrl.$doCheck = function() {
	 		if($ctrl.items.length !== totalItems) {
	 			totalItems = $ctrl.items.length;

	 			$rootScope.$broadcast('shoppinglistcomponent:processing',{on:true});
	 			var promises = [];
	 			for(var i=0;i<$ctrl.items.length;i++) {
	 				promises.push(WeightLossFilterService.checkName($ctrl.items[i].name));
	 			}

	 			$q.all(promises)
	 			.then(function (result) {
	 				var warningElem = $element.find('div.error');
	 				warningElem.slideUp(900);
	 			})
	 			.catch(function (result) {
	 				var warningElem = $element.find('div.error');
	 				warningElem.slideDown(900);
	 			})
	 			.finally(function () {
	 				$rootScope.$broadcast('shoppinglistcomponent:processing',{on:false});
	 			});
	 		}
	 	};

	 }
})();