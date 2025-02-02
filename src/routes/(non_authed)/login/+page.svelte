<script lang="ts">
	import TextInput from '$lib/components/form/TextInput.svelte';
	import * as m from '$lib/paraglide/messages';
	import { superForm } from 'sveltekit-superforms';

	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const { form, message, errors } = superForm(data.form, {
		resetForm: false
	});
</script>

<main class="flex h-full items-center justify-center bg-base-200">
	<div
		class="h-full w-full border-base-300 bg-base-100 p-4 lg:h-auto lg:max-w-lg lg:border-2 lg:drop-shadow-md"
	>
		<h1 class="text-center text-2xl">{m.sign_in()}</h1>
		<form method="post" use:enhance>
			<TextInput
				bind:value={$form.username}
				bind:errors={$errors.username}
				required
				name="username"
				id="username-txt-input"
				classes="mb-4"
				label={m.username()}
				placeholder={m.enter_username()}
			/>
			<TextInput
				bind:value={$form.password}
				bind:errors={$errors.password}
				required
				name="password"
				id="password-txt-input"
				label={m.password()}
				type="password"
				classes="mb-4"
			/>
			<div class="divider"></div>
			<button type="submit" class="btn btn-primary btn-sm w-full md:btn-md">{m.submit()}</button>
		</form>
	</div>
</main>
