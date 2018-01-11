var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
	res.render('skills', { title: 'My Portfolio', err: '' });
});




module.exports = router;