<script context="module">
	export async function load({ page, fetch }) {
		const res = await fetch(`/writing/${page.params.slug}.json`);
		if (res.ok) {
			const { post, next, prev } = await res.json();
			return { props: { post, next, prev } };
		}
		return {
			status: res.status,
			error: new Error(`Could not find article '${page.params.slug}'`)
		};
	}
</script>

<script>
	import Pagination from '$lib/components/Pagination.svelte';
	import formatDate from '$lib/utils/date';
	import length from '$lib/utils/length';
	import Page from '$lib/components/Page.svelte';

	export let post;
	export let next;
	export let prev;

	$: pagePrevious = prev ? { url: `/writing/${prev.slug}`, subtitle: prev.title } : undefined;
	$: pageNext = next ? { url: `/writing/${next.slug}`, subtitle: next.title } : undefined;

	$: date = formatDate(post.date);
	$: num = length(post.html);
</script>

<svelte:head>
	<meta property="og:type" content="article" />
</svelte:head>

<Page width="6" title={post.title} description={post.excerpt}>
	<header class="center flow flow-g-none" role="contentinfo">
		<span class="text-gray-300 uppercase">
			<time datetime={date}>{date}</time>
			{` • ${num}`}
		</span>
		<h1>{post.title}</h1>
	</header>
	<article class="post | center flow flow-g-2 | mt-0">{@html post.html}</article>
</Page>
<Pagination next={pageNext} previous={pagePrevious} slot="pagination" />

<style lang="scss">
	:global(.post h2 + p) {
		margin-top: var(--spacing-00);
	}

	:global(.post h2 a) {
		text-decoration-line: none;
		color: var(--gray-100);

		&::before {
			content: '»';
			margin-right: var(--spacing-000);
			color: var(--green);
		}
	}

	:global(.post h2:hover a) {
		text-decoration-line: underline;
	}

	:global(.post img),
	:global(.post blockquote),
	:global(.post pre) {
		grid-column: 1 / 4;
		justify-self: center;
		width: 100%;
		max-width: calc(var(--center-width, var(--size-4)) + 2 * var(--spacing-2));
	}
</style>
