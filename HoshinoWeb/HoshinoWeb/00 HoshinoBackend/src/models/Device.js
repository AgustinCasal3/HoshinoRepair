const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    deviceId: { type: Number, required: true, unique: true },
    userId: { type: Number, required: true },
    serial: { type: String, required: true },
    name: { type: String, required: true },
    brand: { type: String },
    model: { type: String },
    year: { type: Number },
    type: { type: String },
    pictures: [{ type: String }],
    description: { type: String },
    specs: [{
        part: String,
        model: String
    }],
    revisions: [{
        date: { type: Date, default: Date.now },
        info: [{
            text: String,
            state: String
        }]
    }],
    budget: [{
        amount: Number,
        text: String,
        approved: Boolean
    }],
    totalCost: { type: Number, default: 0 },
    paymentStatus: { type: String, default: 'Pendiente' },
    state: { type: String, default: 'En Reparacion' }
}, {
    collection: 'Devices'
});

module.exports = mongoose.model('Device', deviceSchema);