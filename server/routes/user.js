const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../../config');

router.get('/', (req, res) => {
  // token in session -> get user data and send it back to the Angular app
  if (req.session.token) {
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

        // valid token -> get more user data and send it back to the Angular app
        request(
          // GET request to /registration endpoint
          {
            method: 'GET',
            uri: `http://localhost:${config.fusionAuthPort}/api/user/registration/${userInfoResponse.sub}/${config.applicationID}`,
            json: true,
            headers: {
              'Authorization': config.apiKey
            }
          },

          // callback
          (error, response, body) => {
            res.send(
              {
                ...userInfoResponse,
                ...body // body is results from the registration endpoint
                
              }
            );
          }
        );
      }
    );
  }

  // no token -> send nothing
  else {
    res.send({});
  }
});

module.exports = router;

