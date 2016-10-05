(function () {
'use strict';

angular.module('MenuApp')
.controller('itemsController', itemsController);
	
	itemsController.$inject = ['items'];
	function itemsController(items) {
		console.log(items);
  		var itemCtrl = this;
  		itemCtrl.items = items.data.menu_items;
  		console.log(itemCtrl.items);
	}

})();