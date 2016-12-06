angular.module("controllers",[])

	.controller('signupController', ['$scope', '$state', 'addPessoaService', '$ionicHistory', function($scope, $state, addPessoaService, $ionicHistory){
		$scope.goBack = function() {
			$ionicHistory.goBack();
		};

		$scope.cadastrar = function(nome){
			addPessoaService.postPessoa(nome).then(function(response){
				console.log(response);
				$state.go('login');
			}), function error(response){
				console.log(response);
				$state.go('signup');
			};
		};
	}])

	.controller('EditPerfilController', ['$scope', '$state', 'updatePessoaService', function($scope, $state, updatePessoaService){
		$scope.editar = function(novoNome){
				var usuario = JSON.parse(window.localStorage.getItem('usuario'));
			updatePessoaService.postPessoa( novoNome, usuario['id']).then(function(){
				usuario['nome'] = novoNome;
				window.localStorage.setItem('usuario', JSON.stringify(usuario));
				$state.go('tab.openTab');
			});
		}
	}])

	.controller('LoginController',['$scope', '$state', 'getPeopleService', function($scope, $state, getPeopleService){
		$scope.login = function(nome, endereco){
			window.localStorage.setItem('endereco', endereco);
			
			getPeopleService.getPeople().then(function(response){
				for (variable of response.data) {
					if (variable.nome == nome) {
						window.localStorage.setItem('usuario', JSON.stringify(variable));
						$state.go('tab.openTab');
						return 1;
					}
				}
				$state.go('login');
			}), function error(response){
				console.log(response);
				$state.go('login');
			};
		};
	}])

  .controller('ConfigController',['$scope', '$state', function($scope, $state){
    $scope.logout = function(){
			window.localStorage.empty();
			$state.go('login');
		}
  }])

  .controller('OpenTabController',['getGroupsService','$scope', '$state', function TabController (getGroupsService, $scope, $state) {
		var usuario = JSON.parse(window.localStorage.getItem('usuario'));
		$scope.usuario = usuario;
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
				$scope.teste = !groups.length;
			})
		);

		$scope.doRefresh = function() {
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
				$scope.teste = !groups.length;
			})
     .finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
  	};

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
		$scope.usuario = usuario;
		$scope.$watch(
			getGroupsService.getGroups(usuario['id']).then(function(response){
				groups = [];
				for (variable of response.data) {
					if (variable['fase'] == 'RECEBENDO_IDEIAS' ) {
						console.log(variable);
						groups.push(variable);
					}
				}
				console.log(groups);
				$scope.groups = groups;
				$scope.teste = !groups.length;
			})
		);

		$scope.doRefresh = function() {
			getGroupsService.getGroups(usuario['id']).then(function(response){
				groups = [];
				for (variable of response.data) {
					if (variable['fase'] == 'RECEBENDO_IDEIAS' ) {
						groups.push(variable);
					}
				}
				console.log(groups);
				$scope.groups = groups;
				$scope.teste = !groups.length;
			})
     .finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
  	};

	}])

	.controller('ArguingTabController', ['$scope', '$state', 'getGroupsService', function($scope, $state, getGroupsService){
		var usuario = JSON.parse(window.localStorage.getItem('usuario'));
		$scope.usuario = usuario;
		$scope.$watch(
			getGroupsService.getGroups(usuario['id']).then(function(response){
				groups = [];
				for (variable of response.data) {
					if (variable['fase'] == 'DISCUTINDO_IDEIAS') {
						groups.push(variable);
					}
				}
				console.log(groups);
				$scope.groups = groups;
				$scope.teste = !groups.length;
			})
		);

		$scope.doRefresh = function() {
			getGroupsService.getGroups(usuario['id']).then(function(response){
				groups = [];
				for (variable of response.data) {
					if (variable['fase'] == 'DISCUTINDO_IDEIAS') {
						groups.push(variable);
					}
				}
				console.log(groups);
				$scope.groups = groups;
				$scope.teste = !groups.length;
			})
     .finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
  	};

	}])

	.controller('EvaluationTabController', ['$scope', '$state', 'getGroupsService', function($scope, $state, getGroupsService){
		var usuario = JSON.parse(window.localStorage.getItem('usuario'));
		$scope.usuario = usuario;
		$scope.$watch(
			getGroupsService.getGroups(usuario['id']).then(function(response){
				groups = [];
				for (variable of response.data) {
					if (variable['fase'] == 'AVALIANDO_IDEIAS') {
						groups.push(variable);
					}
				}
				console.log(groups);
				$scope.groups = groups;
				$scope.teste = !groups.length;
			})
		);

		$scope.doRefresh = function() {
			getGroupsService.getGroups(usuario['id']).then(function(response){
				groups = [];
				for (variable of response.data) {
					if (variable['fase'] == 'AVALIANDO_IDEIAS') {
						groups.push(variable);
					}
				}
				console.log(groups);
				$scope.groups = groups;
				$scope.teste = !groups.length;
			})
     .finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
  	};

	}])

	.controller('ClosedTabController', ['$scope', '$state', 'getGroupsService', function($scope, $state, getGroupsService){
		var usuario = JSON.parse(window.localStorage.getItem('usuario'));
		$scope.usuario = usuario;
		$scope.$watch(
			getGroupsService.getGroups(usuario['id']).then(function(response){
				var groups = [];
				for (variable of response.data) {
					if (variable['fase'] == 'ENCERRADA') {
						groups.push(variable);
					}
				}

				var rank = [];
				for (ideia of groups) {

				}
				console.log(groups);
				$scope.groups = groups;
				$scope.teste = !groups.length;
			})
		);

		$scope.doRefresh = function() {
			getGroupsService.getGroups(usuario['id']).then(function(response){
				groups = [];
				for (variable of response.data) {
					if (variable['fase'] == 'ENCERRADA') {
						groups.push(variable);
					}
				}
				console.log(groups);
				$scope.groups = groups;
				$scope.teste = !groups.length;
			})
     .finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
  	};

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

	.controller('FacilitatorGroupSettingsController', ['$scope', '$stateParams', '$ionicHistory', 'getUniqueGroupService', 'updateUniqueGroupService', '$state', '$ionicModal', 'addParticipantService', 'getPeopleService', function($scope, $stateParams, $ionicHistory, getUniqueGroupService, updateUniqueGroupService, $state, $ionicModal, addParticipantService, getPeopleService){
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
				window.location.reload();
			});
		};

		$scope.add = function(participante, groupId){
			getPeopleService.getPeople().then(function(response){
				for (variable of response.data) {
					if (variable.nome == participante) {
						addParticipantService.postParticipant( variable.id, groupId).then(function(response){
							console.log(response);
						});
						return 1;
					}
				}
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

	.controller('TableController', ['$scope', '$stateParams', '$ionicHistory', 'getIdeasService', 'avaliarService', 'getUniqueGroupService', function($scope, $stateParams, $ionicHistory, getIdeasService, avaliarService, getUniqueGroupService){
		$scope.goBack = function() {
			$ionicHistory.goBack();
			window.location.reload();
		};


		getIdeasService.getIdeas($stateParams.groupId).then(function(response){
			$scope.ideias = response.data;
			$scope.groupId = $stateParams.groupId;
			console.log(response.data);
		});

		getUniqueGroupService.getGroup($stateParams.groupId).then(function(response){
			$scope.grupo = response.data;
			console.log(response.data);
		});

		$scope.avaliar = function(ideiaId){
			var usuario = JSON.parse(window.localStorage.getItem('usuario'));
			avaliarService.postAvaliacao(usuario['id'], ideiaId).then(function(response){
			});
		}

		$scope.doRefresh = function() {
			getIdeasService.getIdeas($stateParams.groupId).then(function(response){
				$scope.ideias = response.data;
				$scope.groupId = $stateParams.groupId;
				console.log(response.data);
			})
     .finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
  	};

	}])

	.controller('CommentsController', ['$scope', '$stateParams', '$ionicHistory', 'getCommentsService', 'addCommentService', function($scope, $stateParams, $ionicHistory, getCommentsService, addCommentService){

		$scope.goBack = function() {
			window.location.reload();
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
				window.location.reload();
				$ionicHistory.goBack();
			});
		}


	}])

	.controller('NovaIdeiaController', ['$scope', '$state', '$stateParams', '$ionicHistory', 'addIdeaService', function($scope, $state, $stateParams, $ionicHistory, addIdeaService){
		$scope.goBack = function() {
			window.location.reload();
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
				window.location.reload();
				$ionicHistory.goBack();
			});
		}
	}])

.controller('RankController', ['$scope', '$stateParams', '$ionicHistory', 'getUniqueGroupService', function($scope, $stateParams, $ionicHistory, getUniqueGroupService){
	$scope.goBack = function() {
		$ionicHistory.goBack();
	};

	getUniqueGroupService.getGroup($stateParams.groupId).then(function(response){
		$scope.ideias = response.data.ideias;
		console.log(response.data.ideias);
	});



}])


	;
