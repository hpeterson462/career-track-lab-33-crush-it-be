const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');

describe('crush-it routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'))
  });

  it('creates a route', () => {
    return request(app)
      .post('/api/v1/routes')
      .send({
        location: 'Smith Rock',
        name: 'Voyage of the Cowdog',
        rating: '5.8+',
        notes: 'Good warm-up.'
      });
  });
});
