angular.module('starter')

.controller('showMarkingCtrl',function($scope, $rootScope, currentMarkingService, $ionicModal, currentUserService, $state, factoryEvaluateIncidents, factoryEvaluatePev){
	var currentMarking = "";
	$scope.showPev = function(event, pev){
		$scope.currentUserEmail = currentUserService.getUserData().email;
		console.log(pev)
		$scope.marking = pev;
		$scope.types = [];
		if (pev.paper == true)
			$scope.types.push("Papel");
		if (pev.glass == true)
			$scope.types.push("Vidro");
		if (pev.metal == true)
			$scope.types.push("Metal");
		if (pev.plastic == true)
			$scope.types.push("Plástico");
		$scope.modal.show();
	};
	$scope.showIncident = function(event, incident){
		$scope.currentUserEmail = currentUserService.getUserData().email;
		$scope.marking = incident;
		$scope.types = [];
		$scope.modal.show();
	};

	$scope.editMarking = function(marking){
		$scope.modal.hide();
		console.log(marking);
		// trocar o "paper" quando mudar o banco
		if(angular.isDefined(marking.paper)){
			$state.go('editPEV');
		} else {
			currentMarkingService.setMarking(marking);
			$state.go('editMarking');
		}
	};
	
	$scope.evaluate = function(marking, evaluation) { 
		// trocar o "paper" quando mudar o banco
		if (angular.isDefined(marking.paper)){		
		    var index = $rootScope.pevs.indexOf(marking); 
		    if (evaluation){
		    	$rootScope.pevs[index].likes += 1;	
		    	$scope.buttonClicked = false;
		    } else {
		    	$rootScope.pevs[index].dislikes += 1;	
		    	$scope.buttonClicked = false;
		    }
		    console.log($rootScope.pevs[index])
			factoryEvaluatePev.save($rootScope.pevs[index], function(result){
				console.log(result)
			}, function(error){
				console.log(error)
			});
		} else {
		    var index = $rootScope.markings.indexOf(marking); 
		    if (evaluation){
		    	$rootScope.markings[index].likes += 1;	
		    	$scope.buttonClicked = false;
		    } else {
		    	$rootScope.markings[index].dislikes += 1;
		    	$scope.buttonClicked = false;	
		    }
		    console.log($rootScope.markings[index])
			factoryEvaluateIncidents.save($rootScope.markings[index], function(result){
				console.log(result)
			}, function(error){
				console.log(error)
			});
		}
	};

	$ionicModal.fromTemplateUrl('views/marking/showMarking.html', {
		scope: $scope,
	}).then(function(modal){
		$scope.modal = modal;
	});
});

