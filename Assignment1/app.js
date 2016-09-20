(function(){
	'use strict';
	angular.module("LunchCheck",[])
	.controller("LunchCheckController",LunchCheckController);
// Uncomment if not using controller as syntax
	//  LunchCheckController.$inject = ["$scope"];
	// function LunchCheckController($scope){
	// 	$scope.lunchMenu = "";
	// 	$scope.message="";
	// 	$scope.countMenuItems = function() {
	// 		var message = getMessage($scope.lunchMenu);
	// 		$scope.message = message;
	// 	}

// comment if not using controller as syntax
	function LunchCheckController(){
		var check = this;
		check.lunchMenu = "";
		check.message="";
		check.countMenuItems = function() {
			var message = getMessage(check.lunchMenu);
			check.message = message;
		}


		function getMessage(data) {
			var itemCount = countItemsFromData(data);
			var msg = "";
			if (itemCount < 1) {
				msg = "Please enter data first";
				applyStyles("red");
			}
			else if (itemCount >=1 && itemCount <=3) {
				msg = "Enjoy!"
				applyStyles("green");
			}
			else {
				msg = "Too much!"
				applyStyles("green");
			}
			return msg;
		}

		function countItemsFromData(data) {
			var items = data.split(",");
			var itemsTrimmed = trimArray(items);
			return itemsTrimmed.length;
		}

		function applyStyles(color){
			var msgDiv = document.querySelector(".message");
			msgDiv.style.color = color;
			var textBox = document.querySelector("#lunch-menu");
			textBox.style.borderColor = color;
		}	
			

		function trimArray(arr) {
			for (var n = 0;n<arr.length;n++) {
				arr[n] = arr[n].trim();
				if (arr[n].length == 0) {
					arr.splice(n,1);
					n--;
				}
			}
			return arr;
		}
	}
})();