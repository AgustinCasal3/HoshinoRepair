const User = require('../models/User');

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al conseguir los usuarios (userController.js)'});
    }
};

const getUserById = async (req, res) => {
    try {
        const idBuscado = req.params.id;

        const user = await User.findOne({ userId: idBuscado });

        if (!user) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado'});
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener el usuario (userController.js)'});
    }
};

module.exports = {
    getUsers,
    getUserById
};