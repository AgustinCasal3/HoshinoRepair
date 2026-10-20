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

// Iniciar sesión (POST)
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Buscar el usuario por email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ mensaje: 'El usuario no existe.' });
        }

        // 2. Verificar la contraseña (por ahora directo con passwordHash)
        if (user.passwordHash !== password) {
            return res.status(401).json({ mensaje: 'Contraseña incorrecta.' });
        }

        // 3. Actualizar la última fecha de login
        user.lastLogin = new Date();
        await user.save();

        // 4. Retornar los datos del usuario sin exponer la contraseña
        const userObject = user.toObject();
        delete userObject.passwordHash;

        res.status(200).json({
            mensaje: 'Inicio de sesión exitoso',
            user: userObject
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al intentar iniciar sesión.' });
    }
};

// No olvides agregarlo al module.exports al final del archivo:
module.exports = {
    getUsers,
    getUserById,
    loginUser // <-- Agregar aquí
};