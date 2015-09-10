angular.module('thomassteinke', [
	'ui.router', 'ui.bootstrap'
]);

angular.module('thomassteinke').config(function($locationProvider, $stateProvider, $urlRouterProvider) {
   $locationProvider.html5Mode(true);
	$urlRouterProvider.otherwise('/');

	$stateProvider.state('home', {
		url: '/',
		templateUrl: '/partials/home.html',
		data: {
			title: ''
		},
		controller: function($rootScope) {
			$rootScope.navlight = 'dark';
		}
	})
	.state('pages', {
		templateUrl: '/partials/pages.html'
	})
	.state('pages.game', {
		url: '^/games/:title',
		templateUrl: '/partials/game.html',
		controller: function($rootScope, games, $stateParams, $scope) {
			$scope.game = games[$stateParams.title];
			$rootScope.bgcolor = $scope.game.color;
			$rootScope.navlight = 'light';
		}
	})
	.state('pages.landing', {
		templateUrl: '/partials/landing.html',
		controller: function($rootScope) {
			$rootScope.bgcolor = '#eeeeee';
		}
	})
	.state('pages.landing.games', {
		url: '^/games',
		templateUrl: '/partials/games.html',
		data: {
			title: 'Games',
			banner: 'games'
		},
		controller: function($rootScope) {
			$rootScope.bgcolor = '#eeeeee';
		}
	})
	.state('pages.landing.resume', {
		url: '^/resume',
		templateUrl: '/partials/resume.html',
		data: {
			title: 'Resume',
			banner: 'resume'
		},
		controller: function($rootScope) {
			$rootScope.bgcolor = '#eeeeee';
		}
	})
	.state('pages.landing.contact', {
		url: '^/about',
		templateUrl: '/partials/contact.html',
		data: {
			title: 'About Me',
			banner: 'contact'
		},
		controller: function($rootScope) {
			$rootScope.bgcolor = '#eeeeee';
		}
	});
});

angular.module('thomassteinke').controller('IndexCtrl', function($window, $state, $rootScope) {
	$rootScope.$on('$stateChangeError', function(event) {
		$state.go('404');
	});

	var window = angular.element($window);
	var navbar = angular.element(document.getElementById('navbar'));
	var updateNavBar = function() {
		var parallax;
		var scrollThreshhold = 0;
		if(parallax = document.getElementById('parallax-header')) {
			scrollThreshhold = parallax.offsetHeight;
		}

		if($window.pageYOffset > scrollThreshhold) {
			navbar.addClass('scroll');
		}
		else {
			navbar.removeClass('scroll');
		}
	};

	$rootScope.navlight = 'light';

	updateNavBar();

	window.bind('scroll', updateNavBar);
	$rootScope.$on('$viewContentLoaded', updateNavBar);
});
