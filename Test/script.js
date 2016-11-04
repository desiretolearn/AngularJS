(function() {
	'use strict';
	angular.module("StopWatch",[])
	.controller("CounterController", CounterController);

	CounterController.$inject = ['$interval'];
	function CounterController($interval) {
		var counterCtrl = this;
		var promise;
		var value = 0.00;
			counterCtrl.value = value.toFixed(2);
		counterCtrl.startCounter = function () {
			promise = $interval(incrementValue,10);
			
		}

		function incrementValue() {
			value += 0.01;
			counterCtrl.value = value.toFixed(2);
		}

		counterCtrl.resetCounter = function () {
			 value = 0.00;
			counterCtrl.value = value.toFixed(2);
			if(promise){
			$interval.cancel(promise);
			}
		}

		counterCtrl.stopCounter = function () {
			$interval.cancel(promise);
		}

		
		
	}


})(); 







