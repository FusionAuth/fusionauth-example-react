const express = require('express');
const session = require('express-session');
const request = require('request');
const cors = require('cors');

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

//TODO: move these to .env
const clientID = "5603c20d-3e32-4971-b7eb-8e9f023fc524";
const clientSecret = "viCMOPW73hlUVyE4ja_sOdL5rGEU4GuVFY_yuy8rJ7A";
const redirectURI = "http://localhost:9000/oauth-redirect";

const clientPort = 8080;
const serverPort = 9000;
const fusionAuthPort = 9011;

app.get('/', (req, res) => {
	res.redirect(`http://localhost:${clientPort}`);
});

app.get('/login', (req, res) => {
	res.redirect(`http://localhost:${fusionAuthPort}/oauth2/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=code`);
	// request(
	// 	{
	// 		method: 'POST',
	// 		uri: `http://localhost:${fusionAuthPort}/oauth2/authorize`,
	// 		headers: {
	// 			'content-type': 'application/x-www-form-urlencoded',
	// 		},
	// 		qs: {
	// 			'client_id': clientID,
	// 			'redirect_uri': redirectURI,
	// 			'response_type': 'code'
	// 		}
	// 	},
	// 	(error, response, body) => {
	// 		res.render(body);
	// 	}
	// );
});

app.get('/oauth-redirect', (req, res) => {
	res.send('returned from FusionAuth');
});

app.get('/logout', (req, res) => {

});

app.listen(serverPort, () => console.log(`Example app listening on port ${serverPort}.`));
