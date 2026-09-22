<script>
	import Page from '$lib/components/Page.svelte';
</script>

<Page width="3" class="center flow mb-3 text-00" title="About this website">
	<h1>About this website</h1>
	<p>This is my personal website: a home for my work, interests, and writing.</p>
	<p>
		It is built with <a href="https://svelte.dev/docs/kit">SvelteKit</a>, prerendered as a static
		site, and hosted on Netlify. The original design and code were adapted from
		<a href="https://github.com/kevtiq/crinkle.dev">Kevin Pennekamp's open-source site</a>. Thanks,
		Kevin!
	</p>
	<p>
		<a href="https://github.com/amteusch/blog">View the source</a> or
		<a href="/rss.xml">subscribe via RSS</a>.
	</p>
</Page>
