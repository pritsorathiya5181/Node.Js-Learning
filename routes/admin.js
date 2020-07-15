const path = require('path');
const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

const products = [];

router.use('/add-product', (req, res, next) => {
    // res.send('<form action="/admin/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render('add-product', {
        pageTitle: 'Add Product', path: '/admin/add-product',
        activeAddProduct: true,
        productCSS: true,
        formsCSS: true
    });
});

router.post('/product', (req, res, next) => {
    // console.log(req.body);
    products.push({ title: req.body.title });
    res.redirect('/');
});

exports.router = router;
exports.products = products;