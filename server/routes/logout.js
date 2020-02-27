const express = require('express');
const router = express.Router();
const request = require('request');
const endSession = require('../endSession');
const config = require('../../config');

router.get('/', (req, res) => {

	request(

		// GET request to /logout endpoint
		{
			method: 'GET',
			uri: `http://localhost:${config.fusionAuthPort}/oauth2/logout`,
			qs: `client_id=${config.clientID}`
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

module.exports = router;
