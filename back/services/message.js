const models    = require('../models');
const date      = require('../moment');
const jwt       = require('jsonwebtoken');


exports.createMessage = async (req) => {

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, "secret_token");
    const userId = decodedToken.userId;

    const message = {
        ...req.body.content && ({ content: req.body.content }),
        ...req.file && ({ attachment: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`})
    };

    try {

        if (!message.content && !message.attachment) {
            throw 'error: missing parameters'
        }

        // if (message.content.length < 2 || message.content.length >= 255) {
        //     throw 'error: invalid parameters'
        // }

        return await models.Message.create({

            UserId: userId,
            content: message.content,
            attachment: message.attachment
        })
    }

    catch(error) {
        throw Error(error);
    }

    finally {
        console.log(message);
    }
}

exports.getMessages = async (req) => {

    const fields = req.query.fields;
    const limit   = parseInt(req.query.limit);
    const offset  = parseInt(req.query.offset);
    const order   = req.query.order;
    let messages = [];

    try {

        const data = await models.Message.findAll({

            attributes: (fields && fields.split(',')) || null,
            order: [(order && order.split(':')) || ['createdAt', 'ASC']],
            limit: (!isNaN(limit) && limit || null),
            offset: (!isNaN(offset) && offset || null),
            include: [
                {
                    model: models.User,
                    attributes: [ 'username' ]
                },
                {
                    model:  models.Like,
                    // include: [
                    //     {
                    //         model: models.User,
                    //         attributes: [ 'username' ]
                    //     }
                    // ]
                },
                {
                    model:  models.Comment,
                    include: [
                        {
                            model: models.User,
                            attributes: [ 'username' ]
                        }
                    ]
                }
            ]
        });

        for (elt of data) {

            const message = {
                id: elt.id,
                content: elt.content,
                attachment: elt.attachment,
                date: date.formatedDate(elt.createdAt),
                username: elt.User.username,
                likes: 0,
                dislikes: 0,
                comments: 0
            }

            messages.push(message);

            for (like of elt.Likes) {
                if (like.value == 1) {
                    message.likes += 1
                } else if (like.value == -1) {
                    message.dislikes += 1
                }
            }

            for (comment of elt.Comments ) {
                message.comments += 1;
            }
        }

        return messages

    } catch (e) {
        throw Error(e)
    }
};

exports.getMessage = async (id) => {

    const data = await models.Message.findOne(
        { where: { id: id },
        include: [
            {
                model: models.User
            },
            {
                model: models.Like
            },
            {
                model: models.Comment,
                include: models.User
            }
        ]});

    try {

        const message =  {
            id: data.id,
            username: data.User.username,
            content: data.content,
            date: date.formatedDate(data.createdAt),
            likes: 0,
            dislikes: 0,
            comments: [],
        };

        for (elt of data.Comments) {

            const comment = {
                id: elt.id,
                username: elt.User.username,
                content: elt.content,
                date: date.formatedDate(elt.createdAt)
            }
        
            message.comments.push(comment)
        };

        for (like of data.Likes) {
            if (like.value == 1) {
                message.likes += 1
            } else if (like.value == -1) {
                message.dislikes += 1
            }
        };

        return message

    } catch (error) {
        throw Error(error)
    }
};