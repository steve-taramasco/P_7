const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');
const models = require('../models');

require('dotenv').config();


exports.signup = async (body) => {

    const email_valid = /^[\w._-]+@[\w._-]+\.[a-z]{2,6}$/i;
    const pass_valid  = /^[\w._-]{5,}/i;

    try {

        if (email_valid.test(body.email) && pass_valid.test(body.password)
            && body.username.length >= 4 && body.username.length < 13) {

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

    const user = await models.User.findOne({ where: { email: body.email }});

    try {
        
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
            token: jwt.sign({ userId: user.id }, process.env.USER_TOKEN, { expiresIn: '24h' })
        }
    
        return data;

    } catch (error) {
        throw Error(error);
    }
}

exports.account = async (req) => {

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, "secret_token");
    const userId = decodedToken.userId;

    try {

        const user = await models.User.findOne({
            attributes: [ 'id', 'email', 'username', 'bio'],
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
    const decodedToken = jwt.verify(token, "secret_token");
    const userId = decodedToken.userId;

    try {

        const user = await models.User.findOne({ where: { id: userId }});

        if (!user) {
            throw 'error: unable to verify user';
        }

        return await user.update({ ...req.body });

    } catch (error) {
        throw Error(error);
    }
}

exports.delete = async (req) => {

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, "secret_token");
    const userId = decodedToken.userId;

    try {

        const user = await models.User.findOne({ where: { id: userId }});

        if (!user) {
            throw 'error: unable to verify user';
        }

        return await user.destroy({
            onDelete: cascade
        });

    } catch (error) {
        throw Error(error);
    }
}