const likeService = require('../services/like');

exports.postLike = (req, res, next) => {
    likeService.postLike(req.params.id, req.body.value, req.headers)
    .then((likes) => res.status(201).json({ likes }))
    .catch(error => res.status(400).json({ error: error.message }));
    }

exports.getLikes = (req, res, next) => {
    likeService.getLikes(req.params.id)
    .then(likes => res.status(200).json({ likes }))
    .catch(error => res.status(500).json({ error: error.message }))
}