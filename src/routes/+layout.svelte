<script lang="ts">
	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import '../app.css';
	import Navbar from './(components)/Navbar.svelte';
	let { children, data } = $props();

	let { user, session } = $derived(data);

	type MenuItemProps = {
		displayName: string;
		href: string;
		reload?: boolean;
	};
</script>

<ParaglideJS {i18n}>
	<Navbar {user} />

	<style>
		.active {
			@apply bg-neutral-700;
		}
	</style>

	<main class="h-[calc(100vh-64px)]">
		{@render children()}
	</main>
</ParaglideJS>
