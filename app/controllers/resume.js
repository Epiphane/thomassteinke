angular.module('thomassteinke').controller('ResumeCtrl', function($scope, resumeUpdater) {
	$scope.experience = [
		{
			title: 'Weebly',
			position: 'Software Developer Intern',
			time: 'Jun 2015 - Sep 2015',
			image: 'weebly.png',
			details: [
				'Developed front­ and back­end programming software for large clients, building APIs that affect millions of users',
				'Planned and executed the migration of 17,000 users from one platform to another',
				'Participated in the complete overhaul and redesign of Weebly’s interface'
			]
		},
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
				'Real­Time 3D Computer Graphics Software: Created a 3D real-time game'
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
		}
	];

	$scope.languages = [
		['C/C++/OpenGL', 'cpp', 3],
		['HTML/CSS', 'html', 3],
		['PHP/SQL', 'php', 3],
		['Python', 'python', 1],
		['Ruby on Rails', 'rubyonrails', 2],
		['Java', 'java', 3]
	];
});