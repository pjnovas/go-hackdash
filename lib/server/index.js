
import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import passport from 'passport';

import config from 'config';

import _ from 'lib/models';
import auth from 'lib/auth';
import routes from 'lib/routes';
import viewEngine from './viewEngine';

const sessionMaxAge = 7 * 24 * 60 * 60 * 1000; // 7 days in ms
const staticsMaxAge = 365 * 24 * 60 * 60 * 1000; // 1 Year in ms

const app = express();

// view engine setup
app.set('config', config);
app.set('views', 'views');

app.engine('hbs', viewEngine);
app.set('view engine', 'hbs');

app.use(favicon('public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/**
 * User session management via mongodb and express session
 */

const MongoStore = connectMongo(session);

app.use(session({
  secret: app.get('config').session,
  store: new MongoStore({db: app.get('config').db.name, url: app.get('config').db.url}),
  cookie: { maxAge: sessionMaxAge, path: '/' },
  resave: false,
  saveUninitialized: false
}));


/**
 * PassportJS initialization
 */

app.use(passport.initialize());
app.use(passport.session());


app.use(express.static('public', { maxAge: staticsMaxAge }));

/*
 * Authentication related routes
 */

app.use('/', auth);

/*
 * Route handlers. Each `section` of the hackdash provide their own router
 * The main app is in charge only of mounting the routers.
 */

app.use('/', routes);

// catch 404 and forward to error handler
app.use( (req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use( (err, req, res, next) => {
    console.dir(err);
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use( (err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


export default app;
