const express = require('express');
const router = express.Router();
const config = require('../../config');
const pkce = require('../helpers/pkce');

router.get('/', (req, res) => {
  // Generate and store the PKCE verifier
  req.session.verifier = pkce.generateVerifier();

  // Generate the PKCE challenge
  const challenge = pkce.generateChallenge(req.session.verifier);

  // Redirect the user to log in via FusionAuth
  res.redirect(`http://localhost:${config.fusionAuthPort}/oauth2/authorize?client_id=${config.clientID}&redirect_uri=${config.redirectURI}&response_type=code&code_challenge=${challenge}&code_challenge_method=S256`);
});

module.exports = router;
