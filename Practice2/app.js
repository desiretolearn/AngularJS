(function (){
	'use strict';

	angular.module('NameCalculatorApp',[])
	.controller('NameCalculatorController',function($scope){
		$scope.name = "";
		$scope.numericValue = 0;
		
		$scope.displayNumeric = function() {
			var numericValue = calculateNameValue($scope.name);
			$scope.numericValue = numericValue;
		};

		function calculateNameValue(name) {
			var nameValue = 0;
			for(var i=0;i<name.length;i++) {
				nameValue += name.charCodeAt(i);
			}
			return nameValue;
		}
	});

})();