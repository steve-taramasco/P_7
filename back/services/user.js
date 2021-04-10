const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');
const models = require('../models');
const fs     = require('fs');
const dotenv = require('dotenv').config();

exports.signup = async (body) => {
    const email_valid = /^[\w._-]+@[\w._-]+\.[a-z]{2,6}$/i;
    const pass_valid  = /^[\w._-]{5,}/i;
    const user_valid = /^[\w\s-]{5,15}$/i;

    try {
        if (email_valid.test(body.email) &&
            pass_valid.test(body.password) &&
            user_valid.test(body.username)) {

            const pass_hash =  await bcrypt.hash( body.password, 10 );
            const user = await models.User.create({ ...body, password: pass_hash });
            return user;
        }
        throw 'Identifiants invalides..';
    }
    catch (error) {
        throw Error (error)
    }
};

exports.login = async (body) => {

    try {
        const user = await models.User.findOne({ where: { email: body.email }});

        if(!user) {
            throw 'Email inconnu !'
        }
        const isValid = await bcrypt.compare(body.password, user.password);

        if(!isValid) {
            throw 'password incorrect !'
        }

        const data = {
            email: user.email,
            username: user.username,
            bio: user.bio,
            avatar: user.avatar,
            isAdmin: user.isAdmin,
            token: jwt.sign({ userId: user.id }, process.env.USER_TOKEN, { expiresIn: '24h' })
        }
        return data;

    } catch (error) {
        throw Error(error);
    }
}

exports.account = async (req) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.USER_TOKEN);
    const userId = decodedToken.userId;

    try {
        const user = await models.User.findOne({
            attributes: [ 'id', 'email', 'username', 'bio', 'avatar', 'isAdmin'],
            where: { id: userId }
        })
        return user
    }
    catch(err) {
        throw Error(error);
    }
}

exports.modify = async (req) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.USER_TOKEN);
    const userId = decodedToken.userId;
    const email_valid = /^[\w._-]+@[\w._-]+\.[a-z]{2,6}$/i;
    const text_valid = /^[\w\sÜ-ü,!?-_]{5,}/i;

    try {
        const user = await models.User.findOne({ where: { id: userId }});
        const data = {
            ...(req.body && req.body),
            ...(req.file && ({ avatar: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`}))
        };

        if (!user) {
            throw 'error: unable to verify user';
        }

        if(!text_valid.test(data.bio) || !text_valid.test(data.username) || !email_valid.test(data.email)) {
            throw 'error: invalid entries';
        }

        if (data.avatar && user.avatar) {
            const filename = user.avatar.split('/images/')[1];
            fs.unlink(`images/${filename}`, err => {
                if (err) {
                  console.error(err)
                  return
                }
            })
        }
        return await user.update({ ...data }, { returning: true, plain: true })

    } catch (error) {
        throw Error(error);
    }
}

exports.modifyPass = async (req) => {
    const token        = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.USER_TOKEN);
    const userId       = decodedToken.userId;
    const pass_valid   = /^[\w._-]{5,}/i;

    try {
        const user = await models.User.findOne({ where: { id: userId }});

        if (!user) {
            throw 'error: unable to verify user';
        }
        const isValid = await bcrypt.compare(req.body.password, user.password);

        if(!isValid) {
            throw 'password incorrect !'
        }

        if (!pass_valid.test(req.body.newPass)) {
            throw 'password invalid !'
        }
        const pass_hash =  await bcrypt.hash( req.body.newPass, 10 );
        return await user.update({ password: pass_hash }, { returning: true, plain: true })
    }
    catch(error) {
        throw Error(error);
    }
    finally {
        console.log(req.body);
    }
},

exports.delete = async (req) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.USER_TOKEN);
    const userId = decodedToken.userId;

    try {

        const user = await models.User.findOne({ where: { id: userId }, include: [{ model: models.Message }]});
        if (!user) {
            throw 'error: unable to verify user';
        }

        if (user.avatar) {
            const filename = user.avatar.split('/images/')[1];
            fs.unlink(`images/${filename}`, err => {
                if (err) {
                  console.error(err)
                  return
                }
            })
        }
        
        for (elt of user.Messages) {

            if (elt.attachment) {

                const filename = elt.attachment.split('/images/')[1];
                fs.unlink(`images/${filename}`, err => {
                    if (err) {
                        console.error(err)
                        return
                    }
                })
            }
        }
        return await user.destroy();

    } catch (error) {
        throw Error(error);
    }
}