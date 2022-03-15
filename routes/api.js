var express = require('express');
var router = express.Router();

/**
 * @type {Array<{recipe_id : string, comments : {user_id: string, content: string}[]}>}
 */
let comments = [];

router.post('/comment/add', function (req, res, next) {
	let { recipe_id, user_id, content } = req.body;
	if (!content) {
		res.status(400).send('No comment provided');
		return;
	}
	let recipeComments = comments.find(
		(comment) => comment.recipe_id === recipe_id
	);
	if (recipeComments) {
		recipeComments.comments.push({ user_id, content });
	} else {
		comments.push({ recipe_id, comments: [{ user_id, content }] });
	}

	res.send('respond with a resource');
});

router.get('/comment/get', function (req, res, next) {
	let { recipe_id } = req.query;
	let recipeComments = comments.find(
		(comment) => comment.recipe_id === recipe_id
	);
	if (recipeComments) {
		res.send(recipeComments.comments);
	} else {
		res.send([]);
	}
});

module.exports = router;
