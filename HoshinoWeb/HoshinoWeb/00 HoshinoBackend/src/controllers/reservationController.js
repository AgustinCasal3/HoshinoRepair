const Reservation = require('../models/Reservation');

// Obtener TODAS las reservas (ordenadas por la más reciente primero)
const getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find().sort({ reservationDate: -1 });
        res.json(reservations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener las reservas' });
    }
};

// Obtener UNA reserva por reservationId (ej: /api/reservations/1)
const getReservationById = async (req, res) => {
    try {
        const reservation = await Reservation.findOne({ reservationId: req.params.id });
        if (!reservation) {
            return res.status(404).json({ mensaje: 'Reserva no encontrada' });
        }
        res.json(reservation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener la reserva' });
    }
};

// Obtener las reservas de un usuario específico (ej: /api/reservations/user/1)
const getReservationsByUserId = async (req, res) => {
    try {
        const reservations = await Reservation.find({ userId: req.params.userId }).sort({ reservationDate: -1 });
        res.json(reservations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener las reservas del usuario' });
    }
};

module.exports = {
    getReservations,
    getReservationById,
    getReservationsByUserId
};