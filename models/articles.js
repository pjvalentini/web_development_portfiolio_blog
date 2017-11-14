// requiring the jsonfile dependency to read and write the json file.
const jsonfile = require('jsonfile');
// console.log(jsonfile);

// this is the function that is getting the json from the models and reading it.
const get = function(callback) {
	jsonfile.readFile('./models/articles.json', callback);
};

// GET 1 ARTICLE BY ID
const getArticleById = function(id, callback) {
	get((err, list) => {
		callback(err, list.filter(function(article) {
			return article.id === id;
		}).pop());
	});
};


module.exports.get = get;
module.exports.getArticleById = getArticleById;
