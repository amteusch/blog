<script context="module">
	import Page from '$lib/components/Page.svelte';

	export const prerender = true;
</script>

<Page width="3" class="center flow | mb-3 text-00" title="About • Adam Teuscher">
	<h1 class="flow-b-000">About this website</h1>
	<!-- <blockquote>
		<em>
			"A hippo is happiest in the river"
		</em>
	</blockquote> -->

	<p>
		This is mostly meant as a portfolio website that also houses some of my thoughts in the form of blog posts.
		Hope you enjoy!
	</p>
	<p>
		The current version of this website was created using <a
			href="https://kit.svelte.dev"
			title="Website of SvelteKit"
		>
			SvelteKit
		</a>
		and is heavily based on <a href="https://github.com/kevtiq/crinkle.dev" title="Crinkle repo">open source</a> 
		code from <a href="https://crinkle.dev/" title="Kevin's website">Kevin Pennekamp</a> (with a few tweaks of my own). 
		Thanks Kevin!
	</p>
</Page>
