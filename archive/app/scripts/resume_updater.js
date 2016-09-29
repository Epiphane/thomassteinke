angular.module('thomassteinke').factory('resumeUpdater', function($rootScope, $window, $state) {
	var window = angular.element($window);

	// Disable Parallax on iOS
	if(!(/iPhone|iPad|iPod|Mobile/i).test(navigator.userAgent || navigator.vendor || window.opera)) {
		var updateResumeBG = function() {
			if($state.current.name !== 'pages.landing.resume') {
				return;
			}

			var parallax;
			var scrollThreshhold = 0;
			if(parallax = document.getElementById('parallax-header')) {
				scrollThreshhold = parallax.offsetHeight;
			}

			var rgb_final = { r: 91, g: 192, b: 222 };
			if($window.pageYOffset < scrollThreshhold) {
				var rgb_initial = { r: 238, g: 238, b: 238 };
				var percent = $window.pageYOffset / scrollThreshhold;
				var rgb = {
					r: Math.ceil(rgb_initial.r + (rgb_final.r - rgb_initial.r) * percent),
					g: Math.ceil(rgb_initial.g + (rgb_final.g - rgb_initial.g) * percent),
					b: Math.ceil(rgb_initial.b + (rgb_final.b - rgb_initial.b) * percent)
				};
				$rootScope.bgcolor = 'rgb(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ')';
			}
			else if($window.pageYOffset >= scrollThreshhold) {
				$rootScope.bgcolor = 'rgb(' + rgb_final.r + ', ' + rgb_final.g + ', ' + rgb_final.b + ')';
			}
			$rootScope.$apply();
		};

		// $rootScope.bgcolor = '#eee';
		// $window.scrollTo(0,0);
		//window.bind('scroll', updateResumeBG);
	}
	else {
		var updateBG = function() {
			$rootScope.bgcolor = 'rgb(91, 192, 222)';
			$rootScope.$apply();
		};
		// updateBG();
		// window.bind('scroll', updateBG);
	}

	return {};
});

var i = 0;