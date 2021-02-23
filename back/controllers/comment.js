const Comment = require('../models/Comment');
const User = require('../models/User');


exports.createComment = (req, res, next) => {
    // Comment.create({
    //         message: req.body.data.comment,
    //         userId: req.body.data.userId,
    //         postId: req.params.id
    //     })
    // .then(comment => res.status(201).json({ comment }))
    // .catch(error => res.status(400).json({ error }));
}

exports.getComments = (req, res, next) => {
    // Comment.findAll({ where: { postId: req.params.id }, include: User })
    // .then(comments => res.status(200).json({ comments }))
    // .catch(error => res.status(500).json({ error }));
}