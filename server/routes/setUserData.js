const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../../config');

router.get('/', (req, res) => {

	request(

		// PATCH request to /registration endpoint
		{
			method: 'PATCH',
			uri: `http://localhost:${config.fusionAuthPort}/api/user/registration/${req.query.userID}/${config.applicationID}`,
			headers: {
				'Content-Type': 'application/json',
				'Authorization': config.apiKey
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

module.exports = router;
