const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../../config');

router.post('/', (req, res) => {
  // fetch the user using the token in the session so that we have their ID
  request(
    // POST request to /introspect endpoint
    {
      method: 'POST',
      uri: `http://localhost:${config.fusionAuthPort}/oauth2/introspect`,
      form: {
        'client_id': config.clientID,
        'token': req.session.token
      }
    },

    // callback
    (error, response, body) => {
      let introspectResponse = JSON.parse(body);

      request(
        // PATCH request to /registration endpoint
        {
          method: 'PATCH',
          uri: `http://localhost:${config.fusionAuthPort}/api/user/registration/${introspectResponse.sub}/${config.applicationID}`,
          headers: {
            'Authorization': config.apiKey
          },
          json: true,
          body: {
            'registration': {
              'data': req.body
            }
          }
        }
      );
    }
  );
});

module.exports = router;
