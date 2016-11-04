(function () {
"use strict";

angular.module('common')
.service('UserService', UserService);

function UserService() {
  var service = this;
  var newUser;
  
  service.addUser = function (user,response) {
       newUser = {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phone: user.phone,
        favourite: response
      }
    };
      
    service.getUser = function () {
      return newUser;
    };
}



})();
