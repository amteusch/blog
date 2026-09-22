import { summaries } from '$lib/server/posts.js';
export function load() {
	return { articles: summaries.slice(0, 3) };
}
