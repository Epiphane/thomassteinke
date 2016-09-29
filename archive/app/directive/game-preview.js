angular.module('thomassteinke').directive('gamePreview', function(games) {
  return {
    restrict: 'E',
    link: function(scope, element, attrs) {
      scope.game_nom = attrs.game;
      scope.game = games[attrs.game];
    },
    templateUrl: '/directive/game-preview.html'
  };
});
