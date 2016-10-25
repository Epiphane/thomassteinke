var React = require('react'),
    Router = require('react-router');

var Auth = {};

['get', 'put', 'post', 'delete', 'patch'].forEach(function(method) {
   Auth[method] = function(url, opts) {
      opts = opts || {};
      opts.headers = opts.headers || {};
      if (localStorage.token) {
         opts.headers.Authorization = opts.headers.Authorization || 'Bearer ' + localStorage.token;
      }
      // opts.headers['content-type'] = 'application/json';
      opts.url = url;
      opts.type = method.toUpperCase();
      opts.dataType = opts.dataType || 'json';

      return $.ajax(opts);
   };
});

Auth.fetch = function(url, opts) {
   opts = opts || {};
   opts.headers = opts.headers || {};
   if (localStorage.token) {
      opts.headers.Authorization = opts.headers.Authorization || 'Bearer ' + localStorage.token;
   }
   opts.headers['content-type'] = 'application/json';

   return fetch(url, opts)
      .then(function(res) {
         return res.text().then(function(text) {
            res.json = JSON.parse(text);
            return res;
         });
      });
}

Auth.login = function(email, password) {
   console.trace();
   return Auth.post('/auth/local', {
      data: {
         email: email,
         password: password
      }
   })
      .then(function(res, status) {
         console.log('awa');
         localStorage.token = res.token;

         return true;
      })
      .fail(function() {
         Auth.logout();
         Auth.onChange(false);
      });
};

Auth.getToken = function() {
   return localStorage.token;
};

Auth.logout = function() {
   delete localStorage.token;
};

Auth.isLoggedIn = function() {
   return !!localStorage.token;
};

Auth.onChange = function(loggedIn) {
   if (!loggedIn && window.location.href.indexOf('admin') >= 0) {
      Router.browserHistory.replace('login');
   }

   if (this.Component && this.Component.onChange) {
      this.Component.onChange(loggedIn);
   }
};

Auth.checkLogin = function() {
   console.log(Auth.isLoggedIn(), window.location.href.indexOf('admin'));
   if (!Auth.isLoggedIn() && window.location.href.indexOf('admin') >= 0) {
      Router.browserHistory.replace('login');
   }
};

if (localStorage.token) {
   Auth.get('/api/user/me')
      .then(function(res) {
         if (res.status === 401) {
            Auth.logout();
         }
         else if (res.status === 200 && window.location.href.indexOf('login') >= 0) {
            Router.browserHistory.replace('admin');
         }
      })
      .fail(function(err) {
         Auth.logout();
         console.log(err);
      });
}

module.exports = Auth;