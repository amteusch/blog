<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import '../styles/index.scss';
	let { children } = $props();
</script>

<a class="skip-link" href="#main">Skip to content</a>
<div class="site-shell text-0">
	{@render children()}
	<Footer />
</div>

<style>
	.site-shell {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}
	.skip-link {
		position: fixed;
		top: -100px;
		left: 1rem;
		z-index: 200;
		padding: 0.5rem 1rem;
		background: var(--gray-500);
	}
	.skip-link:focus {
		top: 1rem;
	}
</style>
