// @ts-check
var express = require('express');
var router = express.Router();
var { nanoid } = require('nanoid');
var { trackUser, getDataForUser } = require('../helper/userTracker');
var { Request, Response, NextFunction } = require('express');

/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
router.get('/', trackUser, function (req, res, next) {
	let user_id = req.cookies.user_id;
	if (!user_id) {
		user_id = nanoid(5);
		res
			.cookie('user_id', user_id, { maxAge: 1000 * 60 * 60 * 24 * 7 })
			.render('index', {
				title: 'Recipes',
				username: user_id,
				userData: getDataForUser(user_id),
			});
	} else {
		res.render('index', {
			title: 'Recipes',
			username: req.cookies.user_id,
			userData: getDataForUser(req.cookies.user_id),
		});
	}
});

module.exports = router;
