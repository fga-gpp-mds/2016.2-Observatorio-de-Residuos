angular.module('app.controllers')

  .controller("newPevCtrl", function ($ionicHistory, $state, $scope, $rootScope, $http, factoryPEV, $ionicPopup, $cordovaGeolocation) {
    $rootScope.pevs = [];

    $http.get('http://localhost:3000/pevs')

    .success(function(content){
      angular.forEach(content, function(value, key) {
      $rootScope.pevs.push(value);
    })
    }).error(function(data){
      console.log(data)
    })
    $scope.createPEV = function (pev) {
      navigator.geolocation.getCurrentPosition(function(pos){
        pev.latitude = pos.coords.latitude;
        pev.longitude = pos.coords.longitude;
      })
      factoryPEV.save(pev, function (result){
        $rootScope.pevs.push({
          name: pev.name,
          paper: pev.paper,
          plastic: pev.plastic,
          metal: pev.metal,
          glass: pev.glass,
          comment: pev.comment,
          latitude: pev.latitude,
          longitude: pev.longitude
        });
        var alertPopup = $ionicPopup.alert({
          title: "PEV cadastrada com sucesso",
          template: "Obrigado por contribuir!"
        })
        console.log("Success!")
        $ionicHistory.nextViewOptions({
          disableBack: true
        })
        $state.go('tabs.map')
        console.log(pev)
        /* This state must be reset and the back button too */
      }, function (error) {
        var alertPopup = $ionicPopup.alert({
          title: 'Informações insuficientes',
          template: 'Preencha as informações corretamente!'
        })
      })
    }

})
