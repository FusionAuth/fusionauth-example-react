const express = require('express');
const session = require('express-session');
const cors = require('cors');
const config = require('../config');

// configure Express app
const app = express();
app.use(session({
	secret: '1234567890',
	resave: false,
	saveUninitialized: false,
	cookie: {
		secure: 'auto',
		httpOnly: true,
		maxAge: 3600000
	}
}));
app.use(cors({
	origin: true,
	credentials: true
}));

// use routes
let routes = [
	'_',
	'login',
	'logout',
	'oauth-callback',
	'set-user-data',
	'user'
];
routes.forEach(route => app.use(`/${route.replace(/^_$/, '')}`, require(`./routes/${route}`)));

// start server
app.listen(config.serverPort, () => console.log(`FusionAuth example app listening on port ${config.serverPort}.`));
