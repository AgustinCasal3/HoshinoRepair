const express = require('express');
const router = express.Router();
const {
    getUsers,
    getUserById,
    registerUser,
    verifyUser,
    loginUser,
    solicitarCodigo,
    verificarCodigo,
    cambiarPassword,
    updateUserPicture
} = require('../controllers/userController');

router.get('/', getUsers);
router.post('/register', registerUser);
router.get('/verify/:token', verifyUser);
router.post('/login', loginUser);

// Recuperar contraseña
router.post('/recuperar/solicitar', solicitarCodigo);
router.post('/recuperar/verificar', verificarCodigo);
router.post('/recuperar/cambiar', cambiarPassword);

router.put('/:id/picture', updateUserPicture);
router.get('/:id', getUserById);

module.exports = router;