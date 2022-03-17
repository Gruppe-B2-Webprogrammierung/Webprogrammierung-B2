import Favorites from './favorite.js';

const intialFavoriteCallback = (fav) => {
	favorites.renderFavorites('#favorite-list');
};

let favorites = new Favorites(intialFavoriteCallback);
