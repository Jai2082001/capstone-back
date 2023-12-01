const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const cors = require('cors');
// this package is used to protect against csrf attacks the logic of the protection is that with every post request a token needs to be there which we would check first if there isnt then there would be error

// to do this we need to pass token to every view so that with every post request we would have the token attached to it 

// doing this is bit cumbersome so we would attach the data with locals locals allow us to attach data for every view example given below
const flash = require('connect-flash');
// now to show userfeedback we are going to use connect-flash package 
//imagine that we are logging in and we put in the wrong email but we know that after we click the button by clicking the button we generated new request which means that we cannot save anything from previous request so now we need something which travels through request which can be session or cookies also we need to delete the message immediately after its used cause then everytime a user trying to use the login page would get the same error again and again
// connect-flash uses session behind the scenes

// const errorController = require('./controllers/error');
// const User = require('./models/user');

const MONGODB_URI =
  'mongodb://127.0.0.1:27017/authenticateMethods';

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

app.use(bodyParser.json({limit: '100mb'}));

app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));

app.use(cors());

app.set('view engine', 'ejs');
app.set('views', 'views');

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/userend');
const orRoutes = require(`./routes/or`);



const csrfProtector = csrf();

app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);
// as csrf and flash need the session to work we need to execute after the session is initalized
// app.use(csrfProtector);
// app.use(flash());

// app.use((req, res, next) => {
//   if (!req.session.user) {
//     return next();
//   }
//   User.findById(req.session.user._id)
//     .then(user => {
//       req.user = user;
//       next();
//     })
//     .catch(err => console.log(err));
// });


// app.use((req, res, next)=>{
//   console.log('asds')
//   res.locals.isAuthenticated = req.session.isLoggedIn;
//   // res.locals.csrfToken = req.csrfToken()
//   next()
// })


// app.use('/admin', adminRoutes);
app.use(authRoutes);
app.use(adminRoutes)
app.use(userRoutes);
app.use(orRoutes);
// app.use(errorController.get404);

mongoose
  .connect(MONGODB_URI)
  .then(result => {
    console.log('Letssee')
    app.listen(3001);
  })
  .catch(err => {
    console.log('Some Error has Occured');
  });
