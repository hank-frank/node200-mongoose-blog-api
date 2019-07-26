const express = require('express');
const router = express.Router();
const User = require ('../models/User');

router.get('/', (req, res) => {
    User
      .find({})
      .then(users => res.status(200).json(users))
      .catch(err => res.status(500).json({ 'Error': err }));
    });
  
  router.get('/:id', (req, res) => {
    const id = req.params.id;
    User
      .findById(id)
      .then(user => {
        user
        ? res.status(200).json(user)
        : res.status(404).json({ 'Message': `No user with id: ${id} exists` });
      })
      .catch(err => res.status(500).json({ 'Error': err }));
  });
  
  router.post('/', (req, res) => {
    const newUser = new User(req.body);
    newUser
      .save()
      .then(user => res.status(201).json(user))
      .catch(err => res.status(500).json({ 'Error': err }));
  });
  
  router.put('/:id', (req, res) => {
    User
      .findByIdAndUpdate(req.params.id, { $set: req.body })
      .then(user => res.status(204).json(user))
      .catch(err => res.status(500).json({ 'Error': err }));
  });
  
  router.delete('/:id', (req, res) => {
    const id = req.params.id
    User
      .findByIdAndDelete(id)
      .then(user => {
        user
        ? res.status(200).json(user)
        : res.status(404).json({ 'Message': `No user with id: ${id} exists to delete` });
      })
      .catch(err => res.status(500).json({ 'Error': err }));
  });

module.exports = router;
