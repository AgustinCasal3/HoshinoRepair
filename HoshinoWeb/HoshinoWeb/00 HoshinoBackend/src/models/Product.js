const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productId: { type: Number, required: true, unique: true },
    serial: { type: String },
    name: { type: String, required: true },
    brand: { type: mongoose.Schema.Types.Mixed }, // <-- Permite tanto un texto ('Valve') como un array (['Asus', 'Nvidia'])
    model: { type: String },
    year: { type: Number },
    type: { type: String },
    category: { type: String },
    condition: { type: String, default: 'Nuevo' },
    stock: { type: Number, default: 0 },
    warranty: { type: String },
    pictures: [{ type: String }],
    description: { type: mongoose.Schema.Types.Mixed }, // <-- Aprovechamos para permitir texto o array de párrafos
    specs: [{
        part: String,
        model: String
    }],
    price: { type: Number, required: true },
    state: { type: String, default: 'Disponible' }
}, {
    collection: 'Products'
});

module.exports = mongoose.model('Product', productSchema);