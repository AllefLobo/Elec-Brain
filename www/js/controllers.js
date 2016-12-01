angular.module("controllers",[])

	.controller('LoginController',['$scope', '$state', 'getUniquePersonService', function($scope, $state, getUniquePersonService){
		$scope.login = function(data){
			//getUniquePersonService
			getUniquePersonService.getPerson(data.username).then(function(response){
				console.log(response.data);
				window.localStorage.setItem('usuario', JSON.stringify(response.data));
				$state.go('tab.openTab');
			})
		};
	}])

  .controller('ConfigController',['$scope', function($scope){
    $scope.nome = "";
  }])

  .controller('OpenTabController',['getGroupsService','$scope', '$state', function TabController (getGroupsService, $scope, $state) {
		var usuario = JSON.parse(window.localStorage.getItem('usuario'));
		$scope.$watch(
			getGroupsService.getGroups(usuario['id']).then(function(response){
				groups = [];
				for (variable of response.data) {
					if (variable['fase'] == 'NOVA') {
						groups.push(variable);
						console.log(variable);
					}
				}
				console.log(groups);
				$scope.groups = groups;
			})
		);
	}])

  .controller('createGroupController', ['$scope', '$state', 'createGroupService', '$stateParams', function($scope, $state, createGroupService, $stateParams){
		$scope.create = function(params){
			var usuario = JSON.parse(window.localStorage.getItem('usuario'));

			console.log(usuario['id']);

			var descricao = params.description,
			id = usuario['id'],
			fase = "NOVA",
			gatilho = params.topic,
			titulo = params.title;

			createGroupService.postGroup(descricao, id, fase, gatilho, titulo).then(function(response){
				console.log(response.data);
				$state.go('tab.openTab');
			}, function(error){
				console.log(error);
			});
		};
  }])

	.controller('ThinkTabController', ['$scope', '$state', 'getGroupsService', function($scope, $state, getGroupsService){
		var usuario = JSON.parse(window.localStorage.getItem('usuario'));
		$scope.$watch(
			getGroupsService.getGroups(usuario['id']).then(function(response){
				groups = [];
				for (variable of response.data) {
					if (variable['fase'] == 'RECEBENDO_IDEIAS') {
						groups.push(variable);
					}
				}
				console.log(groups);
				$scope.groups = groups;
			})
		);
	}])

	.controller('ParticipantGroupSettingsController', ['$scope', '$stateParams', '$ionicHistory', 'getUniqueGroupService', function($scope, $stateParams, $ionicHistory, getUniqueGroupService){
		$scope.goBack = function() {
    	$ionicHistory.goBack();
  	};
		getUniqueGroupService.getGroup().then(function(response){
			$scope.group = response.data;
			console.log(response.data);
		});
	}])

	.controller('FacilitatorGroupSettingsController', ['$scope', '$stateParams', '$ionicHistory', 'getUniqueGroupService', 'updateUniqueGroupService', '$state', '$ionicModal', 'addParticipantService', function($scope, $stateParams, $ionicHistory, getUniqueGroupService, updateUniqueGroupService, $state, $ionicModal, addParticipantService){
		$scope.goBack = function() {
    	$ionicHistory.goBack();
  	};

		getUniqueGroupService.getGroup($stateParams.id).then(function(response){
			$scope.group = response.data;
			console.log(response.data);
		});

		$scope.save = function(group){
			var usuario = JSON.parse(window.localStorage.getItem('usuario'));
			//group['fase'] = "RECEBENDO_IDEIAS";
			group['facilitador'] = {'id': usuario['id'] };
			console.log(group);

			updateUniqueGroupService.setGroup(group).then(function(response){
				console.log(response.data);
				$state.go('tab.openTab');
			});
		};


		$scope.add = function(participant, groupId){
			addParticipantService.postParticipant(participant, groupId).then(function(response){
				console.log(response);
			});
		};

		$ionicModal.fromTemplateUrl('templates/addParticipant.html', {
	    scope: $scope,
			animation: 'slide-in-up'
	  }).then(function(newParticipant) {
	    $scope.newParticipant = newParticipant;
  	});

	}])

//----------------------------------------------------------------------------
//table

	.controller('TableController', ['$scope', '$stateParams', '$ionicHistory', 'getIdeasService', '$ionicModal', 'addIdeaService', function($scope, $stateParams, $ionicHistory, getIdeasService, $ionicModal, addIdeaService){
		$scope.goBack = function() {
			$ionicHistory.goBack();
		};

		console.log($stateParams.groupId);

		getIdeasService.getIdeas($stateParams.groupId).then(function(response){
			$scope.ideas = response.data;
			console.log(response.data);
		});

		$scope.add = function(idea){
			var usuario = JSON.parse(window.localStorage.getItem('usuario'));
			var autor = {
				"email": usuario['email'],
				"id": usuario['id'],
				"nome": usuario['nome']
			};
			addIdeaService.postIdea(autor, $stateParams.groupId, idea, idea).then(function(response){
				console.log(response);
				$scope.modal.remove();
			});
		};



	  $ionicModal.fromTemplateUrl('templates/newIdea.html', {
	    scope: $scope,
			animation: 'slide-in-up'
	  }).then(function(modal) {
	    $scope.modal = modal;
  	});

		$ionicModal.fromTemplateUrl('templates/newComment.html', {
	    scope: $scope,
			animation: 'slide-in-up'
	  }).then(function(newComment) {
	    $scope.newComment = newComment;
  	});

	}])

	;
