const express = require("express");
const parser = require("body-parser");
const app = express();
// var articles;

// parses data with the content type of the application JSON
app.use(parser.urlencoded({ extended:false }));
app.use(parser.json());

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

// blog homepage route
app.get('/bloghome', articlesController.get);

// blog post page route
app.get("/blogpost/:id", articlesController.show);

// blog post submit route (building the code for this route...)
app.get("/blogpost/:id/submit", articlesController.show);

// adding a catch
app.get('*', function(req, res) {
	res.status(404).send('Page not found!');
});

// server setup on localhost:3000.
const server = app.listen(3000, () => {
	console.log('server started on port', server.address().port);
});
