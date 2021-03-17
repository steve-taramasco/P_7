const jwt          = require('jsonwebtoken');
const models       = require('../models');

exports.postLike = async (req) => {
    
    const token        = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, "secret_token");
    const userId       = decodedToken.userId;
    
    const messageId    = req.params.id;
    const value        = req.body.value;
    const like         = await models.Like.findOne({ where: { messageId: messageId, userId: userId }})
    
    try {

        if (!like) {
            await models.Like.create({ messageId: messageId, userId: userId, value: value })

        } else if (like.value == value) {
            await models.Like.destroy({ where: { messageId: messageId, userId: userId }})

        } else {
            await models.Like.update({ value: value }, { where: { messageId: messageId, userId: userId }})
        }

        return models.Like.findAll({ where: { messageId: messageId }});
    }

    catch(e) {
        throw Error(e)
    }
}

exports.getLikes = async (id) => {

    try {
       
       return await models.Like.findAll({ where: { messageId: id }})//, include: models.User });
    }
    catch(e) {
        throw Error(e)
    }
}
