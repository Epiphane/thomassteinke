angular.module('thomassteinke').factory('games', function($sce) {
  var games = {};

  games['threetris'] = {
    title: 'Threetris',
    thumb: 'threetris.png',
    image: 'threetris@2x.png',
    quotes: [
      {
        quote: 'Wow this is nuts. Works great, but since the board rotates each time, makes it difficult to plan your next move.',
        author: {
          name: 'Anonymous'
        }
      }
    ],
    link: 'http://thomassteinke.com/threetris',
    color: '#57D0B7',
    authors: 'Thomas Steinke',
    desc: 'A three-dimensional twist on the classic arcade game of Tetris',
    description: 'Threetris takes the common game of Tetris and moves it into the third dimension. Every time, you place a piece, the platform rotates 90 degrees, and you are faced with a new board. Can you keep up?',
  };

  games['quicksilver'] = {
    title: 'Quicksilver',
    thumb: 'quicksilver.png',
    image: 'quicksilver.png',
    quotes: [
      {
        quote: 'Simple concept very well executed, what else to say but good job :)',
        author: {
          link: 'http://gamejolt.com/profile/tselmek/382466',
          name: 'Tselmek',
          tag: 'on Gamejolt'
        }
      }
    ],
    link: 'http://gamejolt.com/games/quicksilver/85076',
    showcase: [
      {
        link: 'http://gamejolt.com/games/quicksilver/85076',
        image: '/images/external/gamejolt.svg'
      },
      {
        link: 'http://gamejolt.com/games/quicksilver/85076',
        image: '/images/games/quicksilver-ratings.png'
      }
    ],
    color: '#87B77F',
    authors: 'Thomas Steinke, Elliot Fiske, Max Linsenbard',
    desc: 'Momentum-centric arcade game set in 8-bit GameBoy style',
    description: 'Quicksilver is a momentum-centric arcade game set in 8-bit GameBoy style. Use the power of drilling through the Earth to restore an ancient shrine and save your people.',
  };

  games['spellbound'] = {
    title: 'Spellbound',
    thumb: 'spellbound.png',
    image: 'spellbound.png',
    quotes: [
      {
        quote: 'Simple concept very well executed, what else to say but good job :)',
        author: {
          link: 'http://gamejolt.com/profile/tselmek/382466',
          name: 'Tselmek',
          tag: 'on Gamejolt'
        }
      }
    ],
    link: 'http://gamejolt.com/games/spellbound/80361',
    showcase: [
      {
        link: 'http://gamejolt.com/games/spellbound/80361',
        image: '/images/external/gamejolt.svg'
      },
      {
        link: 'http://gamejolt.com/games/spellbound/80361',
        image: '/images/games/spellbound-ratings.png'
      }
    ],
    color: '#407D36',
    authors: 'Thomas Steinke, Elliot Fiske, Max Linsenbard, Feek McDermott, Jacob Johanneson',
    desc: 'Wands aren\'t the only way to beat monsters!',
    description: 'You\'re like any normal wizard, except you don\'t quite...get it. Instead of learning spells from books, you throw the books at your enemies!</p><p>Descend through the levels of your local alchemy school and rack up points to show Merlin\'s Men that wands aren\'t the only way to beat monsters.'
  };

  games['rgbzero'] = {
    title: 'RGB Zero',
    thumb: 'rgbzero.png',
    image: 'rgbzero@2x.png',
    captures: [
      'rgbzero-sc0.png',
      'rgbzero-sc1.png',
      'rgbzero-sc2.png',
      'rgbzero-sc3.png',
      'rgbzero-sc4.png',
    ],
    link: 'http://thomassteinke.com/RGBZero/',
    showcase: [
      {
        link: 'http://thomassteinke.com/RGBZero/',
        text: 'Game Page'
      }
    ],
    color: '#87B77F',
    authors: 'Thomas Steinke, Elliot Fiske, Max Linsenbard, David Ellison, Jonathan Pae, Cary Dobeck',
    desc: 'Fast-paced realtime racing game set to exciting music.',
    description: 'RGB Zero immerses the user in a fast-paced racing environment where the goal is simply to go fast. Taking initial influence from games like Thumper and F-Zero, RGB Zero shows off its seamless gameplay integration with the beats of seven different songs. During the duration of the song, obstacles of three different colors (Red, Green, and Blue) will spawn on the track. Moving the ship to the same colored track as the obstacle will slightly increase the ship\'s speed.</p><p>Users are also presented with five different F-Zero models, each with their own unique stats and boosting abilities adding further replay value.</p><p>If that\'s not enticing enough, we\'ve also included a global high score for you to practice songs you want to master.',
  };

  games['sabotage'] = {
    title: 'Sabotage',
    thumb: 'sabotage.png',
    image: 'sabotage.png',
    captures: [
      'sabotage-sc0.png',
      'sabotage-sc1.png'
    ],
    link: 'http://globalgamejam.org/2015/games/sabotage-0',
    showcase: [
      {
        link: 'http://globalgamejam.org/',
        image: '/images/external/globalgamejam.png'
      },
      {
        link: 'http://globalgamejam.org/2014/jam-sites/cal-poly',
        text: '<span class="fa fa-star"></span> First place on campus'
      }
    ],
    color: '#01307C',
    authors: 'Thomas Steinke, Elliot Fiske, Max Linsenbard, & Aaron Brown',
    desc: '4 player party game composed of multiple mini-games. Each round, three of the players attempt to achieve a goal while the fourth is out to Sabotage them.',
    description: '4 player party game composed of multiple mini-games. Each round, three of the players attempt to achieve a goal while the fourth is out to Sabotage them.',
  };

  games['kickbox'] = {
    title: 'Kickbox',
    thumb: 'kickbox.png',
    image: 'kickbox@2x.png',
    captures: [
      'kickbox-sc0.png',
      'kickbox-sc2.png',
      'kickbox-sc3.png',
    ],
    link: 'http://www.ludumdare.com/compo/ludum-dare-27/?action=preview&uid=25549',
    quotes: [
      {
        quote: 'A fun and pretty silly game...pulling off kickflips to send the ball flying was cool. Changing the game effects every 10 seconds was a pretty neat touch! Thanks for putting this together!',
        author: {
          link: 'http://www.ludumdare.com/compo/ludum-dare-27/?action=preview&uid=22357',
          name: 'Solifuge',
          tag: 'on Ludum Dare'
        }
      }
    ],
    showcase: [
      {
        link: 'http://www.ludumdare.com/',
        image: '/images/external/LDLogo2009.png'
      },
      {
        link: 'http://www.ludumdare.com/compo/ludum-dare-27/?action=preview&uid=25549',
        image: '/images/games/kickbox-ratings.png'
      }
    ],
    color: '#656374',
    authors: 'Thomas Steinke & Elliot Fiske',
    desc: 'Every 10 seconds, something exciting happens to change up this simple slime-volleyball-esque soccer game.',
    description: 'If you have a flair for the exciting, this game is definitely your type! Every 10 seconds, something exciting happens to change up this simple slime-volleyball-esque soccer game.',
  };

  games['knights'] = {
    title: 'Knights With Guns',
    thumb: 'knights.png',
    image: 'knights@2x.png',
    captures: [
      'knights-sc1.png',
      'knights-sc2.png',
      'knights-sc0.png',
      'knights-sc3.png'
    ],
    link: 'http://jams.gamejolt.io/gbjam3/games/knights-with-guns/31979',
    quotes: [
      {
        quote: 'Neat aesthetic. The random level creation is a cool feature :)',
        author: {
          link: 'http://gamejolt.com/profile/fisholith/310484/',
          name: 'Fisholith',
          tag: 'on Gamejolt'
        }
      }
    ],
    showcase: [
      {
        link: 'http://jams.gamejolt.io/gbjam3',
        image: '/images/external/gbjam.png'
      },
      {
        link: 'http://gamejolt.com/games/arcade/knights-with-guns/31979/',
        image: '/images/games/knights-ratings-2.png'
      },
      {
        link: 'http://jams.gamejolt.io/gbjam3/games/knights-with-guns/31979',
        image: '/images/games/knights-ratings.png'
      }
    ],
    color: '#33684E',
    authors: 'Thomas Steinke & Elliot Fiske',
    desc: 'You are the last of the Gun Knights, an ancient Order sworn to defend the land against evil.',
    description: 'You are the last of the Gun Knights, an ancient Order sworn to defend the land against evil.<br><br>Fight your way through a randomly generated level and vanquish the despicable Boss at the end to make history in this endlessly replayable fantasy epic.',
  };

  games['flux'] = {
    title: 'Flux',
    thumb: 'flux.png',
    image: 'flux@2x.png',
    captures: [
      'flux-sc0.png'
    ],
    link: 'http://globalgamejam.org/2014/games/flux',
    showcase: [
      {
        link: 'http://globalgamejam.org/',
        image: '/images/external/globalgamejam.png'
      },
      {
        link: 'http://globalgamejam.org/2014/jam-sites/cal-poly',
        text: '<span class="fa fa-star"></span> Second place on campus'
      },
      {
        image: '/images/games/flux-controls.png'
      }
    ],
    color: '#01307C',
    authors: 'Thomas Steinke, Elliot Fiske, & Max Linsenbard',
    desc: 'Take advantage of the various forms of light to outsmart physics itself.',
    description: 'In Flux, you control a Particle and a Wave of light working together to reach the end of each level. The Particle and Wave each have unique abilities - the Wave can block lasers that are fatal to the Particle, and the Particle can open doors for the wave by standing on switches. In Flux, you are what you see - light.',
  };

  angular.forEach(games, function(game, name) {
    game.description = $sce.trustAsHtml(game.description);
    if(typeof(game.showcase) !== 'undefined') {
      game.showcase.forEach(function(item) {
        item.text = $sce.trustAsHtml(item.text);
      });
    }
  });

  return games;
});
