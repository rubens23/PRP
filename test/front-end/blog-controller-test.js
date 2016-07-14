'use strict';

const angular = require('angular');
require('angular-mocks');
require('../../app/js/client.js');

describe('Controller Tests', () => {

  describe('BlogController Test', () => {
    let bc;
    let $httpBackend;

    beforeEach(() => {
      angular.mock.module('BucketListApp');
      angular.mock.inject(function($controller, _$httpBackend_) {
        bc = new $controller('BlogController');
        $httpBackend = _$httpBackend_;
      });
    });

    afterEach(() => {
      $httpBackend.verifyNoOutstandingRequest();
      $httpBackend.verifyNoOutstandingExpectation();
    });

    it('should have an entries array', () => {
      expect(Array.isArray(bc.entries)).toBe(true);
    });

    it('should have a property of editing', () => {
      expect(bc.editing).toBe(false);
    });

    it('should allow a user to update a blog entry', () => {
      let testEntry = {body: 'test entry', title: 'test title', content: 'test content', _id: 1};
      let updatedEntry = {body: 'test entry2', title: 'test title', content: 'test content', _id: 1};
      $httpBackend.expectPUT('/blog')
        .respond(200, {message: 'updated'});

      bc.entries.push(testEntry);
      bc.updateEntry(testEntry, updatedEntry);
      $httpBackend.flush();

      expect(bc.entries.length).toBe(1);
      expect(bc.entries[0].body).toBe('test entry');
      expect(bc.entries[0].title).toBe('test title');
      expect(bc.entries[0].content).toBe('test content');
    });

    it('should allow a user to delete a blog entry', () => {
      let testEntry = {body: 'test entry', title: 'test title', content: 'test content', _id: 1};
      $httpBackend.expectDELETE('/blog/1')
        .respond(200, {message: 'deleted'});

      bc.entries.push(testEntry);
      bc.deleteEntry(testEntry);
      $httpBackend.flush();

      expect(bc.entries.length).toBe(0);
    });
  });
});
