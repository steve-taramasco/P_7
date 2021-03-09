const commentService = require('../services/comment');

exports.createComment = (req, res, next) => {
    commentService.createComment( req.body.comment, req.params.id, req.headers )
    .then(comment => res.status(201).json({ comment }))
    .catch(error => res.status(500).json({ error: error.message }));
}

exports.getComments = (req, res, next) => {
    commentService.getComments(req.params.id)
    .then(comments => res.status(200).json({ comments }))
    .catch(error => res.status(500).json({ error: error.message }));
}