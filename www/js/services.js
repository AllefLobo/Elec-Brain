angular.module("services",[])

.factory('getUniquePersonService', ['$http', function($http){
	return {
		getPerson: function(id){
			return  $http.get('http://localhost:8080/CreativeAPI/pessoas/' + id);
		}
	};
}])

.factory('getPeopleService', ['$http', function($http){
	return {
		getPeople: function(id){
			return  $http.get('http://localhost:8080/CreativeAPI/pessoas');
		}
	};
}])

.factory('addParticipantService', ['$http', function($http){
	return {
		postParticipant: function( participantId, groupId){
			var data = {
			  "id": participantId,
			};

		return $http({
								method: 'POST',
								url: 'http://localhost:8080/CreativeAPI/brainwriting/'+groupId+'/participante',
								data: data,
								headers: { 'Content-Type': "application/json;charset=UTF-8" }
						})
		}
	};

}])

.factory('addPessoaService', ['$http', function($http){
	return {
		postPessoa: function( nome){
			var data = {
			  "email": nome,
			  "nome": nome,
			  "senha": "padrao"
			};

		return $http({
								method: 'POST',
								url: 'http://localhost:8080/CreativeAPI/pessoas',
								data: data,
								headers: { 'Content-Type': "application/json;charset=UTF-8" }
						})
		}
	};

}])

.factory('updatePessoaService', ['$http', function($http){
	return {
		postPessoa: function( nome, id){
			var data = {
			  "email": nome,
			  "nome": nome,
			  "senha": "padrao"
			};

		return $http({
								method: 'POST',
								url: 'http://localhost:8080/CreativeAPI/pessoas/' + id,
								data: data,
								headers: { 'Content-Type': "application/json;charset=UTF-8" }
						})
		}
	};

}])



//----------------------------------------------------------------------------

	.factory('getGroupsService', ['$http', function($http){
		return {
    	getGroups: function(id){
      	return  $http.get('http://localhost:8080/CreativeAPI/brainwriting?idPessoa='+ id);
    	}
  	};
	}])

	.factory('getUniqueGroupService', ['$http', function($http){
		return {
    	getGroup: function(id){
      	return  $http.get('http://localhost:8080/CreativeAPI/brainwriting/' + id);
    	}
  	};
	}])

	.factory('updateUniqueGroupService', ['$http', function($http){
		return {
    	setGroup: function(grupo){
			return $http({
			            method: 'POST',
			            url: 'http://localhost:8080/CreativeAPI/brainwriting/'+ grupo['id'],
			            data: {
									  "titulo": grupo['titulo'],
									  "gatilho": grupo['gatilho'],
									  "descricao": grupo['descricao'],
									  "fase": grupo['fase']
									},
			            headers: { 'Content-Type': "application/json;charset=UTF-8" }
			        })
    	}
  	};
	}])

	.factory('createGroupService', ['$http', function($http){
		return {
    	postGroup: function(descricao, id, fase, gatilho, titulo){
				var data = {
										  'descricao': descricao,
										  'facilitador': {
										    'id': id
										  },
										  'fase': fase,
										  'gatilho': gatilho,
										  'titulo': titulo
										};

			return $http({
			            method: 'POST',
			            url: 'http://localhost:8080/CreativeAPI/brainwriting',
			            data: data,
			            headers: { 'Content-Type': "application/json;charset=UTF-8" }
			        })
    	}
  	};

	}])

//---------------------------------------------------------------------------------

	.factory('getIdeasService', ['$http', function($http){
		return {
			getIdeas: function(id){
				return  $http.get('http://localhost:8080/CreativeAPI/brainwriting/'+ id +'/ideia');
			}
		};
	}])

	.factory('getIdeaService', ['$http', function($http){
		return {
			getIdea: function(id){
				return  $http.get('http://localhost:8080/CreativeAPI/brainwriting/ideia/'+ id);
			}
		};
	}])

	.factory('addIdeaService', ['$http', function($http){
		return {
			postIdea: function(autor, group, texto){
				var data = {
				"autor": autor,
				"data": {
					"calendarType": "string",
					"fieldsComputed": 0,
					"fieldsNormalized": 0,
					"firstDayOfWeek": 0,
					"lenient": true,
					"minimalDaysInFirstWeek": 0,
					"time": "2016-12-01T02:12:49.755Z",
					"timeInMillis": 0,
					"timeZone": {
						"displayName": "string",
						"dstsavings": 0,
						"id": "string",
						"rawOffset": 0
					},
					"weekCountData": {},
					"weekDateSupported": true,
					"weekYear": 0,
					"weeksInWeekYear": 0,
					"zoneShared": true
				},
				"numeroAvaliacoes": 0,
				"numeroComentarios": 0,
				"texto": texto,
				"titulo": texto
				};

			return $http({
									method: 'POST',
									url: 'http://localhost:8080/CreativeAPI/brainwriting/'+ group +'/ideia',
									data: data,
									headers: { 'Content-Type': "application/json;charset=UTF-8" }
							})
			}
		};
	}])

	.factory('addCommentService', ['$http', function($http){
		return {
			postComment: function(autorId, ideiaId, texto){
				var data = {
					"autor":{
						"id": autorId
					},
				  "data": {
				    "calendarType": "string",
				    "fieldsComputed": 0,
				    "fieldsNormalized": 0,
				    "firstDayOfWeek": 0,
				    "lenient": true,
				    "minimalDaysInFirstWeek": 0,
				    "time": "2016-12-01T16:06:45.464Z",
				    "timeInMillis": 0,
				    "timeZone": {
				      "displayName": "string",
				      "dstsavings": 0,
				      "id": "string",
				      "rawOffset": 0
				    },
				    "weekCountData": {},
				    "weekDateSupported": true,
				    "weekYear": 0,
				    "weeksInWeekYear": 0,
				    "zoneShared": true
				  },
					"texto": texto
				};

			return $http({
									method: 'POST',
									url: 'http://localhost:8080/CreativeAPI/brainwriting/ideia/'+ideiaId+'/comentario',
									data: data,
									headers: { 'Content-Type': "application/json;charset=UTF-8" }
							})
			}
		};
	}])

	.factory('getCommentsService', ['$http', function($http){
		return {
			getComments: function(id){
				return  $http.get('http://localhost:8080/CreativeAPI/brainwriting/ideia/'+ id);
			}
		};
	}])

	.factory('avaliarService', ['$http', function($http){
		return {
			postAvaliacao: function(autorId, ideiaId){
				var data = {
			    "avaliacao" : 1,
					 "autor":{
					 	"id": autorId
						}
				};

			return $http({
									method: 'POST',
									url: 'http://localhost:8080/CreativeAPI/brainwriting/ideia/'+ideiaId+'/avaliacao',
									data: data,
									headers: { 'Content-Type': "application/json;charset=UTF-8" }
							})
			}
		};
	}])

;
