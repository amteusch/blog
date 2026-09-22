<script lang="ts">
	import { formatDate } from '$lib/dates.js';
	let {
		href,
		title,
		description,
		date,
		class: className = ''
	}: { href: string; title: string; description: string; date: string; class?: string } = $props();
</script>

<div class="flex-col click-area {className}">
	<time datetime={date} class="text-00 text-gray-300 uppercase">{formatDate(date)}</time>
	<h2 class="text-0 text-gray-100"><a {href}>{title}</a></h2>
	<p class="text-00 text-gray-300 mt-000">{description}</p>
</div>

<style>
	h2 a {
		text-decoration: none;
	}
</style>
