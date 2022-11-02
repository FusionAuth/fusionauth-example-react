const express = require('express');
const session = require('express-session');
const cors = require('cors');
const config = require('../config');

const app = express();

// install the JSON middleware for parsing JSON bodies
app.use(express.json());

app.use(cors({
  origin: true,
  credentials: true
}));

// configure sessions
app.use(session(
  {
    secret: '1234567890',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: 'auto',
      httpOnly: true,
      maxAge: 3600000
    }
  })
);

// routes
app.use('/user', require('./routes/user'));
app.use('/login', require('./routes/login'));
app.use('/oauth-callback', require('./routes/oauth-callback'));
app.use('/logout', require('./routes/logout'));
app.use('/set-user-data', require('./routes/set-user-data'));

app.listen(config.serverPort, () => console.log(`FusionAuth example app listening on port ${config.serverPort}.`));

