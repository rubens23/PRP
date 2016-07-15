'use strict';

module.exports = function(app) {
  app.factory('EntryService', function($http, ErrorService, AuthService) {
    const service = {};
    service.entries = [];

    service.getEntries = function(cb) {
      return $http({
        method: 'GET',
        headers: {
          token: AuthService.getToken()
        },
        url: '/blog'
      }).then((res) => {
        service.entries = res.data.reverse();
        cb();
      }, ErrorService.logError('Error on Sign Up'));
    };

    service.pushEntry = function(cb) {
      return function(res) {
        let entry = res.data;
        service.entries.unshift(entry);
        cb();
      };
    };

    return service;
  });
};
