'use strict';

module.exports = function(app) {

  app.factory('ProfileService', function($http, ErrorService) {
    const service = {};
    service.profile = {};

    service.getProfile = function(profileUrl,cb) {
      return $http({
        method: 'GET',
        headers: {
          profile: profileUrl
        },
        url: '/profile'
      })
      .then((res) => {
        service.profile = res.data;
        cb();
      }, ErrorService.logError('Error on profile'));
    };
    return service;
  });
};
