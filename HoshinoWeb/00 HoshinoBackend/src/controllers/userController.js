const User = require('../models/User');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const CAMPOS_PRIVADOS = '-passwordHash -resetCodeHash -resetCodeExpires -resetAttempts -verifyTokenHash -verifyTokenExpires';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS }
});

const hashCodigo = (codigo, user) =>
    crypto.createHash('sha256').update(`${codigo}:${user._id}`).digest('hex');

const hashToken = (token) =>
    crypto.createHash('sha256').update(token).digest('hex');

const getUsers = async (req, res) => {
    try {
        const users = await User.find().select(CAMPOS_PRIVADOS);
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al conseguir los usuarios (userController.js)' });
    }
};

const getUserById = async (req, res) => {
    try {
        const idBuscado = req.params.id;
        const user = await User.findOne({ userId: idBuscado }).select(CAMPOS_PRIVADOS);

        if (!user) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener el usuario (userController.js)' });
    }
};

// ---------- REGISTRO Y VERIFICACIÓN DE EMAIL ----------

// Registrar nuevo usuario y enviar mail con token de 24hs (POST /users/register)
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ mensaje: 'Todos los campos son obligatorios.' });
        }

        if (password.length < 8) {
            return res.status(400).json({ mensaje: 'La contraseña debe tener al menos 8 caracteres.' });
        }

        const emailNormalizado = email.trim().toLowerCase();
        const usuarioExistente = await User.findOne({ email: emailNormalizado });

        // Si ya existe y ya verificó su correo, bloqueamos el registro
        if (usuarioExistente && usuarioExistente.isVerified) {
            return res.status(400).json({ mensaje: 'Ya existe una cuenta registrada con ese correo.' });
        }

        // Generar token aleatorio y su hash para guardar en DB (expira en 24 horas)
        const rawToken = crypto.randomBytes(32).toString('hex');
        const tokenHasheado = hashToken(rawToken);
        const expiracion = new Date(Date.now() + 24 * 60 * 60 * 1000);

        let userToSave;

        if (usuarioExistente && !usuarioExistente.isVerified) {
            // Si se había registrado antes pero nunca activó la cuenta, actualizamos datos y reenviamos token
            usuarioExistente.username = username.trim();
            usuarioExistente.passwordHash = password;
            usuarioExistente.verifyTokenHash = tokenHasheado;
            usuarioExistente.verifyTokenExpires = expiracion;
            userToSave = await usuarioExistente.save();
        } else {
            // Calcular siguiente userId autoincremental
            const lastUser = await User.findOne().sort({ userId: -1 });
            const nextUserId = lastUser ? lastUser.userId + 1 : 1;

            userToSave = new User({
                userId: nextUserId,
                username: username.trim(),
                email: emailNormalizado,
                passwordHash: password,
                isVerified: false,
                verifyTokenHash: tokenHasheado,
                verifyTokenExpires: expiracion
            });
            await userToSave.save();
        }

        const verifyUrl = `${FRONTEND_URL}/verify/${rawToken}`;
        console.log('Link de verificación generado:', verifyUrl);

        // Enviar correo de activación
        try {
            await transporter.sendMail({
                from: `"Hoshino Repair" <${process.env.MAIL_USER}>`,
                to: userToSave.email,
                subject: 'Activá tu cuenta en Hoshino Repair',
                text: `Hola ${userToSave.username},\n\nGracias por registrarte en Hoshino Repair. Para activar tu cuenta, hacé click en el siguiente enlace:\n${verifyUrl}\n\nSi no podés hacer click, pegá este link en tu navegador:\n${verifyUrl}\n\nEl link expirará en 24 horas.\n\n- Hoshino Repair`,
                html: `
                    <div style="font-family: Arial, sans-serif; color: #222; line-height: 1.6;">
                        <p>Hola <strong>${userToSave.username}</strong>,</p>
                        <p>Gracias por registrarte en <strong>Hoshino Repair</strong>. Para activar tu cuenta, hacé click en el siguiente enlace:</p>
                        <p>
                            <a href="${verifyUrl}" style="display: inline-block; padding: 10px 20px; background-color: #d9d9d9; color: #000; text-decoration: none; border-radius: 8px; font-weight: bold;">
                                Activá tu cuenta
                            </a>
                        </p>
                        <p>Si no podés hacer click, pegá este link en tu navegador:<br/>
                        <a href="${verifyUrl}">${verifyUrl}</a></p>
                        <p style="color: #666; font-size: 13px;">El link expirará en 24 horas.</p>
                        <p>- Hoshino Repair</p>
                    </div>
                `
            });
        } catch (mailError) {
            console.error('Error al enviar mail de verificación:', mailError.message);
        }

        res.status(201).json({
            mensaje: 'Usuario registrado. Revisá tu correo electrónico para activar tu cuenta.'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al registrar el usuario.' });
    }
};

