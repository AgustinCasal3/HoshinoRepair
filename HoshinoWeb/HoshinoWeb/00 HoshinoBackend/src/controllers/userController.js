const User = require('../models/User');

// NUEVO
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// NUEVO: campos que nunca deben salir hacia el frontend
const CAMPOS_PRIVADOS = '-passwordHash -resetCodeHash -resetCodeExpires -resetAttempts';

// NUEVO
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS }
});

// NUEVO: hashea el código para no guardarlo en texto plano
const hashCodigo = (codigo, user) =>
    crypto.createHash('sha256').update(`${codigo}:${user._id}`).digest('hex');

const getUsers = async (req, res) => {
    try {
        const users = await User.find().select(CAMPOS_PRIVADOS); // CAMBIO: antes User.find()
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al conseguir los usuarios (userController.js)'});
    }
};

const getUserById = async (req, res) => {
    try {
        const idBuscado = req.params.id;

        const user = await User.findOne({ userId: idBuscado }).select(CAMPOS_PRIVADOS); // CAMBIO

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

        // NUEVO
        delete userObject.resetCodeHash;
        delete userObject.resetCodeExpires;
        delete userObject.resetAttempts;

        res.status(200).json({
            mensaje: 'Inicio de sesión exitoso',
            user: userObject
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al intentar iniciar sesión.' });
    }
};

// ---------- RECUPERAR CONTRASEÑA ----------

// Genera, guarda y envía un código nuevo
const enviarCodigo = async (user) => {
    const codigo = crypto.randomInt(100000, 1000000).toString();

    console.log(codigo);

    user.resetCodeHash = hashCodigo(codigo, user);
    user.resetCodeExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutos
    user.resetAttempts = 0;
    await user.save();

    try{

        await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: user.email,
            subject: 'Código para recuperar tu contraseña',
            text: `Tu código es: ${codigo}. Vence en 10 minutos.`
        });
    }catch(error){
        console.error('No se pudo enviar el mail:', error.message); // CAMBIO: ya no rompe el flujo
    }
};

// Devuelve un mensaje de error, o null si el código es válido
const validarCodigo = async (user, codigo) => {
    if (!user || !user.resetCodeHash || !user.resetCodeExpires) return 'Código inválido';
    if (user.resetCodeExpires < new Date()) return 'El código venció, solicitá uno nuevo';
    if (user.resetAttempts >= 5) return 'Demasiados intentos, solicitá un código nuevo';

    if (hashCodigo(String(codigo), user) !== user.resetCodeHash) {
        user.resetAttempts += 1;
        await user.save();
        return 'Código incorrecto';
    }
    return null;
};

// Pantalla 1 y botón "Reenviar código" (POST /users/recuperar/solicitar)
const solicitarCodigo = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) await enviarCodigo(user);

        // Misma respuesta exista o no el correo, para no revelar qué mails están registrados
        res.json({ mensaje: 'Si el correo existe, te enviamos un código' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'No se pudo enviar el código' });
    }
};

// Pantalla 2 (POST /users/recuperar/verificar)
const verificarCodigo = async (req, res) => {
    try {
        const { email, codigo } = req.body;
        const user = await User.findOne({ email });

        const error = await validarCodigo(user, codigo);
        if (error) return res.status(400).json({ mensaje: error });

        res.json({ mensaje: 'Código correcto' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error del servidor' });
    }
};

// Pantalla 3 (POST /users/recuperar/cambiar)
const cambiarPassword = async (req, res) => {
    try {
        const { email, codigo, nuevaContraseña } = req.body;

        if (!nuevaContraseña || nuevaContraseña.length < 8) {
            return res.status(400).json({ mensaje: 'La contraseña debe tener al menos 8 caracteres' });
        }

        const user = await User.findOne({ email });
        const error = await validarCodigo(user, codigo);
        if (error) return res.status(400).json({ mensaje: error });

        // Se guarda igual que lo compara loginUser (texto plano por ahora)
        user.passwordHash = nuevaContraseña;

        // El código ya se usó: se borra
        user.resetCodeHash = undefined;
        user.resetCodeExpires = undefined;
        user.resetAttempts = 0;
        await user.save();

        res.json({ mensaje: 'Contraseña actualizada' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error del servidor' });
    }
};

// No olvides agregarlo al module.exports al final del archivo:
module.exports = {
    getUsers,
    getUserById,
    loginUser,
    solicitarCodigo,   // NUEVO
    verificarCodigo,   // NUEVO
    cambiarPassword    // NUEVO
};