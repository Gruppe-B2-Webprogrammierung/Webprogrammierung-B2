// @ts-check
import { getCookie } from './cookie.js';

class Favorites {
	#favorites = [];
	#rerender = false;
	#rerenderTo = null;
	#fetched = false;
	constructor(callback = (fav) => {}, rerender = false, rerenderTo = null) {
		this.#rerender = rerender;
		this.#rerenderTo = rerenderTo;
		fetch(`/api/favorite/get?user_id=${getCookie('user_id')}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				if (data.length > 0) {
					this.#favorites = data;
				}
				callback(this.#favorites);
				this.#fetched = true;
			})
			.catch((err) => {
				console.log(err);
			});
	}

	#getRecipeData = (recipeId) => {
		return fetch(`/api/recipe/get?recipe_id=${recipeId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				return data;
			})
			.catch((err) => {
				console.log(err);
			});
	};

	/**
	 *
	 * @param {string[]} favorites
	 */
	addFavorites(favorites) {
		favorites.forEach((favorite) => {
			this.#favorites.push(favorite);
			fetch(
				`/api/favorite/add?user_id=${getCookie(
					'user_id'
				)}&recipe_id=${favorite}`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
				.then((res) => {
					if (this.#rerender) {
						this.renderFavorites(this.#rerenderTo);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		});
	}
	get favorites() {
		return this.#favorites;
	}
	renderFavorites(renderTo) {
		const renderTarget = document.querySelector(renderTo);

		let list = document.createElement('ol');
		let recipes = [];
		this.#favorites.forEach((favorite) => {
			this.#getRecipeData(favorite).then((data) => {
				recipes.push(data);

				let listItem = document.createElement('li');
				listItem.innerHTML = `<a href="/recipe/${data.id}">${data.title}</a>`;
				list.appendChild(listItem);
			});

			renderTarget.appendChild(list);
		});
	}
}

export default Favorites;
