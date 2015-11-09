(function() {
   var specialKeys = {
      13: 'enter',
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
   };

   var command = $('#command');

   command.on('blur', function() {
      command.focus();
   });
   command.focus();

   command.on('input', function() {
      Input.set(command.val().toUpperCase());
   });      

   $(document).on('keydown', function(e) {
      var keyCode = e.keyCode;

      if (specialKeys[keyCode]) {
         var key = specialKeys[keyCode];

         if (Input[key]) {
            Input[key]();
         }
      }
   });

   var Input = {
      div: $('#input'),
      str: '',
      password: false,
      set: function(str) {
         this.str = str;

         var str = this.str;
         if (this.password) {
            str = (new Array(str.length + 1)).join('*');
         }

         this.div.html('$ ' + str + '<span class="blink">_</span>');
         command.val(this.str);
      },
      add: function(letter) {
         this.set(this.str + letter);
      },
      backspace: function() {
         if (this.str.length === 0) return;

         this.set(this.str.substring(0, this.str.length - 1));
      },
      enter: function() {
         this.reset();

         window.Game.act(this.str.toLowerCase()).then(function(result) {
            Input.insertAttachments(result);
         });

         this.set('');
      },
      reset: function() {
         var history = this.div.clone();

         var str = this.str;
         if (this.password) {
            str = (new Array(str.length + 1)).join('*');
         }

         history.html('$ ' + str);

         history.removeAttr('id');
         history.insertBefore(this.div);

         this.password = false;
      },
      setPassword: function(isPassword) {
         this.password = !!isPassword;
      },
      insertAttachments: function(attachments) {
         while (attachments.length) {
            var attachment = attachments.shift();
            var element = $('<div class="attachment ' + (attachment.type || 'info') + '">');

            element.text(attachment.text);

            element.insertBefore(this.div);
         }
      }
   };

   window.setPassword = function() {
      Input.setPassword.apply(Input, arguments);
   }
})(window);