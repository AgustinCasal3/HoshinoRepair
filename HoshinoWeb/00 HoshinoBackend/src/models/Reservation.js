const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    reservationId: { type: Number, required: true, unique: true },
    userId: { type: Number, required: true },
    productId: { type: Number, required: true },
    productData: {
        name: { type: String, required: true },
        picture: { type: String }
    },
    status: { type: String, default: 'PENDIENTE' },
    reservationDate: { type: Date, default: Date.now },
    timeline: [{
        date: { type: Date, default: Date.now },
        text: String
    }],
    pickupDate: { type: Date },
    pricing: {
        totalPrice: { type: Number, required: true },
        deposit: { type: Number, required: true },
        remaining: { type: Number, required: true }
    },
    billingData: {
        clientName: String,
        cuil: String
    },
    receipts: [{ type: String }]
}, {
    collection: 'Reservations'
});

module.exports = mongoose.model('Reservation', reservationSchema);