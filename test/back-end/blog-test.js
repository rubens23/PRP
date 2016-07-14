'use strict';

const chai = require('chai');
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
const Entry = require('../../models/entry');
const mongoose = require('mongoose');

const expect = chai.expect;
const request = chai.request;

const dbPort = process.env.MONGLAB_URI;
require('../../server');

describe('Blog router tests', () => {
  let token;

  after((done) => {
    process.env.MONGOLAB_URI = dbPort;
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  describe('Catch all test', () => {

    it('should respond to a request to a random route with an error', (done) => {
      request('localhost:8080')
      .get('/test')
      .end((err, res) => {
        expect(err).to.not.eql(null);
        expect(res).to.have.status(404);
        done();
      });
    });
  });

  describe('tests that don\'t need data', () => {

    before((done) => {
      request('localhost:8080')
      .post('/signup')
      .send({username:'test', password:'test'})
      .end((err, res) => {
        token = res.body.token;
        done();
      });
    });

    it('should get a list of blog entries', (done) => {
      request('localhost:8080')
      .get('/blog/')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
    });

    it('should post a blog', (done) => {
      request('localhost:8080')
      .post('/blog/')
      .set('token', token)
      .send(
        {
          title:'test title',
          content:'test content'
        })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.title).to.eql('test title');
        expect(res.body.content).to.eql('test content');
        done();
      });
    });

    describe('tests that need data', () => {
      let testEntry;

      beforeEach((done) => {
        testEntry = new Entry({
          title:'test title',
          content:'test content'
        });

        testEntry.save((err) => {
          if (err) return console.log('Error: ', err);
          done();
        });
      });

      it('should update an entry with a PUT request', (done) => {
        testEntry.title = 'updatedByTest';
        request('localhost:8080')
          .put('/blog/')
          .set('token', token)
          .send(testEntry)
          .end((err, res) => {
            expect(err).to.eql(null);
            expect(res).to.have.status(200);
            expect(typeof res.body.data).to.eql('object');
            done();
          });
      });

      it('should delete an entry', (done) => {
        request('localhost:8080')
        .delete(`/blog/${testEntry._id}`)
        .set('token', token)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(typeof res.body.data).to.eql('object');
          done();
        });
      });
    });
  });
});
