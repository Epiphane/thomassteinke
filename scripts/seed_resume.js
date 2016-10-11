'use strict';

var sqldb = require('../server/sqldb');

var experience = [
  {
    title: 'Riot Games',
    position: 'Software Engineer Intern',
    time: 'Jun 2016 - Sep 2016',
    image: 'riot.png',
    details: [
      'Worked on the patcher for League of Legends, including writing tests and features for the new and old versions of the patcher.',
      'Helped create a set of metric watchers to monitor and ensure uptime and performance'
    ]
  },
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
    time: 'Expected Graduation: Dec 2016',
    image: 'calpoly.png',
    details: [
      'Systems Programming: File/piped I/O, synchronized process management, compression, algorithm optimization',
      'Real­Time 3D Computer Graphics Software: Created a 3D real-time game'
    ]
  }
];

var projects = [
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

var languages = [
  ['C/C++/OpenGL', 'cpp', 3],
  ['HTML/CSS', 'html', 3],
  ['PHP/SQL', 'php', 3],
  ['Python', 'python', 1],
  ['Ruby on Rails', 'rubyonrails', 2],
  ['Java', 'java', 3]
];

var force = true;
sqldb.sequelize.sync({ force: false })
  .then(function() {
    return sqldb.Resume.Experience.sync({ force: force })
  })
  .then(function() {
    return sqldb.Resume.Language.sync({ force: force });
  })
  .then(function() {
    return sqldb.Resume.Project.sync({ force: force });
  })
  .then(function() {
    var chain = { then: function(cb) { return cb(); } };

    for (var i = experience.length - 1; i >= 0; i --) {
      (function(experience) {
        experience.details = JSON.stringify(experience.details || []);
        chain = chain.then(function() {
          return sqldb.Resume.Experience.create(experience).then(function(experience) {
            console.log('Created ' + experience.title + '.');
          });
        });
      })(experience[i]);
    }

    for (var i = projects.length - 1; i >= 0; i --) {
      (function(project) {
        project.details = JSON.stringify(project.details || []);
        chain = chain.then(function() {
          return sqldb.Resume.Project.create(project).then(function(project) {
            console.log('Created ' + project.title + '.');
          })
        });
      })(projects[i]);
    }

    for (var i = languages.length - 1; i >= 0; i --) {
      (function(lang) {
        chain = chain.then(function() {
          return sqldb.Resume.Language.create({
            name: lang[1],
            pretty_name: lang[0],
            proficiency: lang[2]
          }).then(function(language) {
            console.log('Created ' + language.pretty_name + '.');
          })
        });
      })(languages[i]);
    }

    return chain;
  });
