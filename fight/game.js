(function(window) {
   var Game = {};

   var User = null;
   var temp = {}; // For storing data between commands

   Game.act = function(command) {
      var result = $.Deferred();

      if (!temp.email && !User) {
         temp.email = command;

         return Game.request('login', {
               email: temp.email
            }).then(function(res) {
            window.setPassword(true);

            temp.userExists = res[0].data;
            if (temp.userExists) {
               return [
                  new A.Good('Welcome back!'),
                  new A.Info('Please enter your password.')
               ];
            }
            else {
               return [
                  new A.Good('Welcome to Fight Your Friends!'),
                  new A.Info('Please enter a password for your account.')
               ];
            }
         });
      }
      else if (!User) {
         if (!temp.userExists) {
            if (!temp.confirm) {
               temp.confirm = true;
               temp.password = command;

               window.setPassword(true);
               result.resolve([new A.Info('Please confirm your password, just to be sure.')]);
            }
            else {
               if (temp.password !== command) {
                  temp.password = null;
                  temp.confirm = false;

                  window.setPassword(true);
                  result.resolve([new A.Good('Passwords did not match. Try again?')]);
               }
               else {
                  temp.userExists = true;
                  temp.confirm = temp.password = null;
               }
            }
         }

         if (temp.userExists) {
            return Game.request('login', {
               email: temp.email,
               password: command
            }).then(function(result) {
               return [new A.Good('Authentication successful!')];
            }).fail(function(res) {
               console.log(arguments);
            });
         }
      }
      else {
         result.resolve([]);
      }

      return result;
   };

   Game.request = function(method, params) {
      return $.post('http://thomassteinke.com/api/fight/' + method, params);
   }

   window.Game = Game;
})(window);