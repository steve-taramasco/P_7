const userService = require('../services/user');
const models      = require('../models');


exports.signup = (req, res, next) => {
    userService.signup(req.body)
    .then(() => userService.login(req.body)
        .then((user) => res.status(201).json({ user }))
        .catch(error => res.status(500).json({ error: error.message }))
    )
    .catch(error => res.status(500).json({ error: error.message }))
}

exports.login = (req, res, next) => {
    userService.login(req.body)
    .then(user => res.status(200).json({ user }))
    .catch(error => res.status(403).json({ error: error.message }));
}

exports.modify = (req, res, next) => {
    userService.modify(req)
    .then((user) => res.status(200).json({ user }))
    .catch(error => res.status(500).json({ error: error.message }));
}

exports.delete = (req, res, next) => {
    userService.delete(req)
    .then((user) => res.status(200).json({ user }))//message: "l'utilisateur à bien été supprimé !"}))
    .catch(error => res.status(500).json({ error: error.message }));
}

exports.getUser = (req, res, next) => {
    userService.account(req)
    .then(user => res.status(200).json({ user }))
    .catch(error => res.status(500).json({ error: error.message }));
}

exports.getUsers = (req, res, next) => {
    models.User.findAll()
    .then(users => res.status(200).json({ users }))
    .catch(error => res.status(500).json({ error: error.message }));
}

exports.password = (req, res, next) => {
    userService.modifyPass(req)
    .then((user) => res.status(200).json({ user }))
    .catch(error => res.status(500).json({ error: error.message }));
}
