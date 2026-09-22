import { parsePosts } from './content.js';
// Server-only, statically discoverable imports: no cwd-dependent filesystem reads.
const files = import.meta.glob('/src/content/*.md', {
	query: '?raw',
	import: 'default',
	eager: true
});
export const posts = parsePosts(/** @type {Record<string, string>} */ (files));
export const summaries = posts.map(({ html: _html, ...summary }) => summary);
