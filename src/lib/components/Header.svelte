<script>
	import Logo from './Logo.svelte';
</script>

<header>
	<Logo />
	<nav aria-label="Main navigation">
		<a href="/writing">Writing</a>
		<a href="/meta">About</a>
	</nav>
</header>

<style>
	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: min(100%, 75rem);
		margin: 1rem auto;
		padding: 0 1rem;
		gap: 1rem;
	}
	nav {
		display: flex;
		gap: 1rem;
	}
</style>
