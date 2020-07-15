const path = require('path');
const express = require('express');

// const rootDir = require('../util/path');
const productsController = require('../controllers/products');

const router = express.Router();

router.use('/add-product', productsController.getAddProduct);
//                        ^                      
// res.send('<form action="/admin/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');
// res.sendFile(path.join(rootDir, 'views', 'add-product.html'));


router.post('/product', productsController.postAddProduct);

module.exports = router;