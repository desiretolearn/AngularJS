(function (){
	'use strict';

	angular.module('MyApp',[])
	.controller('MyController',function($scope){
		$scope.name = "Sushma";
		$scope.sayHello = function() {
			return "Hello Sushma";
		}
	});

})();