const path = require('path');
const express = require('express');

// const rootDir = require('../util/path');
const productsController = require('../controllers/products');

const router = express.Router();

router.get('/', productsController.getProducts);
//             ^
// console.log('shop.js', adminData.products);
// res.sendFile(path.join(rootDir, 'views', 'shop.html'));
module.exports = router;