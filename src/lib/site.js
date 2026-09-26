export const site = {
	name: 'Adam Teuscher',
	url: 'https://www.adamteuscher.com',
	description: 'Computer vision engineer. Writing about software, books, and ideas.',
	image: '/android-chrome-512x512.png',
	email: 'adam.m.teuscher@gmail.com'
};
/** @param {string} path */
export function absoluteUrl(path) {
	return new URL(path, site.url).href;
}
