(function () {
	'use strict';
	angular.module("MenuApp")
	.component("itemsList", {
  		templateUrl: 'src/menu/templates/itemlist.template.html',
  		bindings: {
    		items: '<'
  		}
	});
})();