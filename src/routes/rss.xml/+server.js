import { posts } from '$lib/server/posts.js';
import { rss } from '$lib/server/feeds.js';
export const prerender = true;
export function GET() {
	return new Response(rss(posts), {
		headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' }
	});
}
