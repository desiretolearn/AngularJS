(function () {
	'use strict';
	angular.module("FormApp",[]);
	angular.module("FormApp")
	.controller("FormController",FormController);

	function FormController() {
		var sample = this;
		sample.submit = function() {
					sample.completed = true;
		};
	}
})();