const commentService = require('../services/comment');

exports.createComment = (req, res, next) => {
    commentService.createComment(req)
    .then(comment => res.status(201).json({ comment }))
    .catch(error => res.status(500).json({ error: error.message }));
}

exports.deleteComment = (req, res, next) => {
    commentService.deleteComment(req)
    .then(() => res.status(200).json({ message: "commentaire supprimmer" }))
    .catch(error => res.status(500).json({ error: error.message }));
}