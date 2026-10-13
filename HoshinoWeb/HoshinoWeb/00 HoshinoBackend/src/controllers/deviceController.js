const Device = require('../models/Device');

const getDevices = async (req, res) => {
    try {
        const devices = await Device.find();
        res.json(devices);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener dispositivos' });
    }
};

const getDevicesById = async (req, res) => {
    try {
        const device = await Device.findOne({ deviceId: req.params.id });
        if (!device) {
            return res.status(404).json({ mensaje: 'Dispositivo no encontrado' });
        }
        res.json(device);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener el dispositivo' });
    }
};

const getDevicesByUserId = async (req, res) => {
    try {
        const devices = await Device.find({ userId: req.params.id });
        if (devices.length === 0) {
            return res.status(404).json({ mensaje: 'El usuario no tiene dispositivos registrados' });
        }
        res.json(devices);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error al obtener los dispositivos del usuario' })
    }
};

module.exports = {
    getDevices,
    getDevicesById,
    getDevicesByUserId
}