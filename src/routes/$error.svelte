<script>
	import Page from '$lib/components/Page.svelte';

	export let error;
	export let status;
</script>

<svelte:head>
	<title>🙈🙉🙊</title>
</svelte:head>

<Page width="3" class="place-center flow">
	<h1>{status} • {error}</h1>
	<h2>
		<span role="img" aria-label="Sorry emoji" aria-labelledby=""> 🙈🙉🙊 </span>
	</h2>
</Page>
