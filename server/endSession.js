module.exports = (req, res) => {
	res.status(200).clearCookie('JSESSIONID');
	req.session.destroy();
};
