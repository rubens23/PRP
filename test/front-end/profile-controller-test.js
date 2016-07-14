'use strict';

const angular = require('angular');
require('angular-mocks');
require('../../app/js/client.js');

describe('Controller Tests', () => {

  describe('ProfileController Test', () => {
    let pc;
    let $httpBackend;

    beforeEach(() => {
      angular.mock.module('BucketListApp');
      angular.mock.inject(function($controller, _$httpBackend_) {
        pc = new $controller('ProfileController');
        $httpBackend = _$httpBackend_;
      });
    });

    afterEach(() => {
      $httpBackend.verifyNoOutstandingRequest();
      $httpBackend.verifyNoOutstandingExpectation();
    });

    it('should have a profile object', () => {
      expect(typeof pc.profile).toBe('object');
    });

    it('should get a users profile', () => {
      $httpBackend.expectGET('/profile')
        .respond(200, 'test profile');

      pc.getProfile();
      $httpBackend.flush();

      expect(pc.profile).toBe('test profile');
    });
  });
});
