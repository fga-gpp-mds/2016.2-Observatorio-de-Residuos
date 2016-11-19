angular.module('starter')

.controller('complaintMarkingCtrl', function($scope, $rootScope, $http, currentMarkingService, currentUserService, factoryComplaint, $ionicPopup, $state){
  $scope.confirmComplaint = function(complaint) {
			$ionicPopup.confirm({
			title: 'Adicionar denúncia',
			template: 'Deseja finalizar denúncia?'
		})

   	.then(function(res) {
			if(res) {
        complaint.author = currentUserService.getUserData().email;
        complaint.id_marking = currentMarkingService.getMarking().id_incidente;
			  factoryComplaint.save(complaint, function(result){
					var alertPopup = $ionicPopup.alert({
  					title: 'Marcação denunciada com sucesso',
  					template: 'Obrigado por contribuir!'
					});
          $state.go("tabs.map")
				}, function(erro){
					console.log(erro);
				})
			} else {
			console.log('não');
			}
		});
	};
});
