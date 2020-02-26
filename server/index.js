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
const applicationID = '5603c20d-3e32-4971-b7eb-8e9f023fc524';
const apiKey = 'gojIS0unvaFpHKXzCIjz95DtbSmLZFBS4cQYT8Our7g';

const clientPort = 8080;
const serverPort = 9000;
const fusionAuthPort = 9011;

function endSession(req, res) {
	res.status(200).clearCookie('JSESSIONID');
	req.session.destroy();
}

app.get('/', (req, res) => {
	res.redirect(`http://localhost:${clientPort}`);
});

app.get('/login', (req, res) => {
	//TODO: write this more cleanly... map is not cleaner, and neither is a helper method or module
	res.redirect(`http://localhost:${fusionAuthPort}/oauth2/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=code`);
});

app.get('/oauth-redirect', (req, res) => {

	request(

		// POST request to /token endpoint
		{
			method: 'POST',
			uri: 'http://localhost:9011/oauth2/token',
			headers: {
				'Content-Type': 'application/json'
			},
			qs: {
				'client_id': clientID,
				'client_secret': clientSecret,
				'code': req.query.code,
				'grant_type': 'authorization_code',
				'redirect_uri': redirectURI
			}
		},

		// callback
		(error, response, body) => {

			// save token to session
			req.session.token = JSON.parse(body).access_token;

			// redirect to root
			res.redirect('/');
		}
	);
});

app.get('/logout', (req, res) => {

	request(

		// GET request to /logout endpoint
		{
			method: 'GET',
			uri: 'http://localhost:9011/oauth2/logout',
			qs: `client_id=${clientID}`
		},

		// callback
		(error, response, body) => {

			// clear cookie and session (otherwise, FusionAuth will remember the user)
			endSession(req, res);

			// redirect to root
			res.redirect('/');
		}
	);
});


//TODO: clean up this mess
app.get('/user', (req, res) => {

	// token in session -> get user data and send it back to the react app
	if (req.session.token) {

		request(

			// POST request to /introspect endpoint
			{
				method: 'POST',
				uri: 'http://localhost:9011/oauth2/introspect',
				headers: {
					'Content-Type': 'application/json'
				},
				qs: {
					'client_id': clientID,
					'token': req.session.token
				}
			},

			// callback
			(error, response, body) => {

				let introspectResponse = JSON.parse(body);

				// valid token -> get more user data and send it back to the react app
				if (introspectResponse.active) {

					request(

						// GET request to /registration endpoint
						{
							method: 'GET',
							uri: `http://localhost:9011/api/user/registration/${introspectResponse.sub}/${applicationID}`,
							headers: {
								'Authorization': apiKey
							}
						},
			
						// callback
						(error, response, body) => {
						
							let registrationResponse = JSON.parse(body);
			
							res.send({...introspectResponse, ...registrationResponse});
						}
					);
				}

				// expired token -> send nothing 
				else {
					endSession(req, res); //TODO: should we really clear cookies here?
					res.send({});
				}
			}
		);
	}

	// no token -> send nothing
	else {
		res.send({});
	}
});

app.get('/setUserData', (req, res) => {

	request(

		// PATCH request to /registration endpoint
		{
			method: 'PATCH',
			uri: `http://localhost:9011/api/user/registration/${req.query.userID}/${applicationID}`,
			headers: {
				'Content-Type': 'application/json',
				'Authorization': apiKey
			},
			//TODO: why does qs not work with PATCH?
			body: JSON.stringify( {
				"registration": {
					'data': {
						'userData': req.query.userData
					}
				}
			})
		},

		// callback
		(error, response, body) => {
			res.send(JSON.parse(body).registration.data.userData);
		}
	);
});

app.listen(serverPort, () => console.log(`FusionAuth example app listening on port ${serverPort}.`));
