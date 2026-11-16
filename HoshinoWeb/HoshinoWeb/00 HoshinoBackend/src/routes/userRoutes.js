const express = require('express');
const router = express.Router();
const { getUsers, getUserById, loginUser, solicitarCodigo, verificarCodigo, cambiarPassword } = require('../controllers/userController');

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/login', loginUser);

// NUEVO: recuperar contraseña
router.post('/recuperar/solicitar', solicitarCodigo);
router.post('/recuperar/verificar', verificarCodigo);
router.post('/recuperar/cambiar', cambiarPassword);

module.exports = router;