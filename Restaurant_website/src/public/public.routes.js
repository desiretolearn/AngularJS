(function () {
	'use strict';
	angular.module('public')
	.config(routeConfig);

	routeConfig.$inject = ['$stateProvider'];
	function routeConfig($stateProvider) {

		$stateProvider
		.state('public', {
				abstract: true,
				templateUrl: 'src/public/public.html'
		})
		.state('public.home', {
				url:'/',
				templateUrl: 'src/public/home/home.html'
		})
		.state('public.menu', {
				url:'/menu',
				templateUrl: 'src/public/menu/menu.html',
				controller:'MenuController',
				controllerAs:'menuCtrl',
				resolve: {
					menuCategories: ['MenuService', function (MenuService) {
						return MenuService.getCategories();
					}]
				}
		})
		.state('public.menuitems', {
			url:'/menu/{category}',
			templateUrl: 'src/public/menu/menu-items/menu-items.html',
			controller:'MenuItemsController',
			controllerAs:'itemsCtrl',
			resolve: {
				items: ['MenuService','$stateParams', function(MenuService,$stateParams) {
					return MenuService.getMenuItems($stateParams.category);
				}]
			}
		});
	}

})();