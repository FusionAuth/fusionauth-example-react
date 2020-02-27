const express = require('express');
const router = express.Router();
const config = require('../../config');

router.get('/', (req, res) => {
	res.redirect(`http://localhost:${config.clientPort}`);
});

module.exports = router;
