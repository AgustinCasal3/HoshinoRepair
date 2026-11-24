const Product = require('../models/Product');

// Obtener TODOS los productos
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener los productos' });
    }
};

// Obtener UN producto por su productId (ej: /api/products/1)
const getProductById = async (req, res) => {
    try {
        const product = await Product.findOne({ productId: req.params.id });
        if (!product) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener el producto' });
    }
};

// Obtener productos filtrados por categoría (ej: /api/products/category/VR)
const getProductsByCategory = async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.category });
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener productos por categoría' });
    }
};

module.exports = {
    getProducts,
    getProductById,
    getProductsByCategory
};