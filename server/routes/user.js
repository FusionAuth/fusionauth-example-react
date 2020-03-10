const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../../config');

router.get('/', (req, res) => {
  // token in session -> get user data and send it back to the react app
  if (req.session.token) {
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

        // valid token -> get more user data and send it back to the react app
        if (introspectResponse.active) {
          request(
            // GET request to /registration endpoint
            {
              method: 'GET',
              uri: `http://localhost:${config.fusionAuthPort}/api/user/registration/${introspectResponse.sub}/${config.applicationID}`,
              json: true,
              headers: {
                'Authorization': config.apiKey
              }
            },

            // callback
            (error, response, body) => {
              res.send(
                {
                  token: {
                    ...introspectResponse,
                  },
                  ...body
                }
              );
            }
          );
        }

        // expired token -> send nothing
        else {
          req.session.destroy();
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
