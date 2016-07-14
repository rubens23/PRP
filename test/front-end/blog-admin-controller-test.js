'use strict';

const angular = require('angular');
require('angular-mocks');
require('../../app/js/client');

describe('Controller Tests', () => {

  describe('BlogAdminController Test', () => {
    let bac;
    let $httpBackend;

    beforeEach(() => {
      angular.mock.module('BucketListApp');
      angular.mock.inject(function($controller, _$httpBackend_) {
        bac = new $controller('BlogAdminController');
        $httpBackend = _$httpBackend_;
      });
    });

    afterEach(() => {
      $httpBackend.verifyNoOutstandingRequest();
      $httpBackend.verifyNoOutstandingExpectation();
    });

    it('should have entries array', () => {
      expect(Array.isArray(bac.entries)).toBe(true);
    });

    it('should allow an existing user to add an entry', () => {
      $httpBackend.expectPOST('/blog')
        .respond(200, {body: 'test entry', title: 'test title', content: 'test content'});

      bac.newEntry = {body: 'test entry', title: 'test title', content: 'test content'};
      bac.addEntry();
      $httpBackend.flush();

      expect(bac.newEntry).toBe(null);
    });
  });
});
