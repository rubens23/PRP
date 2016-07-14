'use strict';

const angular = require('angular');
require('angular-mocks');
require('../../app/js/client.js');

describe('Controller Tests', () => {

  describe('AuthController Test', () => {
    let ac;
    let $httpBackend;

    beforeEach(() => {
      angular.mock.module('BucketListApp');
      angular.mock.inject(function($controller, _$httpBackend_) {
        ac = new $controller('AuthController');
        $httpBackend = _$httpBackend_;
      });
    });

    afterEach(() => {
      $httpBackend.verifyNoOutstandingRequest();
      $httpBackend.verifyNoOutstandingExpectation();
    });

    it('should allow a user to sign up', () => {
      $httpBackend.expectPOST('/signup')
      .respond(200, {data: [{body: 'test user'}]});

      ac.signUp({username: 'testuser', password: 'testpassword'});
      $httpBackend.flush();
    });

    it('should allow a user to log in', () => {
      $httpBackend.expectGET('/login')
      .respond(200, {data: [{body: 'test user'}]});

      ac.logIn({username: 'testuser', password: 'testpassword'});
      $httpBackend.flush();

    // it('should allow a user to sign out', () => {
    //   $httpBackend.expectGET('http://localhost:8080/signout')
    //     .respond(200, {data: [{body: 'test user'}]});
    //
    //   ac.signOut();
    //   $httpBackend.flush();
    //
    //   expect(typeof ac.signOut).toBe('function');
    // });
    });
  });
});
