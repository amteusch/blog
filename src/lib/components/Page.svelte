<!-- src/component/PageTransitions.svelte -->
<script>
	import { fly } from 'svelte/transition';
	import Header from './Header.svelte';

	$: widthClass = `center-w-${width}`;
	$: classes = `${widthClass} ${styles}`;

	let styles;
	export let showHeader = true;
	export { styles as class };
	export let width = '4';
	export let title = 'Adam Teuscher';
	export let description =
		'Personal website of Adam Teuscher.';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="twitter:title" content={title} />
	<meta property="og:title" content={title} />

	<meta name="description" content={description} />
	<meta name="twitter:description" content={description} />
	<meta property="og:description" content={description} />
</svelte:head>

{#if showHeader}
	<Header class={widthClass} />
{/if}
<main class={classes} in:fly={{ y: 50, duration: 250 }}>
	<slot></slot>
</main>
<slot name="pagination"/>
