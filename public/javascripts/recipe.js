// @ts-nocheck
import { getCookie } from './cookie.js';
const form = document.querySelector('form');
const errorMessage = document.querySelector('#error-message');
const commentsBox = document.querySelector('.comments-box');
errorMessage.hidden = true;

class Comments {
	/**
	 * @type {Array<{user_id: string, content: string}>}
	 */
	#comments = [];
	set comments(comments) {
		this.#comments = comments;
		commentsBox.innerHTML = '';
		this.#comments.forEach((comment) => {
			commentsBox.innerHTML += `<div class='comment'>
					<div class='comment-header'>
						<div class='comment-author'>
							${comment.user_id}
						</div>
					</div>
					<div class='comment-content'>
						${comment.content}
					</div>
				</div>`;
		});
	}
	get comments() {
		return this.#comments;
	}
}

let comments = new Comments();

(() => {
	fetch(
		`/api/comment/get?recipe_id=${window.location.pathname.split('/')[2]}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		}
	)
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			comments.comments = data;
		})
		.catch((err) => {
			console.log(err);
		});
})();

const submitComment = (event) => {
	event.preventDefault();
	const comment = event.target.comment.value;
	const recipe_id = event.target.recipe_id.value;
	const user_id = getCookie('user_id');
	if (!comment) {
		errorMessage.innerText = 'Please enter a comment';
		errorMessage.hidden = false;
		return;
	}
	fetch('/api/comment/add', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			recipe_id,
			user_id,
			content: comment,
		}),
	}).catch((err) => {
		console.log(err);
	});
	comments.comments = [...comments.comments, { user_id, content: comment }];
	errorMessage.hidden = true;
};

form.onsubmit = submitComment;
