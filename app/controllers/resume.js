angular.module('thomassteinke').controller('ResumeCtrl', function($scope, resumeUpdater) {
	$scope.experience = [
		{
			title: 'RealScout',
			position: 'Keyboard Smasher',
			time: 'Feb 2013 - Aug 2014',
			image: 'realscout.png',
			details: [
				'Front-end website design and HTML/Javascript coding',
				'Designed/Build WordPress themes used by more than 1000 clients',
				'Managed and collaborated with programmers in Pakistan and Venezuela'
			]
		},
		{
			title: 'California Polytechnic State Univ.',
			position: 'San Luis Obispo',
			time: 'Expected Graduation: June 2016',
			image: 'calpoly.png',
			details: [
				'Systems Programming: File/piped I/O, synchronized process management, compression, algorithm optimization',
				'Computer Architecture: Programmed in ARM assembly language on a Raspberry Pi, created a x64 interpreter'
			]
		}
	];

	$scope.projects = [
		{
			title: 'Cal Poly Textbooks',
			link: 'http://calpolytextbooks.com/',
			tag: 'Sept. 2014',
			image: 'calpolybooks.png',
			details: [
				'Service for Cal Poly students to sell each other used textbooks',
				'Designed, built, and marketed the project alone'
			]
		},
		{
			title: 'Kickbox',
			link: 'http://thomassteinke.com/games/kickbox',
			tag: 'August 2013',
			image: 'kickbox.png',
			details: [
				'Two-player game featuring Box2D physics and quirky twists',
				'Built in 3 days with Elliot Fiske'
			]
		},
		{
			title: 'More games...',
			link: 'http://thomassteinke.com/games'
		}
	];

	$scope.languages = [
		['HTML/CSS', 'html', 3],
		['jQuery/Bootstrap', 'jquery', 3],
		['Python', 'python', 1],
		['PHP/SQL', 'php', 2],
		['C/C++', 'cpp', 3],
		['Ruby on Rails', 'rubyonrails', 2],
		['Java', 'java', 3]
	];
});