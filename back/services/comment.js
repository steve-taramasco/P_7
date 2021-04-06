const jwt    = require('jsonwebtoken');
const models = require('../models');
const dotenv = require('dotenv').config();


exports.createComment = async (req) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.USER_TOKEN);
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

exports.deleteComment = async (req) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.USER_TOKEN);
    const userId = decodedToken.userId;

    try {
        const user = await models.User.findOne({ where: { id: userId }});
        const comment = await models.Comment.findOne({ where: { id: req.params.id }});

        if (comment.userId != userId && user.isAdmin == 0) {
            throw 'error: Action non authorisée !';
        }

        return await models.Comment.destroy({ where: { id: req.params.id }})
    }
    catch(error) {
        throw Error(error)
    }
}