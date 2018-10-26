
// Copyright IBM Corp. 2014,2015. All Rights Reserved.
// Node module: loopback-example-user-management
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
'use strict';
var path = require('path');

module.exports = function(app) {
  var User = app.models.user;

  app.get('/', function(req, res) {
    res.render('login', {
      email: this.email,
      password: this.mdp,
    });
  });

  app.get('/verified', function(req, res) {
    res.render('verified');
  });

  app.post('/login', function(req, res) {
    User.login({
      email: this.email,
      password: this.mdp,
    }, 'user', function(err, token) {
      if (err) {
        if (err.details && err.code === 'Mauvais identifiant') {
          res.render('reponseToTriggerEmail', {
            title: 'Login failed',
            content: err,
            redirectToEmail: '/api/account/' + err.details.userId + '/verify',
            redirectTo: '/',
            redirectToLinkText: 'Click here',
          });
        } else {
          res.render('response', {
            title: 'Login failed. Wrong username or password',
            content: err,
            redirectTo: '/',
            redirectToLinkText: 'Please login again',
          });
        }
        return;
      }
      res.render('home', {
        email: req.body.email,
        accessToken: token.id,
      });
    });
  });

  app.get('/logout', function(req, res, next) {
    if (!req.accessToken) return res.sendStatus(401);
    User.logout(req.accessToken.id, function(err) {
      if (err) return next(err);
      res.redirect('/');
    });
  });
};
