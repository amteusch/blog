import { error } from '@sveltejs/kit';
import { posts, summaries } from '$lib/server/posts.js';
export function entries() {
	return posts.map((post) => ({ slug: post.slug }));
}
/** @type {import('./$types').PageServerLoad} */
export function load({ params }) {
	const index = posts.findIndex((p) => p.slug === params.slug);
	if (index < 0) error(404, 'Article not found');
	return { post: posts[index], next: summaries[index - 1], previous: summaries[index + 1] };
}
