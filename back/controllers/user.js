const user   = require('../models/User');
const userService = require('../services/user');


exports.signup = (req, res, next) => {
    userService.signup(req.body)
    .then((user) => res.status(201).json({ user }))
    .catch(error => res.status(400).json({ error: error.message }))
}

exports.login = (req, res, next) => {
    userService.login(req.body)
    .then(user => res.status(200).json({ user }))
    .catch(error => res.status(404).json({ error: error.message }));
}

exports.modify = (req, res, next) => {
    user.update({ ...req.body }, { where: { id: req.params.id }})
    .then(() => res.status(200).json({ message: "l'utilisateur à bien été modifié !" }))
    .catch(error => res.status(500).json({ error }));
}

exports.delete = (req, res, next) => {
    user.destroy({ where: { id: req.params.id }})
    .then(() => res.status(200).json({ message: "l'utilisateur à bien été supprimé !"}))
    .catch(error => res.status(500).json({ error }));
}

exports.getUser = (req, res, next) => {
    user.findOne({ where: { id: req.params.id }})
    .then(user => res.status(200).json({ user }))
    .catch(error => res.status(500).json({ error }));
}

exports.getUsers = (req, res, next) => {
    user.findAll()
    .then(users => res.status(200).json({ users }))
    .catch(error => res.status(500).json({ error }));
}
