// NODE
const path = require('path');
require('dotenv').load();
// LIBRARIES
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require("body-parser");
const passport = require('passport');
const fileUpload = require('express-fileupload');
// COMMON
const userRoutes = require('./routes/users');
const tokenRoutes = require('./routes/tokens');
const jwtRoutes = require('./routes/jwt');


  // http server
app.listen( process.env.PORT || 3001, function () {
    
  console.log('Listening on port ' + (process.env.PORT || 3001));
  // Middleware
  // logger
  app.use(morgan('dev'));
  app.use(cors({credentials: true, origin : true}));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, 'public')));
  app.set('trust proxy', 1);
  app.use(passport.initialize());

  app.use(fileUpload());
  require('./auth.js')(passport);
  
  app.options('*', cors())
  // HTTP Routes
  app.use('/users', userRoutes);
  app.use('/tokens', tokenRoutes);
  // Protected routes
  app.use('/jwt', passport.authenticate('jwt', {session: false}), jwtRoutes);
});


