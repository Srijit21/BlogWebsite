const express = require('express');
const Post = require('../models/Post');
const router = express.Router();

router.get('/', async (req, res) => {
  const posts = await Post.find().sort({ date: -1 });
  res.render('index', { posts });
});

router.get('/new', (req, res) => {
  res.render('new-post');
});

router.post('/new', async (req, res) => {
  const newPost = new Post({
    title: req.body.title,
    content: req.body.content
  });
  await newPost.save();
  res.redirect('/');
});

router.get('/post/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render('post', { post });
});

module.exports = router;
