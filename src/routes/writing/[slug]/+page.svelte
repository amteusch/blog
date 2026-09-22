<script lang="ts">
	import Page from '$lib/components/Page.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import { formatDate } from '$lib/dates.js';
	let { data } = $props();
</script>

<Page
	width="3"
	title={data.post.title}
	description={data.post.description}
	published={data.post.date}
	class="center flow flow-g-2 mb-3"
>
	<header class="flow">
		<p class="text-gray-300 text-00">
			<time datetime={data.post.date}>{formatDate(data.post.date)}</time> • {data.post.minutes} min read
		</p>
		<h1>{data.post.title}</h1>
	</header>
	<!-- HTML is sanitized in the server-only content parser. -->
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	<article class="post flow flow-g-2">{@html data.post.html}</article>
	<Pagination next={data.next} previous={data.previous} />
</Page>

<style>
	.post {
		min-width: 0;
		overflow-wrap: anywhere;
	}
	.post :global(pre) {
		overflow-x: auto;
	}
	.post :global(img) {
		max-width: 100%;
		height: auto;
	}
</style>
