import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parsePosts } from '../src/lib/server/content.js';
import { formatDate } from '../src/lib/dates.js';
import { rss, sitemap } from '../src/lib/server/feeds.js';
const source = (extra = '', body = 'Hello world.') => `---
title: "Title & <test>"
description: "A & B"
date: 2021-05-10T00:00:00.000Z
${extra}
---
${body}`;
test('publication dates are independent of local timezone', () => {
	assert.equal(formatDate('2021-05-10T00:00:00.000Z'), 'May 10, 2021');
});
test('drafts are absent and descriptions survive', () => {
	const posts = parsePosts({ 'post.md': source(), 'draft.md': source('draft: true') });
	assert.equal(posts.length, 1);
	assert.equal(posts[0].description, 'A & B');
	assert.equal(posts[0].slug, 'post');
	assert.equal(posts[0].minutes, 1);
});
test('bad metadata and ambiguous draft flags fail loudly', () => {
	assert.throws(() => parsePosts({ 'bad.md': 'No front matter' }), /missing/);
	assert.throws(() => parsePosts({ 'bad.md': source('draft: "false"') }), /boolean/);
	assert.throws(
		() => parsePosts({ 'bad.md': source().replace('2021-05-10T00:00:00.000Z', 'not-a-date') }),
		/invalid date/
	);
});
test('unsafe Markdown HTML and JavaScript URLs are removed', () => {
	const [post] = parsePosts({
		'post.md': source(
			'',
			'<script>alert(1)</script><img src="x" onerror="alert(1)">\n\n[bad](javascript:alert)'
		)
	});
	assert.doesNotMatch(post.html, /<script|onerror|javascript:/);
	assert.match(post.html, /loading="lazy"/);
});
test('sorting is newest first, stable for ties', () => {
	const posts = parsePosts({
		'b.md': source(),
		'a.md': source(),
		'new.md': source().replace('2021-', '2025-')
	});
	assert.deepEqual(
		posts.map((p) => p.slug),
		['new', 'a', 'b']
	);
});
test('feeds use this site, escape XML, and provide stable GUIDs', () => {
	const posts = parsePosts({ 'post.md': source() });
	const feed = rss(posts);
	assert.match(feed, /Title &amp; &lt;test&gt;/);
	assert.match(feed, /https:\/\/www.adamteuscher.com\/writing\/post/);
	assert.match(feed, /<guid isPermaLink="true">/);
	assert.doesNotMatch(feed, /crinkle|kevtiq/);
	assert.match(sitemap(posts), /<loc>https:\/\/www.adamteuscher.com\/writing\/post<\/loc>/);
});
