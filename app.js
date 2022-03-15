// @ts-check
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { handlebars } = require('hbs');

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');
var recipeRouter = require('./routes/recipe');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/recipe', recipeRouter);

app.use(function (req, res, next) {
	next(createError(404));
});

app.use(function (err, req, res, next) {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	res.status(err.status || 500);
	res.render('error');
});

/**
 * Handlebars helper to sum two numbers
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
handlebars.registerHelper('sum', (a, b) => {
	return a + b;
});

/**
 * Handlebars helper to concat two strings
 * @param {string} a
 * @param {string} b
 * @returns {string}
 */
handlebars.registerHelper('stringConcat', (a, b) => {
	return a.concat(b);
});

module.exports = app;
