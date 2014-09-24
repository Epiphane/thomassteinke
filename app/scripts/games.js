angular.module('thomassteinke').factory('games', function() {
  var games = {};

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
    color: '#8BC065',
    authors: 'Thomas Steinke & Elliot Fiske',
    desc: 'You are the last of the Gun Knights, an ancient Order sworn to defend the land against evil.',
    description: 'You are the last of the Gun Knights, an ancient Order sworn to defend the land against evil.<br><br>Fight your way through a randomly generated level and vanquish the despicable Boss at the end to make history in this endlessly replayable fantasy epic.',
  };

  games['flux'] = {
    title: 'Flux',
    thumb: 'flux.png',
    image: 'flux@2x.png',
    color: '#01307C',
    authors: 'Thomas Steinke, Elliot Fiske, & Max Linsenbard',
    desc: 'Take advantage of the various forms of light to outsmart physics itself.',
    description: 'In Flux, you control a Particle and a Wave of light working together to reach the end of each level. The Particle and Wave each have unique abilities - the Wave can block lasers that are fatal to the Particle, and the Particle can open doors for the wave by standing on switches. In Flux, you are what you see - light.',
  };

  return games;
});
