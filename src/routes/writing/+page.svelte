<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Page from '$lib/components/Page.svelte';
	let { data } = $props();
</script>

<Page
	title="Writing"
	description="Essays and notes by Adam Teuscher about software, books, and ideas."
	class="center flow flow-g-2 mb-3"
>
	<h1>Writing</h1>
	{#each data.articles as article (article.slug)}
		<Card {...article} href="/writing/{article.slug}" />
	{/each}
</Page>
