angular.module('starter')

.factory('factoryRegister', function($resource,URL) {
  return $resource(URL+"/users/create")
})

.factory('factoryLogin', function($resource, URL){
  return $resource(URL+"/sessions/login")
})

.factory('factoryEmail', function($resource, URL){
  return $resource(URL+"/users/verify_email")
})

.factory('factoryMarking', function($resource, URL){
  return $resource(URL+"/markings/create")
});
