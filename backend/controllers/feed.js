const { validationResult } = require('express-validator/check');
const Post = require('../models/post');

exports.getPosts = (req, res, next) => {
  // res.status(200).json({
  //   posts: [{
  //     _id: '1',
  //     title: 'First Post',
  //     content: 'This is the first post!',
  //     imageUrl: 'images/draw.png',
  //     creator: {
  //       name: 'Prit',
  //     },
  //     date: new Date()
  //   }]
  // });
  Post.find()
    .then(posts => {
      // console.log(posts);
      res.status(200).json({
        message: 'Fetched posts successfully',
        posts: posts
      });
    });
};

exports.createPost = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    // return res.status(422).json({
    //   message: 'Validation failed, entered data is incorrect!',
    //   error: error.array()
    // })
    const error = new Error('Validation failed, entered data is incorrect!');
    error.statusCode = 422;
    throw error;
  }
  if (!req.file) {
    const error = new Error('No image provided!');
    error.statusCode = 422;
    throw error;
  }
  const title = req.body.title;
  const imageUrl = req.file.path;
  const content = req.body.content;
  // Create post in db
  const post = Post({
    title: title,
    imageUrl: imageUrl,
    content: content,
    creator: { name: 'prit' },
  });
  post.save()
    .then(result => {
      console.log(result)
      res.status(201).json({
        message: 'Post created successfully!',
        post: result
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err);
    })
};

exports.getPost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then(post => {
      if (!post) {
        const error = new Error('Could not find post!');
        error.statusCode = 404;
        throw error;
      }
      console.log(post);
      res.status(200).json({
        message: 'Fetched posts successfully',
        post: post
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err);
    })
}
