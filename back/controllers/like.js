const likeService = require('../services/like');

exports.postLike = (req, res, next) => {
    likeService.postLike(req)
    .then((likes) => res.status(201).json({ likes }))
    .catch(error => res.status(400).json({ error: error.message }));
}