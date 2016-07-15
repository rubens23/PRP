'use strict';

module.exports = function(app) {
  app.controller('AuthController', ['$location', '$window', 'AuthService','ErrorService', '$scope', function($location, $window, AuthService, ErrorService, $scope) {
    this.$location = $location;
    this.loggedIn = AuthService.getToken()

    $scope.$watch(function() {
      return !!AuthService.getToken();
    }, function(newValue, oldValue) {
      this.loggedIn = AuthService.getToken();
    }.bind(this));

    this.goHome = function() {
      this.loggedIn;
      $location.url('/');
    };

    this.signOut = function() {
      AuthService.signOut()
      .then(() => {
        this.loggedIn;
        $location.url('/');
      }, ErrorService.logError('Error on Sign Out'));
    };

    this.signUp = function(user) {
      AuthService.signUp(user)
      .then(() => {
        this.loggedIn;
        $location.url('/blog');
      }, ErrorService.logError('Error on Sign Up'));
    };

    this.logIn = function(user) {
      AuthService.logIn(user)
      .then(() => {
        this.loggedIn;
        $location.url('/blog');
      }, ErrorService.logError('Error on Sign Up')
    );
    }.bind(this);
  }]);
};
