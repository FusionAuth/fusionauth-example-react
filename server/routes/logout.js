const express = require('express');
const router = express.Router();
const config = require('../../config');

router.get('/', (req, res) => {
  // delete the session
  req.session.destroy();

  // end FusionAuth session
  res.redirect(`http://localhost:${config.fusionAuthPort}/oauth2/logout?client_id=${config.clientID}`);
});

module.exports = router;
