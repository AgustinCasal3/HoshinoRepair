const express = require('express');
const router = express.Router();
const { 
    getProducts, 
    getProductById, 
    getProductsByCategory 
} = require('../controllers/productController');

router.get('/', getProducts);
router.get('/:id', getProductById);
router.get('/category/:category', getProductsByCategory);

module.exports = router;