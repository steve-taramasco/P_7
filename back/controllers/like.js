const Like    = require('../models/Like');


exports.postLike = (req, res, next) => {
    // Like.findOne({ where: { postId: req.params.id, userId: req.body.userId }})
    // .then(like => {
    //     if(like) {
    //         like.update({ like: req.body.like })
    //         .then(modif => res.status(200).json({ modif }))
    //         .catch(error => res.status(400).json({ error }));
    //     } else {
    //         Like.create({
    //             postId: req.params.id,
    //             userId: req.body.userId,
    //             like: req.body.like
    //         })
    //         .then(like => res.status(201).json({ like }))
    //         .catch(error => res.status(400).json({ error }));
    //     }
    // })
    // .catch(error => res.status(500).json({ error }));
}

exports.getLikes = (req, res, next) => {
    // Like.findAll({ where: { postId: req.params.id }})
    // .then(likes => res.status(200).json({ likes }))
    // .catch(error => res.status(404).json({ error }))
}