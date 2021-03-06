// function handles the click when I delete a post.
function handleBodyClick(e) {
	// if the delete button clicked
	if (event.target.getAttribute('data-action') === 'delete') {
		const id = event.target.getAttribute('data-id');
		deleteArticleById(id, event.target.parentElement);
	}
}

// we're not handling errors in this test
function deleteArticleById(id, elem) {
	elem.classList.add('fade');

	setTimeout(function() {
		fetch('/articles/' + id, { method: 'DELETE' }).then(function() { // here is the issue!
			// this says delete the article and take 1 sec to fade.
			// fades out and removes it from the DOM.
			elem.parentElement.removeChild(elem);
		});
	}, 1000);
}

document.addEventListener('DOMContentLoaded', function() {
	document.body.addEventListener('click', handleBodyClick);
});
