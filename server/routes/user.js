const express = require('express');
const router = express.Router();
const request = require('request');
const endSession = require('../endSession');
const config = require('../../config');

router.get('/', (req, res) => {

	// token in session -> get user data and send it back to the react app
	if (req.session.token) {

		request(

			// POST request to /introspect endpoint
			{
				method: 'POST',
				uri: `http://localhost:${config.fusionAuthPort}/oauth2/introspect`,
				headers: {
					'Content-Type': 'application/json'
				},
				qs: {
					'client_id': config.clientID,
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
							uri: `http://localhost:${config.fusionAuthPort}/api/user/registration/${introspectResponse.sub}/${config.applicationID}`,
							headers: {
								'Authorization': config.apiKey
							}
						},
			
						// callback
						(error, response, body) => {
						
							let registrationResponse = JSON.parse(body);
			
							res.send({
								token: {
									...introspectResponse,
								},
								...registrationResponse
							});
						}
					);
				}

				// expired token -> send nothing 
				else {
					endSession(req, res);
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

module.exports = router;
