const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const secret_token = process.env.TOKEN;
const Like = require('../models/Like');

exports.postLike = async (postId, value, headers) => {
    
    const token = headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, "secret_token");
    const userId = decodedToken.userId;
    const like = await Like.findOne({ where: { postId: postId, userId: userId }})
    
    try {

        if (!like) {
            await Like.create({ postId: postId, userId: userId, value: value })

        } else if (like.value == value) {
            await Like.destroy({ where: { postId: postId, userId: userId }})

        } else {
            await Like.update({ value: value }, { where: { postId: postId, userId: userId }})
        }
        return Like.findAll({ where: { postId: postId }});
    }

    catch(e) {
        throw Error(e)
    }
}

exports.getLikes = async (id) => {

    const likes = await Like.findAll({ where: { postId: id }});
    const data = {
        likes: 0,
        dislikes: 0
    };

    try {
       
        for (elt of likes) {
            if (elt.value == 1) {
                data.likes ++;
            } else if (elt.value == -1) {
                data.dislikes ++;
            } else {
                return;
            }
        }
        return data;
    }
    catch(e) {
        throw Error(e)
    }
}
