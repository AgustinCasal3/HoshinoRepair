const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema({
    claimId: { type: Number, required: true, unique: true },
    userId: { type: Number, required: true },

    // Orden asociada (reparación o compra/reserva)
    orderReference: { type: String, required: true },
    orderType: { type: String, enum: ['reparacion', 'compra', 'otra'], default: 'otra' },
    orderId: { type: Number },

    // Detalles del reclamo
    deviceType: { type: String, required: true },
    reason: { type: String, required: true },
    description: { type: String, required: true, maxlength: 2500 },

    // Archivos adjuntos (imágenes o PDFs guardados en Base64)
    attachments: [{
        name: { type: String },
        mimeType: { type: String },
        dataUrl: { type: String }
    }],

    // Datos de contacto
    contactPhone: { type: String },
    contactEmail: { type: String },
    altPhone: { type: String },
    altEmail: { type: String },

    // Seguimiento y resolución
    status: {
        type: String,
        enum: ['En revisión', 'En proceso', 'Resuelto'],
        default: 'En revisión'
    },
    resolution: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
    resolvedAt: { type: Date, default: null }
}, {
    collection: 'Claims'
});

module.exports = mongoose.model('Claim', claimSchema);