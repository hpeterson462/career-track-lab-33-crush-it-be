const { Router } = require('express');
const Route = require('../models/route');

module.exports = Router()
  .post('/', (req, res, next) => {
    Route
      .insert(req.body)
      .then(route => res.send(route))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Route
      .find(req.body)
      .then(route => res.send(route))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Route
      .findById(req.params.id)
      .then(route => res.send(route))
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    Route
      .update(req.params.id, req.body)
      .then(route => res.send(route))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Route
      .delete(req.params.id)
      .then(route => res.send(route))
      .catch(next);
  })
