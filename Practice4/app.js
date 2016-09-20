(function (){
	'use strict';

	angular.module('DIApp',[])
	.controller('DIController',DIController);
	

	function DIController($filter){
		var DIC = this;
		DIC.name = "Sushma";
		DIC.upper = function() {
			console.log(DIC);
			var upCase = $filter('uppercase');
			DIC.name = upCase(DIC.name);
		}
	}

})();