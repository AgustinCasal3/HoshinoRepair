const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: { type: Number, required: true, unique: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    number: { type: Number },
    passwordHash: { type: String, required: true },
    
    // Verificación de cuenta por correo
    isVerified: { type: Boolean, default: false },
    verifyTokenHash: { type: String },
    verifyTokenExpires: { type: Date },

    // Datos temporales para recuperar contraseña
    resetCodeHash: { type: String },
    resetCodeExpires: { type: Date },
    resetAttempts: { type: Number, default: 0 },

    picture: { type: String, default: 'UserPfp01.png' },
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
    collection: 'Users'
});

module.exports = mongoose.model('User', userSchema);