// @ts-nocheck
var express = require('express');
var router = express.Router();
var fs = require('fs');

/** @type {{recipe_id : string, comments : {user_id: string, content: string}[]}[]} */
let comments = [];
/** @type {{user_id: string, favorites: string[]}[]} */
let favorites = [];

const recipesData = JSON.parse(fs.readFileSync('recipes.json', 'utf8'));

router.post('/comment/add', (req, res, next) => {
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

	res.status(200).send();
});

router.get('/comment/get', (req, res, next) => {
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

router.get('/favorite/get', (req, res) => {
	let { user_id } = req.query;
	let userFavorites = favorites.find(
		(favorite) => favorite.user_id === user_id
	);
	if (userFavorites) {
		res.send(userFavorites.favorites);
	} else {
		res.send([]);
	}
});

router.post('/favorite/add', (req, res) => {
	let { user_id, recipe_id } = req.query;
	let userFavorites = favorites.find(
		(favorite) => favorite.user_id === user_id
	);
	if (userFavorites) {
		userFavorites.favorites.push(recipe_id);
	} else {
		favorites.push({ user_id, favorites: [recipe_id] });
	}
	res.status(200).send();
});

router.get('/recipe/get', (req, res) => {
	let { recipe_id } = req.query;
	if (!recipe_id) {
		let { recipe_ids } = req.body;
		if (!recipe_ids) {
			res.status(400).send('No recipe id provided');
			return;
		}
		let recipes = recipe_ids.map((recipe_id) => {
			return recipesData.find((recipe) => recipe.id === recipe_id);
		});
		res.send(recipes);
	} else {
		const recipe = recipesData.find((recipe) => recipe.id === recipe_id);
		if (!recipe) res.status(404).send('Recipe not found');
		res.send(recipe);
	}
});

module.exports = router;
