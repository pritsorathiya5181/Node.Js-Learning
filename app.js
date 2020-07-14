const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

app.set('view engine', 'pug'); // 'view engine' use for chnage default engine extension here change default to pug.
app.set('views', 'views'); // here you need to specify path of your views, for that 'views' required.

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); // this express.static use for giving access to specific folder or files


app.use('/admin', adminData.router);
app.use(shopRoutes);

app.use('/', (req, res, next) => {
    // res.status(404).send('<h1>Page not found</h1>');
    // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    res.status(404).render('404', { pageTitle: 'Page Not Found' });
});
// const server = http.createServer(app);
// server.listen(3000);
app.listen(3000);