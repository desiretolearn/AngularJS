(function (){
	'use strict';

	angular.module('app',[])
	.controller('Ctrl',Ctrl)
	.filter('custom',CustomFilterFactory);

	Ctrl.$inject = ['customFilter'];
	function Ctrl(customFilter) {
		var ct = this;
		ct.msg = "Hello sushma how are you ?";
		ct.msg = customFilter(ct.msg,"sushma","Monish");
	}

	function CustomFilterFactory() {
		return function(input, target, replace) {
			input = input || "";
			input = input.replace(target,replace);
			return input;
		};
	} 
})();