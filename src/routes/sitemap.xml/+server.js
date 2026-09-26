import { posts } from '$lib/server/posts.js';
import { sitemap } from '$lib/server/feeds.js';
export const prerender = true;
export function GET() {
	return new Response(sitemap(posts), {
		headers: { 'Content-Type': 'application/xml; charset=utf-8' }
	});
}
