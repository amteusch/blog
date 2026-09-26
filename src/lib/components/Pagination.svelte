<script lang="ts">
	type Summary = { slug: string; title: string };
	let { next, previous }: { next?: Summary; previous?: Summary } = $props();
</script>

{#if next || previous}
	<nav class="post-navigation" aria-label="More articles">
		{#if next}<a href="/writing/{next.slug}">← Newer: {next.title}</a>{/if}
		{#if previous}<a href="/writing/{previous.slug}">Older: {previous.title} →</a>{/if}
	</nav>
{/if}

<style>
	.post-navigation {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 1rem;
	}
</style>
