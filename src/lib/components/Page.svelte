<script lang="ts">
	import type { Snippet } from 'svelte';
	import { page } from '$app/state';
	import { site, absoluteUrl } from '$lib/site.js';
	import Header from './Header.svelte';
	let {
		children,
		class: className = '',
		showHeader = true,
		width = '4',
		title = site.name,
		description = site.description,
		published = undefined
	}: {
		children: Snippet;
		class?: string;
		showHeader?: boolean;
		width?: string;
		title?: string;
		description?: string;
		published?: string;
	} = $props();
	const fullTitle = $derived(title === site.name ? title : `${title} • ${site.name}`);
	const canonical = $derived(absoluteUrl(page.url.pathname));
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<meta name="author" content={site.name} />
	<link rel="canonical" href={canonical} />
	<link rel="alternate" type="application/rss+xml" title="Adam Teuscher RSS" href="/rss.xml" />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:site_name" content={site.name} />
	<meta property="og:url" content={canonical} />
	<meta property="og:type" content={published ? 'article' : 'website'} />
	<meta property="og:image" content={absoluteUrl(site.image)} />
	<meta property="og:image:alt" content="Adam Teuscher's hippo logo" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:creator" content="@amteusch" />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={absoluteUrl(site.image)} />
	{#if published}<meta property="article:published_time" content={published} />{/if}
</svelte:head>
{#if showHeader}<Header />{/if}
<main id="main" tabindex="-1" class="center-w-{width} {className}">
	{@render children()}
</main>

<style>
	main {
		flex: 1;
	}
</style>
