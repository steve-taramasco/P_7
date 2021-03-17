const messageService = require('../services/message');
const models      = require('../models');

exports.createMessage = (req, res, next) => {
    messageService.createMessage(req)
    .then(message => res.status(201).json({ message }))
    .catch(error => res.status(400).json({ error: error.message }));
};

exports.getMessage = (req, res, next) => {
    messageService.getMessage(req.params.id)
    .then(message => res.status(200).json({ message }))
    .catch(error => res.status(404).json({ error: error.message }));
};

exports.deleteMessage = (req, res, next) => {
    models.Message.destroy({ where: { id: req.params.id }})
    .then(() => res.status(200).json({ message: "le message à été supprimé !"}))
    .catch(error => res.status(400).json({ error }));
}

exports.getMessages = (req, res, next) => {
    messageService.getMessages(req)
    .then(messages => res.status(200).json({ messages }))
    .catch(error => res.status(400).json({ error: error.message }));
};