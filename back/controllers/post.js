const Post        = require('../models/Post');
const postService = require('../services/post');

exports.createPost = (req, res, next) => {
    postService.createPost(req)
    .then(post => res.status(201).json({ post }))
    .catch(error => res.status(400).json({ error: error.message }));
};

exports.getPost = (req, res, next) => {
    postService.getPost(req.params.id)
    .then(post => res.status(200).json({ post }))
    .catch(error => res.status(404).json({ error: error.message }));
};

exports.deletePost = (req, res, next) => {
    Post.destroy({ where: { id: req.params.id }})
    .then(() => res.status(200).json({ message: "le message à été supprimé !"}))
    .catch(error => res.status(400).json({ error }));
}

exports.getPosts = (req, res, next) => {
    postService.getPosts()
    .then(posts => res.status(200).json({ posts }))
    .catch(error => res.status(400).json({ error: error.message }));
};