// Verificar token del enlace de correo (GET /users/verify/:token)
const verifyUser = async (req, res) => {
    try {
        const { token } = req.params;
        if (!token) {
            return res.status(400).json({ mensaje: 'Token no proporcionado.' });
        }

        const tokenHasheado = hashToken(token);

        const user = await User.findOne({
            verifyTokenHash: tokenHasheado,
            verifyTokenExpires: { $gt: new Date() }
        });

        if (!user) {
            return res.status(400).json({
                mensaje: 'El enlace de verificación es inválido o ya expiró (24 horas).'
            });
        }

        user.isVerified = true;
        user.verifyTokenHash = undefined;
        user.verifyTokenExpires = undefined;
        await user.save();

        res.status(200).json({
            mensaje: '¡Cuenta activada con éxito! Ya podés iniciar sesión.'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error del servidor al verificar la cuenta.' });
    }
};

// ---------- INICIAR SESIÓN ----------

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email.trim().toLowerCase() });
        if (!user) {
            return res.status(404).json({ mensaje: 'El usuario no existe.' });
        }

        // Bloquea el login solo si tiene una verificación pendiente
        if (user.isVerified === false && user.verifyTokenHash) {
            return res.status(403).json({
                mensaje: 'Tu cuenta aún no está activada. Revisá tu correo electrónico.'
            });
        }

        if (user.passwordHash !== password) {
            return res.status(401).json({ mensaje: 'Contraseña incorrecta.' });
        }

        user.lastLogin = new Date();
        await user.save();

        const userObject = user.toObject();
        delete userObject.passwordHash;
        delete userObject.resetCodeHash;
        delete userObject.resetCodeExpires;
        delete userObject.resetAttempts;
        delete userObject.verifyTokenHash;
        delete userObject.verifyTokenExpires;

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

const enviarCodigo = async (user) => {
    const codigo = crypto.randomInt(100000, 1000000).toString();
    console.log(codigo);

    user.resetCodeHash = hashCodigo(codigo, user);
    user.resetCodeExpires = new Date(Date.now() + 10 * 60 * 1000);
    user.resetAttempts = 0;
    await user.save();

    try {
        await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: user.email,
            subject: 'Código para recuperar tu contraseña',
            text: `Tu código es: ${codigo}. Vence en 10 minutos.`
        });
    } catch (error) {
        console.error('No se pudo enviar el mail:', error.message);
    }
};

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

const solicitarCodigo = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) await enviarCodigo(user);

        res.json({ mensaje: 'Si el correo existe, te enviamos un código' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'No se pudo enviar el código' });
    }
};

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

const cambiarPassword = async (req, res) => {
    try {
        const { email, codigo, nuevaContraseña } = req.body;

        if (!nuevaContraseña || nuevaContraseña.length < 8) {
            return res.status(400).json({ mensaje: 'La contraseña debe tener al menos 8 caracteres' });
        }

        const user = await User.findOne({ email });
        const error = await validarCodigo(user, codigo);
        if (error) return res.status(400).json({ mensaje: error });

        user.passwordHash = nuevaContraseña;
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

// Actualizar foto de perfil y guardar las últimas 3 en pictureHistory (PUT /users/:id/picture)
const updateUserPicture = async (req, res) => {
    try {
        const { id } = req.params;
        const { newPicture } = req.body;

        if (!newPicture || typeof newPicture !== 'string') {
            return res.status(400).json({ mensaje: 'Debes enviar una imagen válida.' });
        }

        const user = await User.findOne({ userId: id });
        if (!user) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
        }

        const currentPicture = user.picture;
        let history = Array.isArray(user.pictureHistory) ? [...user.pictureHistory] : [];

        // Si la foto elegida es distinta a la actual, movemos la actual al historial (máximo 3)
        if (currentPicture && currentPicture !== newPicture) {
            history = [
                currentPicture,
                ...history.filter((pic) => pic !== newPicture && pic !== currentPicture)
            ].slice(0, 5);
        }

        user.picture = newPicture;
        user.pictureHistory = history;
        await user.save();

        const userObject = user.toObject();
        delete userObject.passwordHash;
        delete userObject.resetCodeHash;
        delete userObject.resetCodeExpires;
        delete userObject.resetAttempts;
        delete userObject.verifyTokenHash;
        delete userObject.verifyTokenExpires;

        res.status(200).json({
            mensaje: 'Foto de perfil actualizada con éxito.',
            user: userObject
        });
    } catch (error) {
        console.error('Error al actualizar foto de perfil:', error);
        res.status(500).json({ mensaje: 'Error al actualizar la foto de perfil.' });
    }
};

module.exports = {
    getUsers,
    getUserById,
    registerUser,
    verifyUser,
    loginUser,
    solicitarCodigo,
    verificarCodigo,
    cambiarPassword,
    updateUserPicture
};