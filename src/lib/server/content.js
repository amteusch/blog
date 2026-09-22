import fm from 'front-matter';
import { Marked } from 'marked';
import sanitizeHtml from 'sanitize-html';

/** @typedef {{slug: string, title: string, description: string, date: string,
 * updated?: string, tags: string[], category?: string, html: string, minutes: number}} Post */

/** Parse author-owned Markdown, validate metadata, and omit drafts.
 * @param {Record<string, string>} files
 * @returns {Post[]}
 */
export function parsePosts(files) {
	/** @type {Post[]} */
	const posts = [];
	for (const [filename, source] of Object.entries(files)) {
		if (!filename.endsWith('.md')) continue;
		const { attributes, body } = fm(source);
		const data = /** @type {Record<string, unknown>} */ (attributes);
		if (data.draft !== undefined && typeof data.draft !== 'boolean') {
			throw new Error(`${filename}: draft must be a boolean`);
		}
		if (data.draft === true) continue;
		for (const key of ['title', 'description']) {
			if (typeof data[key] !== 'string' || !data[key].trim())
				throw new Error(`${filename}: missing ${key}`);
		}
		const date = normalizeDate(data.date, filename);
		const slug = filename.split('/').at(-1)?.replace(/\.md$/, '') ?? '';
		if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error(`Invalid slug: ${filename}`);
		if (posts.some((p) => p.slug === slug)) throw new Error(`Duplicate slug: ${slug}`);
		const ids = new Map();
		const markdown = new Marked({
			renderer: {
				heading({ text, tokens, depth }) {
					// Match the original site's anchors while disambiguating repeated headings.
					const base = text.toLowerCase().replace(/[^\w]+/g, '-');
					const count = ids.get(base) || 0;
					ids.set(base, count + 1);
					const id = count ? base + '-' + count : base;
					return `<h${depth} id="${id}"><a href="#${id}">${this.parser.parseInline(tokens)}</a></h${depth}>`;
				}
			}
		});
		const html = sanitizeHtml(markdown.parse(body, { async: false }), {
			allowedTags: [...sanitizeHtml.defaults.allowedTags, 'img'],
			allowedAttributes: {
				...sanitizeHtml.defaults.allowedAttributes,
				img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
				code: ['class'],
				h1: ['id'],
				h2: ['id'],
				h3: ['id'],
				h4: ['id'],
				h5: ['id'],
				h6: ['id']
			},
			transformTags: {
				img: (tagName, attribs) => ({
					tagName,
					attribs: { ...attribs, alt: attribs.alt || '', loading: 'lazy' }
				})
			}
		});
		const plainText = sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} });
		posts.push({
			slug,
			title: /** @type {string} */ (data.title),
			description: /** @type {string} */ (data.description),
			date,
			updated: data.updated === undefined ? undefined : normalizeDate(data.updated, filename),
			tags: Array.isArray(data.tags) ? data.tags.filter((t) => typeof t === 'string') : [],
			category: typeof data.category === 'string' ? data.category : undefined,
			html,
			minutes: Math.max(1, Math.ceil(plainText.trim().split(/\s+/).length / 200))
		});
	}
	return posts.sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

/** @param {unknown} value @param {string} filename */
function normalizeDate(value, filename) {
	if (!(typeof value === 'string' || value instanceof Date))
		throw new Error(`${filename}: invalid date`);
	const date = new Date(value);
	if (!Number.isFinite(date.getTime())) throw new Error(`${filename}: invalid date`);
	return date.toISOString();
}
