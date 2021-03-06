const express = require('express');
router = express.Router();
const Blog = require('../models/Blog');
const User = require('../models/User');

router.get('/', (req, res) => {
  Blog
    .find({})
    .then(blogs => res.status(200).json(blogs))
    .catch(err => res.status(500).json({ 'Error': err }));
});

router.get('/featured', (req, res) => {
  Blog
    .find({ featured: true })
    .then(blogs => res.status(200).json(blogs))
    .catch(err => res.status(500).json({ 'Error': err }));
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  Blog
    .findById(id)
    .then(blog => {
      blog
      //ternary OPERATOR!!!!!!!!!!!!!!
      ? res.status(200).json(blog)
      : res.status(404).json({ 'Error': `No blog with id: ${id} exists` });
    })
    .catch(err => res.status(500).json({ 'Error': err }));
});

router.post('/', (req, res) => {
  let dbUser = null;
  User
    .findById(req.body.author)
    .then(user => {
      dbUser = user;
      const newBlog = new Blog(req.body);
      newBlog.author = user._id;
      return newBlog.save();
    })
    .then(blog => {
      dbUser.blogs.push(blog);
      dbUser
        .save()
        .then(() => res.status(201).json(blog))
        .catch(err => res.status(500).json({ 'Error': err }));
    })
    .catch(err => res.status(500).json({ 'Error': err }));
});

router.put('/:id', (req, res) => {
  Blog
    .findByIdAndUpdate(req.params.id, { $set: req.body })
    .then(blog => {
      blog
      ? res.status(204).json(blog)
      : res.status(404).json({ 'Error': `There ain't no blog with id: ${id} to change.` });
    })
    .catch(err => res.status(500).json({ 'Error': err }));
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  Blog
    .findByIdAndDelete(id)
    .then(blog => {
      blog
      ? res.status(200).json(blog)
      : res.status(404).json({ 'Error': `There ain't no blog with id: ${id} to delete.` });
    })
    .catch(err => res.status(500).json({ 'Error': err }));
});

module.exports = router;
