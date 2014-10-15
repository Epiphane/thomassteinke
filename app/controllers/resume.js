angular.module('thomassteinke').controller('ResumeCtrl', function($scope, resumeUpdater) {
	$scope.experience = [
		{
			title: 'RealScout',
			position: 'Keyboard Smasher',
			time: 'Feb 2013 - Aug 2014',
			image: 'realscout.png',
			details: [
				'Front-end website design and HTML/Javascript coding',
				'Designed/Build WordPress themes used by more than 1000 clients'
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