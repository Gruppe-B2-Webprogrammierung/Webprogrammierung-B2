// @ts-check

/**
 * Returns the value of the cookie with the given name.
 * @param {string} name - cookie name
 * @returns {string}
 */
const getCookie = (name) => {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
};

/**
 * Set a cookie with the given name and value.
 * @param {string} name - cookie name
 * @param {*} value
 */
const setCookie = (name, value) => {
	document.cookie = `${name}=${value}`;
};

export { getCookie, setCookie };
