const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: { type: Number, required: true, unique: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    number: { type: Number },
    passwordHash: { type: String, required: true },
    picture: { type: String },
    createdAt: { type: Date, default: Date.now },
    lastLogin: { type: Date },
    devices: [{
        deviceId: Number,
        state: String
    }],
    reservations: [{
        reservationId: Number,
        state: String
    }],
    state: { type: Boolean, default: true }
}, {
    // Esto asegura que Mongoose busque en la colección exacta que creaste
    collection: 'Users'
});

module.exports = mongoose.model('User', userSchema);