angular.module('starter', ['ionic', 'controllers', 'services'])


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider){
  $stateProvider

    .state('index',{
      url:'/index',
      templateUrl:'index.html',
      controller:'ConfigController'
    })

		.state("login",{
      url: "/login",
      templateUrl:  "templates/login.html",
      controller:'LoginController'
    })

		.state("signup",{
      url: "/signup",
      templateUrl:  "templates/signup.html",
			controller:'signupController'
    })

		.state("editPerfil",{
      url: "/editPerfil",
      templateUrl:  "templates/editPerfil.html",
			controller:'EditPerfilController'
    })

		.state("createGroup",{
      url: "/createGroup",
      templateUrl:  "templates/createGroup.html",
			controller:'createGroupController'
    })

		.state("participantGroupSettings",{
      url: "/participantGroupSettings",
      templateUrl:  "templates/participantGroupSettings.html",
			controller:'ParticipantGroupSettingsController'
    })

		.state("facilitatorGroupSettings",{
      url: "/facilitatorGroupSettings/:id",
      templateUrl:  "templates/facilitatorGroupSettings.html",
			controller:'FacilitatorGroupSettingsController'
    })

		.state("table",{
      url: "/table/:groupId",
      templateUrl:  "templates/table.html",
			controller:'TableController'
    })

		.state("rank",{
      url: "/rank/:groupId",
      templateUrl:  "templates/rank.html",
			controller:'RankController'
    })

		.state("comentarios",{
      url: "/comentarios/:ideiaId",
      templateUrl:  "templates/getComments.html",
			controller:'CommentsController'
    })

		.state("novaIdeia",{
      url: "/novaIdeia/:groupId",
      templateUrl:  "templates/novaIdeia.html",
			controller:'NovaIdeiaController'
    })

    //tabs
    .state("tab",{
      url: "/tab",
      abstract: true,
      templateUrl:  "templates/tabContent/tab.html"
    })

    .state('tab.openTab', {
      url: '/openTab',
      views: {
        'tab1': {
          templateUrl: 'templates/tabContent/openTab.html',
          controller: 'OpenTabController',
					data: {
		        requiresLogin: true
		      }
        }
      }
    })
    .state('tab.thinkTab', {
      url: '/thinkTab',
      views: {
        'tab2': {
          templateUrl: 'templates/tabContent/thinkTab.html',
					controller: 'ThinkTabController'
        }
      }
    })
		.state('tab.arguingTab', {
      url: '/arguingTab',
      views: {
        'tab3': {
          templateUrl: 'templates/tabContent/arguingTab.html',
					controller: 'ArguingTabController'
        }
      }
    })
    .state('tab.evaluationTab', {
      url: '/evaluationTab',
      views: {
        'tab4': {
          templateUrl: 'templates/tabContent/evaluationTab.html',
					controller: 'EvaluationTabController'
        }
      }
    })
    .state('tab.closedTab', {
      url: '/closedTab',
      views: {
        'tab5': {
          templateUrl: 'templates/tabContent/closedTab.html',
					controller: 'ClosedTabController'
        }
      }
    });
    $urlRouterProvider.otherwise('/login');
});
