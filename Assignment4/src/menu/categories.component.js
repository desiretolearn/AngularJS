(function () {
	'use strict';
	angular.module("MenuApp")
	.component("categoriesList", {
  		templateUrl: 'src/menu/templates/categorylist.template.html',
  		bindings: {
    		categories: '<'
  		}
	});

})();