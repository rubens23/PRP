'use strict';

const angular = require('angular');
require('angular-mocks');
require('../../app/js/client.js');

describe('Controller Tests', () => {

  describe('ProfileAdminController Test', () => {
    let pac;
    let $httpBackend;

    beforeEach(() => {
      angular.mock.module('BucketListApp');
      angular.mock.inject(function($controller, _$httpBackend_) {
        pac = new $controller('ProfileAdminController');
        $httpBackend = _$httpBackend_;
      });
    });

    afterEach(() => {
      $httpBackend.verifyNoOutstandingRequest();
      $httpBackend.verifyNoOutstandingExpectation();
    });

    it('should have an admin object', () => {
      expect(typeof pac.admin).toBe('object');
    });

    it('should get an admin profile', () => {
      $httpBackend.expectGET('/admin')
        .respond(200, 'test admin');

      pac.getAdmin();
      $httpBackend.flush();

      expect(pac.admin).toBe('test admin');
    });

    it('should update an admin profile', () => {
      $httpBackend.expectPUT('/admin')
      let testAdmin = {}
        .respond(200, )
    })
  });
});
