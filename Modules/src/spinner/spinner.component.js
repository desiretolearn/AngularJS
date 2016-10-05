(function () {
	'use strict';

angular.module('Spinner')
.component('loadingSpinner',{
	templateUrl : 'src/spinner/spinner.template.html',
	controller: SpinnerController
});

SpinnerController.$inject = ['$rootScope'];
	 function SpinnerController($rootScope) {
		var $ctrl = this;
		var cancelListener = $rootScope.$on('shoppinglistcomponent:processing', function(event,data) {
			console.log(event);
			console.log(data);

			if(data.on) {
				$ctrl.showSpinner = true;
			}
			else {
				$ctrl.showSpinner = false;
			}
		});

		$ctrl.$onDestroy = function() {
			cancelListener();
		};
	 };

})();





