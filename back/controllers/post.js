const Post    = require('../models/Post');
const User    = require('../models/User');
const Comment = require('../models/Comment');


exports.createPost = (req, res, next) => {
    Post.create(req.body)
    .then(post => res.status(201).json({ post }))
    .catch(error => res.status(400).json({ error }));
};

exports.getPost = (req, res, next) => {
    Post.findOne({ where: { id: req.params.id }})
    .then(post => res.status(200).json({ post }))
    .catch(error => res.status(404).json({ error }));
};

exports.deletePost = (req, res, next) => {
    Post.destroy({ where: { id: req.params.id }})
    .then(() => res.status(200).json({ message: "le message à été supprimé !"}))
    .catch(error => res.status(400).json({ error }));
}

exports.getPosts = (req, res, next) => {
    Post.findAll({ include: User })
    .then(posts => res.status(200).json({ posts }))
    .catch(error => res.status(400).json({ error }));
};