const express = require('express');
const router = express.Router();
const { chatWithHoshi } = require('../controllers/chatbotController');

router.post('/', chatWithHoshi);

module.exports = router;