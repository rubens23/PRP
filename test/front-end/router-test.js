'use strict';

const angular = require('angular');

require('angular-mocks');
require('../../app/js/client.js');

describe('Router Tests', () => {
  beforeEach(() => {
    angular.mock.module('BucketListApp');

  });

  it('should map routes to controllers', function() {
    angular.module('BucketListApp');
    angular.mock.inject(function($route) {

      expect($route.routes['/'].controller).toBe('AuthController');
      expect($route.routes['/'].templateUrl).toEqual('./views/partials/home.html');

      expect($route.routes['/blog'].controller).toBe('BlogController');
      expect($route.routes['/blog'].templateUrl).toEqual('./views/partials/blog.html');

      expect($route.routes['/blog-admin'].controller).toBe('BlogAdminController');
      expect($route.routes['/blog-admin'].templateUrl).toEqual('./views/partials/blog-admin.html');

      expect($route.routes['/profile'].controller).toBe('ProfileController');
      expect($route.routes['/profile'].templateUrl).toEqual('./views/partials/profile.html');

      expect($route.routes['/profile-admin'].controller).toBe('ProfileAdminController');
      expect($route.routes['/profile-admin'].templateUrl).toEqual('./views/partials/profile-admin.html');

      expect($route.routes[null].redirectTo).toEqual('/');
    });
  });
});
