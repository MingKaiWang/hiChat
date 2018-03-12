var express = require('express');
var router = express.Router();

var userInfo = require('../config/userInfo');
router.post('/login', function(req, res) {
 	response = {status: 0}
 	userInfo.userName.push(req.body.name)
 	res.end(JSON.stringify(response))
});

module.exports = router;
