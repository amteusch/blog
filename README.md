# adamteuscher.com

Adam Teuscher's personal website, built with Svelte 5 and SvelteKit 2.
The original design was adapted from [Kevin Pennekamp's crinkle.dev](https://github.com/kevtiq/crinkle.dev).
The hippo, existing writing, and public article URLs are preserved.

## Development

Use Node 24 (see `.nvmrc`) and npm. The committed npm lockfile is authoritative.

```sh
npm ci
npm run dev
```

## Validation

```sh
npm run check
npm run lint
npm test
npm run build
npm run test:build
npm run preview
```

## Publishing a post

Add `src/content/my-post.md` with front matter:

```yaml
---
title: My post
description: A short summary for listings, social previews, and RSS.
date: 2026-09-22
draft: false
tags:
  - Engineering
---
```

The filename determines the URL (`/writing/my-post`). Keep existing filenames
to preserve inbound links. Dates are displayed in UTC. Optional `updated` dates
are used by the sitemap. `draft: true` excludes the post from pages, listings,
RSS, and the sitemap. Draft files are still visible in this public repository:
do not commit confidential writing.

Markdown is parsed and sanitized on the server at build time. Metadata validation
fails the build for malformed published posts. Lists contain summaries, not full
article HTML. No CMS credentials or runtime functions are required.

## Deployment

Netlify uses `npm run build` and publishes `build/`, with Node 24 configured in
`netlify.toml`. All pages, RSS, and sitemap are explicitly prerendered.
There is no SPA catch-all: missing paths should return the static `404.html`
with an HTTP 404 status. Netlify's existing production branch should stay `main`.
Review a deploy preview before merging a modernization PR.

After deployment, verify direct article loads, the RSS feed, sitemap, missing-page
status, and the apex-to-www redirect. Redirects target only the original production
hostnames, not deploy-preview URLs.

## Site settings

Edit `src/lib/site.js` for shared identity, canonical origin, and social image.
Update `static/robots.txt` and production redirects too if changing the domain.
The original resume link remains external; its content is maintained separately.

## Scope of modernization

This migration repairs the build, routing, metadata, RSS, date handling, content
validation, accessibility basics, and deployment configuration. It does not
rewrite historical articles, invent portfolio case studies, update the separate
resume, change hosting providers, or add analytics.
