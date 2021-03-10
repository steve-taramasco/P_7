const Post    = require('../models/Post');
const User    = require('../models/User');
const Comment = require('../models/Comment');
const Like    = require('../models/Like');
const date    = require('../config/moment');
const jwt     = require('jsonwebtoken');

exports.createPost = async (req) => {

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, "secret_token");
    const userId = decodedToken.userId;
    
    const post = {
        ...(req.body.message && ({ message: req.body.message })),
        ...(req.file && ({ image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`}))
    };

    try {

        if (!post.message && !post.image) {
            throw 'error: message vide'
        } else {
            console.log(post);
        }

    //     return await Post.create({
    //         message: message,
    //         userId: userId
    //     })
    // }
    }
    catch(error) {
        throw Error(error);
    }

    finally {
        console.log(post);
    }
}

exports.getPosts = async () => {

    const posts = await Post.findAll({ include: [ User, Like, Comment ]});
    const data = [];

    try {

        for (elt of posts) {
            const post = {
                id: elt.id,
                username: elt.user.username,
                message: elt.message,
                comments: 0,
                created: date.formatedDate(elt.createdAt),
                likes: 0,
                dislikes: 0
            };

            for (like of elt.likes) {
                if (like.value == 1) {
                    post.likes += 1
                } else if (like.value == -1) {
                    post.dislikes += 1
                }
            }

            for (comment of elt.comments) {
                post.comments ++
            }

            data.push(post)
        }
        return data

    } catch (e) {
        throw Error(e)
    }
};

exports.getPost = async (id) => {

    const post = await Post.findOne({ where: { id: id }, include: [ User, Like ]});
    const comments = await Comment.findAll({ where: { postId: id }, include: User });

    try {
        const data =  {
            id: post.id,
            username: post.user.username,
            message: post.message,
            comments: [],
            created: date.formatedDate(post.createdAt),
            likes: 0,
            dislikes: 0
        };

        for (like of post.likes) {
            if (like.value == 1) {
                data.likes += 1
            } else if (like.value == -1) {
                data.dislikes += 1
            }
        }

        for (elt of comments) {
            const comment = {
                id: elt.id,
                username: elt.user.username,
                message: elt.comment,
                created: date.formatedDate(post.createdAt),
                likes: 0,
                dislikes: 0
            }

            data.comments.push(comment)
        }
        return data

    } catch (error) {
        throw Error(error)
    }
};