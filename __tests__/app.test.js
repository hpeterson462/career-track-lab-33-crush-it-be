const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const Route = require('../lib/models/route');

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
      })
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          userId: expect.any(String),
          location: 'Smith Rock',
          name: 'Voyage of the Cowdog',
          rating: '5.8+',
          notes: 'Good warm-up.'
        });
      });
  });

  it('gets all routes', async () => {
    const routes = await Promise.all([
      {
        id: 1,
        location: 'Rattlesnake',
        name: 'Arabesque',
        rating: '5.10a',
        notes: 'Scary split legged crux!'
      },
      {
        id: 2,
        location: 'Smith Rock',
        name: 'Purple Headed Warrior',
        rating: '5.7',
        notes: 'Nice warm up.'
      },
      {
        id: 3,
        location: 'Emigrant Lake',
        name: 'Aqua Man',
        rating: '5.10b',
        notes: 'Better than the Poison Oak Wall.'
      }
    ].map(route => Route.insert(route)));

    return request(app)
      .get('/api/v1/routes')
      .then(res => {
        routes.forEach(route => {
          expect(res.body).toContainEqual(route);
        });
      });
  });

  it('gets a route by id', async () => {
    const route = await Route.insert({
      location: 'Rattlesnake',
      name: 'Arabesque',
      rating: '5.10a',
      notes: 'Scary split legged crux!'
    });

    return request(app)
      .get(`/api/v1/routes/${route.id}`)
      .then(res => {
        expect(res.body).toEqual(route);
      });
  });

  it('updates a route by id', async () => {
    const route = await Route.insert({
      location: 'Smith Rock',
      name: 'Voyage of the Cowdog',
      rating: '5.8+',
      notes: 'Good warm-up.'
    });

    return request(app)
      .put(`/api/v1/routes/${route.id}`)
      .send({
        location: 'Smith Rock',
        name: 'Voyage of the Cowdog',
        rating: '5.8+',
        notes: 'So so.'
      });
  });

  it('deletes a route by id', async () => {
    const route = await Route.insert({
      location: 'Smith Rock',
      name: 'Voyage of the Cowdog',
      rating: '5.8+',
      notes: 'So so.'
    });

    return request(app)
      .delete(`/api/v1/routes/${route.id}`)
      .then(res => {
        expect(res.body).toEqual(route);
      });
  });
});
