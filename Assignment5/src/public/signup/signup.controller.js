(function () {
	'use strict';
	angular.module("public")
	.controller("SignUpController",SignUpController);

	SignUpController.$inject = ['MenuService','UserService'];
	function SignUpController(MenuService,UserService) {
		var signup = this;
		signup.submit = function() {

					signup.error = "";
					signup.message = "";
					var promise = MenuService.checkShortName(signup.user.favourite);
					promise
					.then(function (response) {
						UserService.addUser(signup.user,response);
						signup.message = "Your information has been saved";
					})
					.catch(function (error) {
						signup.error = "No such menu number exists";
					});
		};
	}
})();