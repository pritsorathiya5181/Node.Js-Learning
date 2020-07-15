const path = require('path');
const express = require('express');

// const rootDir = require('../util/path');
const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);
//             ^
// console.log('shop.js', adminData.products);
// res.sendFile(path.join(rootDir, 'views', 'shop.html'));

router.get('/products', shopController.getProducts);

router.get('/cart', shopController.getCart);

router.get('/checkout', shopController.getCheckout);

module.exports = router;