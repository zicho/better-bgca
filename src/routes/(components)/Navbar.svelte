<script lang="ts">
	import { page } from '$app/state';
	import * as m from '$lib/paraglide/messages';
	import { type AvailableLanguageTag, languageTag } from '$lib/paraglide/runtime';
	import type { User } from 'better-auth';

	type MenuItemProps = {
		displayName: string;
		href: string;
		reload?: boolean;
	};

	let { user }: { user: User | null } = $props();
</script>

{#snippet menu_item({ displayName, href, reload }: MenuItemProps)}
	<li>
		<a
			data-sveltekit-reload={reload}
			class:active={page.route.id?.includes(href)}
			class="flex h-full cursor-pointer items-center px-4 text-center hover:bg-neutral-600"
			{href}>{displayName}</a
		>
	</li>
{/snippet}

{#snippet change_lang_tag({ tag, langName }: { tag: AvailableLanguageTag; langName: string })}
	<li>
		<a href="/api/lang?lang={tag}&redirect={page.url.pathname}">
			{langName}
			{#if tag === languageTag()}
				<span class="badge bg-neutral text-neutral-content">{m.selected()}</span>
			{/if}
		</a>
	</li>
{/snippet}

<menu class="flex h-16 w-full items-center bg-neutral text-neutral-content">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost px-4 text-xl font-medium">BGCA</a>
	</div>
	<div class="h-full flex-none">
		<ul class="flex h-full">
			{#if user}
				{@render menu_item({ displayName: m.dashboard(), href: '/dashboard' })}
				{@render menu_item({ displayName: m.sign_out(), href: '/logout', reload: true })}
			{:else}
				{@render menu_item({ displayName: m.sign_in(), href: '/login' })}
				{@render menu_item({ displayName: m.register(), href: '/register' })}
			{/if}
		</ul>
	</div>
	<div class="dropdown dropdown-end">
		<div
			tabindex="0"
			role="button"
			class="avatar btn btn-circle btn-ghost mx-4 flex items-center justify-center"
		>
			{languageTag().toUpperCase()}
		</div>
		<ul
			class="menu dropdown-content menu-sm z-[1] mt-3 min-w-64 rounded-box p-2 text-neutral shadow"
		>
			<!-- <li>
				<a>
					English
					<span class="badge bg-neutral text-neutral-content">Current</span>
				</a>
			</li> -->
			{@render change_lang_tag({ tag: 'en', langName: 'English' })}
			{@render change_lang_tag({ tag: 'sv', langName: 'Svenska' })}
		</ul>
	</div>
</menu>

<style>
	.active {
		@apply bg-neutral-700;
	}
</style>
