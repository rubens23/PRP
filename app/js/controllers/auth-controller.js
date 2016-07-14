'use strict';

module.exports = function(app) {
  app.controller('AuthController', ['$location','AuthService','ErrorService', function($location, AuthService, ErrorService) {
    this.$location = $location;

    this.goHome = function() {
      $location.url('/');
    };

    this.signOut = function() {
      AuthService.signOut()
      .then(() => {
        $location.url('/');
      }, ErrorService.logError('Error on Sign Out'));
    };

    this.signUp = function(user) {
      AuthService.signUp(user)
      .then(() => {
        $location.url('/blog');
      }, ErrorService.logError('Error on Sign Up'));
    };

    this.logIn = function(user) {
      AuthService.logIn(user)
      .then(() => {
        $location.url('/blog');
      }, ErrorService.logError('Error on Sign Up')
    );
    }.bind(this);
  }]);
};
