<script lang="ts">
	import Logo from '$lib/components/Logo.svelte';
	import Card from '$lib/components/Card.svelte';
	import Page from '$lib/components/Page.svelte';
	let { data } = $props();
</script>

<Page width="5" showHeader={false} class="center flow flow-g-3 mt-1">
	<section class="splitter splitter-w-1 splitter-g-3 my-1">
		<div class="flow flex-col">
			<Logo class="self-start" />
			<h1 class="p-0">Adam Teuscher</h1>
			<p class="p-0 text-00 text-gray-200">
				I'm a computer vision engineer and a BYU computer science graduate. I work with detection,
				segmentation, and the data behind machine learning. I also <a href="/writing">write</a> about
				books and other ideas that interest me.
			</p>
			<p class="text-00">
				You can find my resume and contact information below. And yes, the logo is a hippopotamus—my
				favorite animal.
			</p>
		</div>
		<aside class="flow flex-col" aria-label="Recent writing">
			{#each data.articles as article (article.slug)}
				<Card {...article} class="bg-gray-400 p-1" href="/writing/{article.slug}" />
			{/each}
			<a href="/writing" class="self-end mt-1 text-0 bold">All writing →</a>
		</aside>
	</section>
</Page>
