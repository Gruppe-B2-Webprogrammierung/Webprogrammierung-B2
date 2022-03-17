// @ts-check
const { Request, Response, NextFunction } = require('express');

/**
 * Tracks how often a user has accessed a route.
 * @type {Array<{user_id: string, pages: {route: string, count: number}[] }>}
 */
let userTrackData = [];

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {void}
 */
function trackUser(req, res, next) {
	if (req.cookies.user_id) {
		const user = userTrackData.find(
			(user) => user.user_id === req.cookies.user_id
		);
		let path = req.originalUrl.slice(
			0,
			req.originalUrl.indexOf(req.path) + req.path.length
		);
		if (user) {
			const page = user.pages.find((page) => page.route === path);
			if (page) {
				page.count++;
			} else {
				user.pages.push({
					route: path,
					count: 1,
				});
			}
		} else {
			userTrackData.push({
				user_id: req.cookies.user_id,
				pages: [
					{
						route: path,
						count: 1,
					},
				],
			});
		}
		return next();
	}
	return next();
}

/**
 * Returns route accesses for a given user.
 * @param {string} user_id
 * @returns {Array<{route: string, count: number}>}
 */
const getDataForUser = (user_id) => {
	const user = userTrackData.find((user) => user.user_id === user_id);
	if (user) {
		return user.pages;
	}
	return [];
};

exports.trackUser = trackUser;
exports.getDataForUser = getDataForUser;
