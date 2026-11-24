const express = require('express');
const router = express.Router();
const {
    getDevices,
    getDevicesById,
    getDevicesByUserId
} = require('../controllers/deviceController');

router.get('/', getDevices);
router.get('/:id', getDevicesById);
router.get('/user/:id', getDevicesByUserId);

module.exports = router;