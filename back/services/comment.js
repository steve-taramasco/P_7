const jwt     = require('jsonwebtoken');
const models  = require('../models');

exports.createComment = async (req) => {

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, "secret_token");
    const userId  = decodedToken.userId;
    
    try {

        if (!req.body.content) {
            return "error: comment doesn't exist.."
        } else {
           return await models.Comment.create(
               {
                   content: req.body.content,
                   UserId: userId,
                   MessageId: req.params.id
                }
            )
        }
    }

    catch(error) {
        throw Error(error);
    }
}

exports.deleteComment = async (postId) => {

    try {
        return await models.Comment.destroy({ where: { id: postId }})
    }
    catch(error) {
        throw Error(error)
    }
}