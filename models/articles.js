const jsonfile = require('jsonfile');

// =================================================
// SAVE A NEW ARTICLE
const save = function(data, callback) {
	const regex = /(&nbsp;|<([^>]+)>)/ig;
	const article = {
		// use this to create an ever changing ID
		id: new Date().getTime(), // sets a timestamp as an id...so its always different id.
		title: data.title,
		image: data.url,
		body: data.body,
		description: data.body.replace(regex, "").substr(0, 200),
	};
	get((err, articles) => {
		if (err) {
			return callback(err);
		}
		try {
			articles.push(article);
		} catch (err) {
			return callback(err);
		}
		jsonfile.writeFile('./models/articles.json', articles, { spaces: 2 }, callback);
	});
};

// =================================================
// DELETE AN ARTICLE
const deleteArticleById = function(id, callback) {
	get((err, articles) => {
		if (err) {
			return callback(err);
		}
		for (var index = 0; index < articles.length; index++) {
				 var article = articles[index];
			if (article.id === id) {
						// remove that article from the array
				articles.splice(index, 1);
							// save the articles
				jsonfile.writeFile('./models/articles.json', articles, { spaces: 2 }, callback);
				break;
			}
		}
	});
};


// =================================================
// GET ALL ARTICLES
// read the file and then call the call back function.
const get = function(callback) {
	jsonfile.readFile('./models/articles.json', callback);
};

// =================================================
// GET 1 ARTICLE BY ID
const getArticleById = function(id, callback) {
		// we have a function that gets all the articles already so why no just use that
		// for 1 article though we need to find only the article we want
		// so we'll use the filter function of an array which says
		// return everything from the array where the condition is true.
		// in this case we are saying if the article id matches the id we're searching for
		// then return that article.
		// err passes through...but gets handled in the controller.
	get((err, list) => {
		callback(err, list.filter(function(article) {
			return article.id === id;
		}).pop());
	});
};

module.exports.save = save;
module.exports.get = get;
module.exports.getArticleById = getArticleById;
module.exports.deleteArticleById = deleteArticleById;
