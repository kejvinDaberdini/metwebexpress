//kejvin daberdini 20021403
'use strict';

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const moment = require('moment');   
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const userDao = require('./models/user-dao.js');
const indexRouter = require('./routes/index');        
const episodesRouter = require('./routes/episodes');
const episodeRouter  = require('./routes/episode');
const sessionsRouter = require('./routes/sessions');
const registerRouter = require('./routes/register');
const dashboardRouter = require('./routes/dashboard');
const homepageRouter = require('./routes/homepage');
const searchRouter = require('./routes/search');
const favoriteRouter = require('./routes/favorite');
const followRouter = require('./routes/follow');
const commentRouter = require('./routes/comment');
const podcastRouter = require('./routes/podcast');
const purchaseRouter= require('./routes/purchase');
const methodOverride = require('method-override');    //i used this middleware to launch DEL and PUT requestes from HTML, since HTML5 doesn't have native support for all CRUD operations
const flash = require('connect-flash');               //i used this middleware for easier errors validation.

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));       //linked the folders i use for image storage,
app.use('/audiofiles', express.static(path.join(__dirname, 'audiofiles'))); //linked the folders i use for audio storage, 
app.use(methodOverride('method'));
app.use(flash());

// set up the "username and password" login strategy
// by setting a function to verify username and password
passport.use(new LocalStrategy(
  function(username, password, done) {
    userDao.getUser(username, password).then(({user, check}) => {
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!check) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    })
  }
));

// serialize and de-serialize the user (user object <-> session)
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  userDao.getUserById(id).then(user => {
    done(null, user);
  });

});

// set up the session
app.use(session({
  //store: new FileStore(), // by default, Passport uses a MemoryStore to keep track of the sessions - if you want to use this, launch nodemon with the option: --ignore sessions/
  secret: 'a secret sentence not to share with anybody and anywhere, used to sign the session ID cookie',
  resave: false,
  saveUninitialized: false 
}));

// init passport
app.use(passport.initialize());
app.use(passport.session());

const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated())
    next();
  else
    res.redirect('/login');
}


// define default variables for the views
app.use(function (req, res, next) {
  app.locals.moment = moment;
  app.locals.title = '';
  app.locals.message = '';
  app.locals.active = '';
  next();
});

app.use('/',  indexRouter);
app.use('/',  registerRouter);
app.use('/',  sessionsRouter);
app.use('/',  podcastRouter);
app.use('/',  episodesRouter);
app.use('/',  episodeRouter);
app.use('/',  searchRouter);
app.use('/',  favoriteRouter);
app.use('/',  followRouter);
app.use('/',  commentRouter);
app.use('/',  isLoggedIn, purchaseRouter);
app.use('/',  isLoggedIn, dashboardRouter);
app.use('/',  isLoggedIn, homepageRouter);




// catch 404 and forward to error handler

app.use('/', function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
