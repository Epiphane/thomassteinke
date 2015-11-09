(function() {
   var specialKeys = {
      13: 'enter',
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
   };

   $(document).ready(function() {
      console.log("HI!");
   });

   $(document).on('keydown', function(e) {
      var keyCode = e.keyCode;

      if (keyCode >= 65 && keyCode < 91) {
         Input.add(String.fromCharCode(e.keyCode));
      }
      else if (specialKeys[keyCode]) {
         console.log(specialKeys[keyCode]);
      }
      else if (keyCode === 32) {
         Input.add(' ');
      }

      if (keyCode === 8) { // backspace
         Input.backspace();

         return false;
      }
   });

   var Input = {
      div: $('#input'),
      str: '',
      set: function(str) {
         this.str = str;
         this.div.text(this.str);
      },
      add: function(letter) {
         this.set(this.str + letter);
      },
      backspace: function() {
         if (this.str.length === 0) return;

         this.set(this.str.substring(0, this.str.length - 1));
      },
   };
})();