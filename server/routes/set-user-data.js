const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../../config');

router.post('/', (req, res) => {
  // fetch the user using the token in the session so that we have their ID
  request(
    {
      method: 'GET',
      uri: `http://localhost:${config.fusionAuthPort}/oauth2/userinfo`,
      headers: {
        'Authorization': 'Bearer ' + req.session.token
      }
    },

    // callback
    (error, response, body) => {
      let userInfoResponse = JSON.parse(body);
      request(
        // PATCH request to /registration endpoint
        {
          method: 'PATCH',
          uri: `http://localhost:${config.fusionAuthPort}/api/user/registration/${userInfoResponse.sub}/${config.applicationID}`,
          headers: {
            'Authorization': config.apiKey
          },
          json: true,
          body: {
            'registration': {
              'data': req.body
            }
          }
        },
        (err2, response2, body2) => {
          if (err2) {
            console.log(err2);
          }
        }
      );
    }
  );
});

module.exports = router;

