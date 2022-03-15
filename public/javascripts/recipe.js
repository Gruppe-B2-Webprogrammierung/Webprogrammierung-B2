// @ts-check
import { getCookie } from 'cookie';
const form = document.querySelector('form');

const submitComment = (event) => {
	console.log(event);
	event.preventDefault();
	const comment = event.target.comment.value;
	const recipe_id = event.target.recipe_id.value;
	const user_id = getCookie('user_id');
	const commentObj = {
		recipe_id,
		user_id,
		content: comment,
	};
	fetch('/api/comment/add', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(commentObj),
	});
};

form.onsubmit = submitComment;
