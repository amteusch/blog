<script context="module">
	export async function load({ fetch }) {
		const res = await fetch('/index.json');
		return { props: { articles: await res.json() } };
	}
</script>

<script>
	import Logo from '$lib/components/Logo.svelte';
	import Card from '$lib/components/Card.svelte';
	import Page from '$lib/components/Page.svelte';

	export let articles;
</script>

<svelte:head>
	<title>Adam Teuscher</title>
</svelte:head>

<Page width="5" showHeader={false} class="center flow flow-g-3 | mt-1">
	<section class="splitter splitter-w-1 splitter-g-3 | my-1">
		<div class="flow flex-col">
			<Logo class="self-start" />
			<h1 class="p-0">Adam Teuscher</h1>
			<span class="p-0 text-00 text-gray-200">
				I recently graduated in computer science from <a href=https://cs.byu.edu>BYU</a>. I occasionally
				<a class="next" href="/writing">write</a> about books I've read and other 
				topics I'm interested in. You can find my resume and contact information below.
				Thanks for visiting! (By the way, my logo is a hippopotamus, my favorite animal!)
			</span>
			<img loading="lazy" src="../static/img/adam.jpg" alt="Adam Teuscher">

			<!-- <i class="flow-t-3 | p-0 text-00 text-gray-300 text-center">
				"Hippos are the best animal of all time."
			</i> -->
		</div>
		<aside class="flow flex-col">
			{#each articles as article}
				<Card
					date={article.date}
					class="bg-gray-400 p-1"
					title={article.title}
					description={article.description}
					href="/writing/{article.slug}"
				/>
			{/each}
			<a href="/writing" class="self-end | mt-1 text-0 bold" sveltekit:prefetch
				>View more articles →</a
			>
		</aside>
	</section>
</Page>
<!-- Hacker div for the pancake class -->
<div />
