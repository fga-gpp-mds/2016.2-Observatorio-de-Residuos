angular.module('app.controllers')

.controller('signinCtrl', function ($scope, $stateParams, $state, socialLoginService, firebaseService, currentUserService, factoryEmail, factoryLogin, $ionicLoading, $timeout) {
  $scope.loginAttempt = function(user){
      console.log(user);
      factoryLogin.save(user, function(result){
        console.log(result);
        $state.go("menu.home")
        $scope.loginError = false;
      }, function(error){
        console.log("ERRO!")
        $scope.loginError = true;
      })
    }

  $scope.registerSocial = function(socialNetwork){
      var login = firebaseService.socialLogin(socialNetwork);
      login.then(function() {
        $scope.user = firebaseService.getData();
        if($scope.user != null){
          socialLoginService.login($scope.user);
        }  
      });
      $ionicLoading.show({
      template: 'Recebendo suas informações... <ion-spinner icon="android"></ion-spinner>'
      });
      $timeout(function(){
        $ionicLoading.hide();
      },3000);
  }
})