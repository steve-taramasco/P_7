const Comment = require('../models/Comment');
const User    = require('../models/User');
const date    = require('../config/moment');
const jwt     = require('jsonwebtoken');

exports.createComment = async (comment, postId,  headers) => {

    const token = headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, "secret_token");
    const userId  = decodedToken.userId;
    
    try {

        if (!comment) {
            return "error: comment doesn't exist.."
        } else {
           return await Comment.create({ comment: comment, userId: userId, postId: postId })
        }
    }

    catch(error) {
        throw Error(error);
    }
}

exports.getComments = async (postId) => {

    const comments = await Comment.findAll({ where: { postId: postId }, include: User })
    const data = [];

    try {

        for (elt of comments) {
            const comment = {
                id: elt.id,
                username: elt.user.username,
                message: elt.comment,
                created: date.formatedDate(elt.createdAt),
                likes: 0,
                dislikes: 0
            }
            data.push(comment)
        }

        return data
    }
    catch(error) {
        throw Error(error)
    }
}