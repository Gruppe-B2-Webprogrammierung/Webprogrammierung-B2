var express = require('express');
var router = express.Router();

/**
 * @type {Array<{recipe_id : string, comments : {user_id: string, content: string}[]}>}
 */
let comments = [];

router.post('/comment/add', function (req, res, next) {
	let { recipe_id, user_id, content } = req.body;
	console.log(req.body);
	res.send('respond with a resource');
});

module.exports = router;
