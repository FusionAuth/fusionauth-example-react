const express = require('express');
const router = express.Router();
const config = require('../../config');

router.get('/', (req, res) => {
	//TODO: write this more cleanly... map is not cleaner, and neither is a helper method or module
	res.redirect(`http://localhost:${config.fusionAuthPort}/oauth2/authorize?client_id=${config.clientID}&redirect_uri=${config.redirectURI}&response_type=code`);
});

module.exports = router;
