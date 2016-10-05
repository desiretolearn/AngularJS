(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menu/templates/home.template.html'
  })
  .state('categoriesList',{
  	url:'/categories',
  	templateUrl: 'src/menu/templates/categories.template.html',
  	controller: 'CategoriesListController as catCtrl',
  	resolve: {
  		categories: ['MenuDataService',function(MenuDataService) {
  			return MenuDataService.getAllCategories();
  		}]
  	}
  })
  .state('itemsList',{
    url:'/items',
    templateUrl: 'src/menu/templates/items.template.html',
    params: {
      short_name:null
    },
    controller: 'itemsController as itemCtrl',
    resolve: {
      items: ['MenuDataService','$stateParams',function(MenuDataService,$stateParams) {
        return MenuDataService.getItemsForCategory($stateParams.short_name);
      }]
    }
  });
 }

})();