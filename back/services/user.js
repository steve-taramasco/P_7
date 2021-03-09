const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();


exports.signup = async (body) => {

    const email_valid = /^[\w._-]+@[\w._-]+\.[a-z]{2,6}$/i;
    const pass_valid  = /^[\w._-]{5,}/i;

    try {

        if (email_valid.test(body.email) && pass_valid.test(body.password)) {

            const pass_hash =  await bcrypt.hash( body.password, 10 );
            const user = await User.create({ ...body, password: pass_hash });
            const data = {
                bio: user.bio,
                email: user.email,
                username: user.username
            }
            return data;
        } 
        throw 'Identifiants incorrects..';
    }
    catch (error) {
        throw Error (error)
    }
};

exports.login = async (body) => {

    const user = await User.findOne({ where: { email: body.email }});

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