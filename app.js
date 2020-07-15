const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
// const expressHbs = require('express-handlebars');

const app = express();

/* this for pug engine*/
///app.set('view engine', 'pug'); // 'view engine' use for chnage default engine extension here change default to pug.
///app.set('views', 'views'); // here you need to specify path of your views, for that 'views' required.

/* this for express handlerbars engine */
// app.engine(
//     'hbs',
//     expressHbs({
//         extname: "hbs",
//         defaultLayout: "main-layout",
//         layoutsDir: "views/layouts/",
//     })
// );
// app.set('view engine', 'hbs');
// app.set('views', 'views');

/* this for ejs engine */
app.set('view engine', 'ejs');
app.set('views', 'views');


const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); // this express.static use for giving access to specific folder or files


app.use('/admin', adminData.router);
app.use(shopRoutes);

app.use('/', (req, res, next) => {
    // res.status(404).send('<h1>Page not found</h1>');
    // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    res.status(404).render('404', {
        pageTitle: 'Page Not Found',
        path:''
    });
});
// const server = http.createServer(app);
// server.listen(3000);
app.listen(3000);