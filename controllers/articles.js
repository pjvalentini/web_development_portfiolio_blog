const util = require('util');
const articles = require('../models/articles');
const defaultMessage = 'Sorry, cannot find that article.';
const defaultTitle = "PJ's Blog";
// console.log(articles);

const errors = {
	EIO: "Couldn't open file",
	ENODENT: 'Sorry having a problem finding those pesky articles.',
};

module.exports.notFound = function(request, response) {
	return response.render('404', { message: defaultMessage });
};

// ================================================
// (Delete) an article from the model
module.exports.delete = function(request, response, callback) {
	const id = request.params.id;

	articles.deleteArticleById(parseInt(id), function(err, list) { // eslint-disable-line
		if (err) {
			const message = errors[err.code] ? defaultMessage : 'Try again later';

			// make sure we only render once!!! so return
			return response.render('404', { message: message });
		}

		// after delete call the callback function
		callback();
	});
};

// ================================================
// (Get) a list of articles from the model
module.exports.get = function(request, response) {
	articles.get(function(err, list) {
		if (err) {
			// if I get err number 2 then defaultMessage or (:) "Try again later"
			// err 2 (-2 in node) - No Such file in directory...
			const message = err.errno === -2 ? defaultMessage : 'Try again later';

			// make sure we only render once!!! so return
			return response.render('404', { message: message });
		}
		// render the blog.ejs with the articles list and title data.
		response.render('blog', { articles: list, title: defaultTitle });
	});
};

// ================================================
// (Show) 1 article by id and show that article
module.exports.show = function(request, response) {
	const id = request.params.id;

	if (!id) {
		return response.render('404', {message: defaultMessage, title: defaultTitle});
	}

	// use parseInt to convert a string to a number.
	articles.getArticleById(parseInt(id), function(err, article) { // eslint-disable-line
		// here we handle the error passed through in the model.
		if (err) {
			const message = err.errno === -2 ? defaultMessage : 'Try again later';
			return response.render('404', { message: message, title: defaultTitle });
		}

		if (!article || article.length === 0) {
			return response.render('404', { message: defaultMessage, title: defaultTitle });
		}

		response.render('article', {
			article: article,
			title: article.title,
		});
	});
};

// ================================================
// (Post) 1 article
// because all input is assumed bad we want to validate
// and sanitize (clean bad stuff) all input from
// a user or other source. We use the expressValidator for this
module.exports.post = function(request, response) {
	// validate the title
	console.log(request.body)
	request
		.checkBody('title', 'Invalid title')
		// checking to make sure the request is not empty.
		// if empty, show the second arg (fail message);
		.notEmpty();

		// validate the image url
	request.checkBody('url', 'Invalid Image URL')
		.notEmpty();

	// validate the article body
	request.checkBody('body', 'Invalid Article')
		.notEmpty();

	// check if there are errors else all good!!
	request.getValidationResult().then(function(result) {
		if (!result.isEmpty()) {
    	return response.render('new', { title: 'Create new article', errors: result.array() });
		}

		// SANITIZE USER INPUT - ALWAYS!!!!!!
		// rely on the tools of the libraries you're using!
		// title, url, body comes from the new.ejs file (form).
		request.sanitizeBody('title').escape();
		request.sanitizeBody('url').escape();
		request.sanitizeParams('body').escape();

		const input = {
			title: request.body.title,
			url: request.body.url,
			body: request.body.body,
		};

		// save the article!!
		articles.save(input, (err) => {
			if (err) {
				return response.render('new', {
					title: 'Create new article',
					errors: [{ msg: err.message }],
				});
			}
			// redirect to the blog page which has all the articles if success
			response.redirect('/blog');
		});
	});
};

// ================================================
// (Show) 1 article form to create new article
// we wouldn't normally do this cause we assume input
// is very bad and therefore we'd likely want to
// review anything thats saved
module.exports.new = function(request, response) {
	console.log(request.body)
	response.render('new', { title: 'Create new article' });
};
