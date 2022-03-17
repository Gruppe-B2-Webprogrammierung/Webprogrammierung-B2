// @ts-check
var express = require('express');
var router = express.Router();
const fs = require('fs');
var { trackUser } = require('../helper/userTracker');
var { Request, Response, NextFunction } = require('express');
const recipes = JSON.parse(fs.readFileSync('recipes.json', 'utf8'));

/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
router.get('/', trackUser, function (req, res, next) {
	res.render('recipe', { title: 'Express' });
});

/**
 * @param {Request} req
 * @param {Response} res
 */
router.get('/search', trackUser, (req, res) => {
	if (req.query.q)
		res.render('searchResults', {
			title: 'Search',
			recipes: recipes.filter((recipe) => recipe.title.includes(req.query.q)),
		});
	else res.render('searchResults', { title: 'Search', recipes: recipes });
});

/**
 * @param {Request} req
 * @param {Response} res
 */
router.get('/:id', trackUser, function (req, res) {
	const id = req.params.id;
	const recipe = recipes.find((recipe) => recipe.id === id);
	if (!recipe) res.status(404).send('Recipe not found');
	res.render('recipe', {
		title: recipe.title,
		recipe,
	});
});

module.exports = router;
