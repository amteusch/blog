import { site, absoluteUrl } from '../site.js';
/** @param {string} value */
export function xml(value) {
	return value.replace(
		/[<>&"']/g,
		(c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[c] ?? c
	);
}
/** @param {import('./content.js').Post[]} posts */
export function rss(posts) {
	return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel>
<title>${xml(site.name)} RSS Feed</title><link>${site.url}</link>
<description>${xml(site.description)}</description><language>en-us</language>
<atom:link href="${absoluteUrl('/rss.xml')}" rel="self" type="application/rss+xml"/>
${posts
	.map(
		(p) => `<item><title>${xml(p.title)}</title>
<link>${absoluteUrl('/writing/' + p.slug)}</link>
<guid isPermaLink="true">${absoluteUrl('/writing/' + p.slug)}</guid>
<description>${xml(p.description)}</description>
<pubDate>${new Date(p.date).toUTCString()}</pubDate></item>`
	)
	.join('\n')}
</channel></rss>`;
}
/** @param {import('./content.js').Post[]} posts */
export function sitemap(posts) {
	const pages = [
		{ path: '/' },
		{ path: '/writing' },
		{ path: '/meta' },
		...posts.map((p) => ({ path: '/writing/' + p.slug, modified: p.updated || p.date }))
	];
	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `<url><loc>${absoluteUrl(p.path)}</loc>${'modified' in p ? '<lastmod>' + p.modified + '</lastmod>' : ''}</url>`).join('\n')}
</urlset>`;
}
