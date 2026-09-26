<script>
	import { site } from '$lib/site.js';
	const links = [
		{ name: 'About', url: '/meta' },
		{ name: 'Resume', url: 'https://amteusch.github.io/resume/' },
		{ name: 'Email', url: `mailto:${site.email}` },
		{ name: 'RSS', url: '/rss.xml' },
		{ name: 'X', url: 'https://x.com/amteusch' },
		{ name: 'LinkedIn', url: 'https://linkedin.com/in/amteusch' },
		{ name: 'GitHub', url: 'https://github.com/amteusch' },
		{ name: 'YouTube', url: 'https://youtube.com/channel/UCLbsr4IgcVSuh0dseWq3_cA' }
	];
</script>

<footer class="p-1 text-00 bg-gray-400">
	<nav aria-label="Contact and social links">
		{#each links as link (link.url)}<a href={link.url}>{link.name}</a>{/each}
	</nav>
</footer>

<style>
	footer {
		border-top: 1px solid var(--gray-300);
		margin-top: 3rem;
	}
	nav {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem 1.5rem;
		justify-content: center;
	}
</style>
