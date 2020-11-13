const request = require('supertest');
const express = require('express');
const app = express();

  describe('GET /github', function() {
    it('check 404', function(done) {
      request(app)
        .get('http://localhost:5000/api/github/vmoraesinfo12')
        .set('Accept', 'application/json')
        .expect(404, done);
    });
  });

  describe('GET /github', function() {
    it("check message", async () => {
      const result = await request(app).get('http://localhost:5000/api/github/vmoraesinfo12');
      console.log(result);
      expect(result.body.message).toEqual("Not Found");
      expect(result.body.status).toEqual(404);
    });
  });