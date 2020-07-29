const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

// const expressHbs = require('express-handlebars');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

const errorController = require('./controllers/error');
const User = require('./models/user');

const MONGO_URI = 'mongodb+srv://prit123:prit123@cluster0.zfu4j.mongodb.net/shop?retryWrites=true&w=majority';


const app = express();
const store = new MongoDBStore({
    uri: MONGO_URI,
    collection: 'sessions',
});

const csrfProtrction = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');


const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); // this express.static use for giving access to specific folder or files
app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
}));

app.use(csrfProtrction);
app.use(flash());

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
        .then(user => {
            if (!user) {
                return next();
            }
            req.user = user;
            next();
        })
        .catch(err => {
            // console.log(err)
            next(new Error(err))
        });
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.get('/500', errorController.get500);
app.use('/', errorController.get404);
//error-middleware has four arguments (extra error arg.)
app.use((error, req, res, next) => {
    console.log(error);
    // res.redirect('/500');
    res.status(500).render('500', {
        pageTitle: 'Error!',
        path: '/500',
        isAuthenticated: req.session.isLoggedIn
    });
})

mongoose.connect(MONGO_URI)
    .then(result => {
        console.log('connected');
        app.listen(3000);
    })
    .catch(err => console.log(err))