const Post    = require('../models/Post');
const Like    = require('../models/Like');
const User    = require('../models/User');
const Comment = require('../models/Comment');


exports.createPost = (req, res, next) => {
    Post.create(req.body.data)
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
    Post.findAll()
    .then(posts => res.status(200).json({ posts}))
    .catch(error => res.status(400).json({ error }));
};

exports.postLike = (req, res, next) => {

    Like.findOne({ where: { postId: req.params.id, userId: req.body.userId }})
    .then(like => {
        if(like) {
            like.update({ like: req.body.like })
            .then(modif => res.status(200).json({ modif }))
            .catch(error => res.status(400).json({ error }));
        } else {
            Like.create({
                postId: req.params.id,
                userId: req.body.userId,
                like: req.body.like
            })
            .then(like => res.status(201).json({ like }))
            .catch(error => res.status(400).json({ error }));
        }
    })
    .catch(error => res.status(500).json({ error }));
}

exports.getLikes = (req, res, next) => {
    Like.findAll({ where: { postId: req.params.id }})
    .then(likes => res.status(200).json({ likes }))
    .catch(error => res.status(404).json({ error }))
}