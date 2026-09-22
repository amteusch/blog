import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { parsePosts } from '../../src/lib/server/content.js';
const posts = parsePosts(
	Object.fromEntries(
		readdirSync('src/content').map((name) => [name, readFileSync('src/content/' + name, 'utf8')])
	)
);
const routes = ['/', '/writing', '/meta', ...posts.map((p) => '/writing/' + p.slug)];
/** @param {string} route */
const output = (route) => (route === '/' ? 'build/index.html' : 'build' + route + '.html');
test('every public page contains prerendered content and correct metadata', () => {
	for (const route of routes) {
		const html = readFileSync(output(route), 'utf8');
		assert.match(html, /<h1[ >]/, route);
		assert.match(html, /rel="canonical"/, route);
		assert.ok(html.includes('https://www.adamteuscher.com' + route), route);
		assert.doesNotMatch(
			html,
			/@kevtiq|https:\/\/crinkle.dev\/logo|recently graduated|name="monetization"/
		);
		assert.match(html, /id="main"/);
	}
});
test('articles have descriptions, dates, navigation, and their complete text', () => {
	for (const post of posts) {
		const html = readFileSync(output('/writing/' + post.slug), 'utf8');
		assert.ok(html.includes(post.title.replaceAll('&', '&amp;')));
		assert.match(html, /article:published_time/);
		assert.ok(html.includes(post.date));
		assert.match(html, /aria-label="More articles"/);
	}
});
test('feeds, robots, header rules, and a real static 404 are emitted', () => {
	for (const path of ['rss.xml', 'sitemap.xml', 'robots.txt', '_headers', '404.html'])
		assert.ok(existsSync('build/' + path), path);
	const feed = readFileSync('build/rss.xml', 'utf8');
	assert.equal((feed.match(/<item>/g) || []).length, posts.length);
	assert.doesNotMatch(feed, /crinkle|undefined/);
	assert.match(readFileSync('build/404.html', 'utf8'), /Page not found/);
});
