const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productId: { type: Number, required: true, unique: true },
    serial: { type: String },
    name: { type: String, required: true },
    brand: { type: String },
    model: { type: String },
    year: { type: Number },
    type: { type: String },
    category: { type: String },
    condition: { type: String, default: 'Sin Especificar' },
    stock: { type: Number, default: 0 },
    warranty: { type: String },
    pictures: [{ type: String }],
    description: { type: String },
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