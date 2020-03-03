module.exports = (req, res) => {
	res.clearCookie('JSESSIONID');
	req.session.destroy();
};
