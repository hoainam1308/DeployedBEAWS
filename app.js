var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const session = require('express-session');
const { Issuer, generators } = require('openid-client');
const { checkAuth } = require('./middlewares/auth');
require('dotenv').config();

const dbURI = process.env.DB_URI ;
mongoose.connect(dbURI).then(() => {
  console.log("MongoDB connected successfully");
}).catch(err => {
  console.error("MongoDB connection error:", err);
});
const secret_key = process.env.JWT_SECRET;
var indexRouter = require('./routes/index');

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(secret_key));
app.use('/uploads', express.static('uploads'));
app.use(express.static('public'));

const frontendUrl = process.env.FRONTEND_URL;
app.use(cors({
  origin: frontendUrl,
  credentials: true
}));

// let client;
// // Initialize OpenID Client
// async function initializeClient() {
//     const issuer = await Issuer.discover('https://cognito-idp.us-east-1.amazonaws.com/us-east-1_DAP3gJdIm');
//     client = new issuer.Client({
//         client_id: '3v5gq6j34837lgtv9ae22qhb6m',
//         client_secret: '1nq72t1not5unamkspm64ul2rraqsr08g75okjj9ld519okm275',
//         redirect_uris: ['http://localhost:3000/callback'],
//         response_types: ['code']
//     });
// };
// initializeClient().catch(console.error);

// app.use(session({
//     secret: 'some secret',
//     resave: false,
//     saveUninitialized: false
// }));

// app.get('/', checkAuth, (req, res) => {
//     res.render('home', {
//         isAuthenticated: req.isAuthenticated,
//         userInfo: req.session.userInfo
//     });
// });

// app.get('/login', (req, res) => {
//     const nonce = generators.nonce();
//     const state = generators.state();

//     req.session.nonce = nonce;
//     req.session.state = state;

//     const authUrl = client.authorizationUrl({
//         scope: 'phone openid email',
//         state: state,
//         nonce: nonce,
//     });

//     res.redirect(authUrl);
// });

// app.get('callback', async (req, res) => {
//     try {
//         const params = client.callbackParams(req);
//         const tokenSet = await client.callback(
//             'http://localhost:3000/callback',
//             params,
//             {
//                 nonce: req.session.nonce,
//                 state: req.session.state
//             }
//         );

//         const userInfo = await client.userinfo(tokenSet.access_token);
//         req.session.userInfo = userInfo;

//         res.redirect('/');
//     } catch (err) {
//         console.error('Callback error:', err);
//         res.redirect('/');
//     }
// });

// app.get('/logout', (req, res) => {
//     req.session.destroy();
//     const logoutUrl = `https://<user pool domain>/logout?client_id=3v5gq6j34837lgtv9ae22qhb6m&logout_uri=<logout uri>`;
//     res.redirect(logoutUrl);
// });

app.use('/', indexRouter);
app.use('/auths', require('./routes/auths')); // Ensure this line is added to use the auths route
app.use('/users', require('./routes/users'));
app.use('/roles', require('./routes/roles')); // Ensure this line is added to use the roles route
app.use('/orders', require('./routes/orders')); // Ensure this line is added to use the orders route
app.use('/vnpay', require('./routes/vnpay')); // Ensure this line is added to use the vnpay route
app.use('/categories', require('./routes/categories')); // Ensure this line is added to use the categories route
app.use('/products', require('./routes/products')); // Ensure this line is added to use the
console.log("App is loaded");


module.exports = app;
