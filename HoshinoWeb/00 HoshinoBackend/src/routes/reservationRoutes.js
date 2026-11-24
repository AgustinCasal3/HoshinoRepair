const express = require('express');
const router = express.Router();
const { 
    getReservations, 
    getReservationById, 
    getReservationsByUserId 
} = require('../controllers/reservationController');

router.get('/', getReservations);
router.get('/:id', getReservationById);
router.get('/user/:userId', getReservationsByUserId);

module.exports = router;