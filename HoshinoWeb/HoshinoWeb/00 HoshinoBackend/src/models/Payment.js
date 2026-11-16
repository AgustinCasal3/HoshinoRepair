const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    paymentId: { type: Number, required: true, unique: true },
    userId: { type: Number, required: true },
    reservationId: { type: Number, required: true },
    productId: { type: Number, required: true },
    amount: { type: Number, required: true },
    paymentType: { type: String, default: 'Seña 5%' },
    billingData: {
        dniOrCuil: { type: String, required: true },
        receiptNumber: { type: String, required: true }
    },
    receiptImages: [{ type: String }],
    status: { type: String, default: 'En Revisión' },
    createdAt: { type: Date, default: Date.now }
}, {
    collection: 'Payments'
});

module.exports = mongoose.model('Payment', paymentSchema);