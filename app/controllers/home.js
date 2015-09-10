(function() {
   'use strict';

   var requestAnimationFrame = (function() {
      return window.requestAnimationFrame ||
         window.webkitRequestAnimationFrame ||  
         window.mozRequestAnimationFrame    ||
         function(callback) {
            window.setTimeout(callback, 1000 / 60);
         };
      })();

   // Running the animation
   var running    = false;
   var canvasSize = 0;
   var canvas     = null;
   var context    = null;
   var fade       = 0;
   var fadeSpeed  = 0.7;
   var tilesize   = 10;

   var imageCanvas = document.createElement('canvas');
   imageCanvas.width = document.body.clientWidth;
   imageCanvas.height = document.body.clientHeight;
   var imageCtx = imageCanvas.getContext('2d');

   window.onresize = function() {
      var resized = false;
      if (document.body.clientWidth > imageCanvas.width) {
         imageCanvas.width = document.body.clientWidth;
         resized = true;
      }
      if (document.body.clientHeight > imageCanvas.height) {
         imageCanvas.height = document.body.clientHeight;
         resized = true;
      }

      if (resized) {

         canvasSize = Math.max(imageCanvas.width, imageCanvas.height) / tilesize;

         refresh();
      }
      
      if (canvas) {
         canvas.width = Math.min(document.body.clientWidth, imageCanvas.width);
         canvas.height = Math.min(document.body.clientHeight, imageCanvas.height);
      
         if (context) {
            drawToCanvas();
         }
      }
   };

   function drawToCanvas() {
      context.drawImage(imageCanvas, 0, 0);
   }

   function computeDist(x, y) {
      // Curve for now: x = 1 - (y - 0.5) ^ 2;
      // dx = -2(y-0.5)*dy;
      // dy/dx = 1/-2(y-0.5);
      // perpendicular: 2y-1
      // y = (2y0 - 1) * (x - arg[0]) + arg[1]
      // x = 1 - ((2y0 - 1) * (x - arg[0]) + arg[1] - 0.5) ^ 2

      // Ignore all that
      x /= canvasSize;
      y /= canvasSize;

      var expectedX = 1 - 4 * Math.pow(y - 0.5, 2);

      return 5 * Math.abs(x - expectedX);
   }

   var rgb  = {r: 27,  g: 114, b: 152};
   var line = {r: 180, g: 221, b: 239};
   function fillRect(x, y, amount) {
      if (y * tilesize >= imageCanvas.height || x * tilesize >= imageCanvas.width) {
         return;
      }

      var padding = tilesize / 2 * (1 - amount);

      var dist = computeDist(x, y);
      
      // Curve it from (0, 1)
      dist = 1 / (1 + Math.pow(2, dist));

      var computed = {
         r: Math.floor((1 - dist) * rgb.r + dist * line.r),
         g: Math.floor((1 - dist) * rgb.g + dist * line.g),
         b: Math.floor((1 - dist) * rgb.b + dist * line.b)
      };

      imageCtx.fillStyle = 'rgb(' + computed.r + ', ' + computed.g + ', ' + computed.b + ')';
      imageCtx.fillRect(x * tilesize + padding, y * tilesize + padding, amount * tilesize, amount * tilesize);
   }

   function refresh() {
      var angledColumn = Math.floor(fade) - 1;
      for (var i = angledColumn; i >= 0; i --) {
         for (var j = 0; j + i <= angledColumn; j ++) {            
            fillRect(i, j, 1);
         }
      }
   }

   function update() {
      if (!running) {
         return;
      }

      var i, j;

      // Request next frame
      requestAnimationFrame(update);

      if (Math.floor(fade) !== Math.floor(fade + fadeSpeed)) {
         var diag = Math.floor(fade);
         for (i = diag; i >= 0; i --) {
            j = diag - i;

            fillRect(i, j, 1);
         }
      }

      if (fade > 2 * canvasSize) {
         running = false;
      }

      fade += fadeSpeed;
      var angledColumn = Math.floor(fade);

      var dfade = fade % 1;

      for (i = angledColumn; i >= 0; i --) {
         j = angledColumn - i;

         for (var di = 0; di < 4 && dfade - di / 4 > 0; di ++) {
            fillRect(i + di, j, dfade - di / 4);
         }
      }

      drawToCanvas();
   }

   angular.module('thomassteinke').controller('HomeCtrl', function($scope) {
      running = true;
      $scope.$on('$destroy', function() {
         running = false;
      });

      context = null;
      canvas = document.getElementById('home-banner');

      window.onresize();
      canvas.width = imageCanvas.width;
      canvas.height = imageCanvas.height;

      context = canvas.getContext('2d');
      context.imageSmoothingEnabled = false;
      context.mozImageSmoothingEnabled = false;
      context.webkitImageSmoothingEnabled = false;
      context.msImageSmoothingEnabled = false;

      update();
   });
})();