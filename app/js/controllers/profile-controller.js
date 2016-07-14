'use strict';

module.exports = function(app) {

  app.controller('ProfileController', ['$http', '$location', '$window', 'ProfileService', 'ErrorService', function($http, $location, $window, ProfileService, ErrorService) {

    this.$http = $http;
    this.$location = $location;
    this.login = $window.localStorage.token;
    this.loggedInUser = $window.localStorage.username;

    this.profile = {};

    this.getUserProfile = function() {
      ProfileService.getProfile(this.loggedInUser, () => {
        this.profile = ProfileService.profile
      });
    };

    this.getProfile = function(url) {
      ProfileService.getProfile(url, () => {
        this.profile = ProfileService.profile;
      });
    };
  }]);
};
