(function () {
	'use strict';
	angular.module("public")
	.controller("myInfoController",myInfoController);

	myInfoController.$inject = ['ApiPath','user'];
	function myInfoController(ApiPath,user) {
		var myinfo = this;
		if(user) {
			myinfo.user = user;
			myinfo.basePath = ApiPath;
		}
		else {
			myinfo.signup = true;
		}	
	}
})();