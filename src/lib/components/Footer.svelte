<script lang="ts">
	type Link = { name: string; url: string; alt: string };

	const links: Link[] = [
		{ name: 'twitter', url: 'https://twitter.com/amteusch', alt: 'Link to my Twitter'},
		{ name: 'linkedin', url: 'https://linkedin.com/in/amteusch', alt: 'Link to my LinkedIn profile'},
		{ name: 'github', url: 'https://github.com/amteusch', alt: 'Link to my GitHub' },
		{ name: 'youtube', url: 'https://youtube.com/channel/UCLbsr4IgcVSuh0dseWq3_cA', alt: 'Link to my YouTube channel' }
	];

	import Icon from 'svelte-awesome';
  	import { twitter, github, youtube, linkedin} from 'svelte-awesome/icons';
	var map = {};
	map['twitter']=twitter;
	map['github']=github;
	map['youtube']=youtube;
	map['linkedin']=linkedin;
</script>

<footer class="flex-col items-start | p-1 text-00 bg-gray-400">
	<div class="links | flex-row items-center justify-end">
		<a href="/meta" sveltekit:prefetch class="flex-grow">
			<i
				data-tooltip="About the website"
				data-tooltip-position="left">About</i
			>
		</a>
		<a href="https://amteusch.github.io/resume/" class="flex-grow">
			<i
				data-tooltip="Download my resume"
				data-tooltip-position="left">Resume</i
			>
		</a>
		<a href="mailto:adam.m.teuscher@gmail.com" class="flex-grow">
			<i
				data-tooltip="Send me an email"
				data-tooltip-position="left">Email</i
			>
		</a>
		{#each links as link}
			<a href={link.url} title={link.alt}>
				<Icon data={map[link.name]} />
			</a>
		{/each}

		<!-- <a href="/rss.xml" title="RSS Feed" sveltekit:prefetch>rss</a> -->
	</div>
	<!-- <i class="text-center text-000 pb-00 text-gray-100">
		"A crinkle (/ˈkrɪŋk(ə)l/) is a wrinkle or crease on a surface. It highlights personality and
		uniqueness."
	</i> -->
</footer>

<style lang="scss">
	footer {
		border-top: 1px solid var(--gray-300);
	}

	.links {
		width: 100%;
	}

	.links > * + * {
		margin-left: var(--spacing-0);
		padding: var(--spacing-000);
	}
</style>
