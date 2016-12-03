angular.module("controllers",[])

	.controller('signupController', ['$scope', '$state', 'addPessoaService', function($scope, $state, addPessoaService){
		$scope.cadastrar = function(nome){
			addPessoaService.postPessoa(nome).then(function(response){
				console.log(response);
				$state.go('tab.openTab');
			}), function error(response){
				console.log(response);
				$state.go('signup');
			};
		};
	}])

	.controller('LoginController',['$scope', '$state', 'getUniquePersonService', function($scope, $state, getUniquePersonService){
		$scope.login = function(nome){
			//getUniquePersonService
			getUniquePersonService.getPerson(nome).then(function(response){
				console.log(response.data);
				window.localStorage.setItem('usuario', JSON.stringify(response.data));
				$state.go('tab.openTab');
			}), function error(response){
				console.log(response);
				$state.go('login');
			};
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
			$scope.participantes = response.data.participantes;
			console.log(response.data);
		});

		$scope.save = function(group){
			var usuario = JSON.parse(window.localStorage.getItem('usuario'));
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

	.controller('TableController', ['$scope', '$stateParams', '$ionicHistory', 'getIdeasService', function($scope, $stateParams, $ionicHistory, getIdeasService){
		$scope.goBack = function() {
			$ionicHistory.goBack();
		};

		getIdeasService.getIdeas($stateParams.groupId).then(function(response){
			$scope.ideias = response.data;
			$scope.groupId = $stateParams.groupId;
			console.log(response.data);
		});

	}])

	.controller('CommentsController', ['$scope', '$stateParams', '$ionicHistory', 'getCommentsService', 'addCommentService', function($scope, $stateParams, $ionicHistory, getCommentsService, addCommentService){

		$scope.goBack = function() {
			$ionicHistory.goBack();
		};

		getCommentsService.getComments($stateParams.ideiaId).then(function(response){
			console.log(response.data.comentarios);
			$scope.comentarios = response.data.comentarios;
		});

		$scope.comentar = function(texto){
			var usuario = JSON.parse(window.localStorage.getItem('usuario'));

			addCommentService.postComment( usuario['id'], $stateParams.ideiaId, texto).then(function(response){
				console.log('deu certo');
			});
		}


	}])


	.controller('NovaIdeiaController', ['$scope', '$state', '$stateParams', '$ionicHistory', 'addIdeaService', function($scope, $state, $stateParams, $ionicHistory, addIdeaService){
		$scope.goBack = function() {
			$ionicHistory.goBack();
		};

		$scope.enviar = function(ideia){
			var usuario = JSON.parse(window.localStorage.getItem('usuario'));
			var autor = {
				"email": usuario['email'],
				"id": usuario['id'],
				"nome": usuario['nome']
			};
			addIdeaService.postIdea(autor, $stateParams.groupId, ideia).then(function(response){
				console.log(response);
				console.log('go back aki');
			});
		}
	}])

	;
