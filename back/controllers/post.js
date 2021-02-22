const db = require('../db');

exports.createPost = (req, res, next) => {
    db.posts.create(req.body.data)
    .then(post => res.status(201).json({ post }))
    .catch(error => res.status(400).json({ error }));
};

exports.getPost = (req, res, next) => {
    db.posts.findOne({ where: { id: req.params.id },
        include: [db.users, db.comments, db.likes]})
    .then(post => res.status(200).json({ post }))
    .catch(error => res.status(404).json({ error }));
};

exports.deletePost = (req, res, next) => {
    db.posts.destroy({ where: { id: req.params.id }})
    .then(() => res.status(200).json({ message: "le message à été supprimé !"}))
    .catch(error => res.status(400).json({ error }));
}

exports.getPosts = (req, res, next) => {
    db.posts.findAll({ include: [ db.users, db.comments, db.likes ]})
    .then(posts => res.status(200).json({ posts}))
    .catch(error => res.status(400).json({ error }));
};

exports.postLike = (req, res, next) => {

    db.likes.findOne({ where: { postId: req.params.id, userId: req.body.userId }})
    .then(like => {
        if(like) {
            like.update({ like: req.body.like })
            .then(modif => res.status(200).json({ modif }))
            .catch(error => res.status(400).json({ error }));
        } else {
            db.likes.create({
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
    db.likes.findAll({ where: { postId: req.params.id }})
    .then(likes => res.status(200).json({ likes }))
    .catch(error => res.status(404).json({ error }))
}