'use strict';
const angular = require('angular');
require('angular-mocks');
require('../../app/js/client');

describe('auth service tests', function() {
  let authService;
  beforeEach(() => {
    angular.mock.module('BucketListApp');
    angular.mock.inject(function(AuthService){
      authService = AuthService;
    });
  });
  it('should have test Sign Up', () => {
    expect(typeof authService.signUp).toBe('function');
  });
  it('should test Sign Out', () => {
    expect(typeof authService.signOut).toBe('function');
  });
  it('should test log In', () => {
    expect(typeof authService.logIn).toBe('function');
  });
  it('should test Getting a token', () => {
    expect(typeof authService.getToken).toBe('function');
  });
});
