const express = require("express");
const parser = require("body-parser");
const expressValidator = require('express-validator');
const app = express();
// var articles;

// parses data with the content type of the application JSON
app.use(parser.urlencoded({ extended:false }));
app.use(parser.json());

// Used for input validation - remember assume all input is bad!
// so lets use a tool designed to make sure we're not saving
// anything bad
app.use(expressValidator());

// middleware to serve static assets.
app.use(express.static('public'));

// Sets the view engine to ejs
app.set("view engine", "ejs");

const articlesController = require('./controllers/articles');

// Index page route setup
app.get("/", (req, res) => {
	// Render index.ejs page
	res.render("index");
});

// About Page route setup
app.get("/about", (req, res) => {
	// Render index.ejs page
	res.render("about");
});

// Contact Page route setup
app.get("/contact", (req, res) => {
	// Render index.ejs page
	res.render("contact");
});

// map a route to a function in the controller.
app.get('/blog', articlesController.get);
app.get('/blog/articles', articlesController.get);

// Renders the form
app.get('/blog/articles/create', articlesController.new);

// Changes the state ans posts the new Article.
app.post('/blog/articles/create', articlesController.post);

// to delete in a form we need to use POST, why?
// https://stackoverflow.com/questions/165779/are-the-put-delete-head-etc-methods-available-in-most-web-browsers
app.post('/blog/articles/:id', (request, response) => {
		// if _method == DELETE
		if (request.body._method === 'DELETE') {
			return articlesController.delete(request, response, () => {
				response.redirect('/');
			});
		}
		// we don't support post or put (yet) so just redirect user
		// if anything else
	response.redirect('/');
});

app.delete('/blog/articles/:id', (request, response) => {
	return articlesController.delete(request, response, () => {
	// we're not handling errors
		response.json({ "success": true });
	});
});

app.get('/blog/articles/:id', articlesController.show);

// adding a catch
app.get('*', function(req, res) {
	res.status(404).send('Page not found!');
});

// server setup on localhost:3000.
const server = app.listen(3000, () => {
	console.log('server started on port', server.address().port);
});
