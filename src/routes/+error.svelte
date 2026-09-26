<script>
	import { page } from '$app/state';
	import Page from '$lib/components/Page.svelte';
</script>

<Page title={String(page.status)} class="center flow mb-3">
	<h1>{page.status}</h1>
	<p>{page.error?.message ?? 'Something went wrong.'}</p>
	<a href="/">Return home</a>
</Page>
