const { Router } = require('express');
const User = require('../models/user');

module.exports = Router()
  .post('/', (req, res, next) => {
    User
      .insert(req.body)
      .then(user => res.send(user))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    User
      .find(req.body)
      .then(users => res.send(users))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    User
      .findById(req.params.id)
      .then(user => res.send(user))
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    User
      .update(req.params.id, req.body)
      .then(user => res.send(user))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    User
      .delete(req.params.id)
      .then(user => res.send(user))
      .catch(next);
  })
