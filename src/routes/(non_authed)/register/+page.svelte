<script lang="ts">
	import { enhance } from '$app/forms';
	import TextInput from '$lib/components/form/TextInput.svelte';
	import * as m from '$lib/paraglide/messages';
	import { superForm } from 'sveltekit-superforms';
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
		<h1 class="text-center text-2xl">Register</h1>
		<form method="post" use:enhance>
			<TextInput
				bind:value={$form.username}
				bind:errors={$errors.username}
				required
				id="username-txt-input"
				name="username"
				classes="mb-4"
				label={m.desired_username()}
				placeholder={m.enter_desired_username()}
			/>
			<TextInput
				bind:value={$form.email}
				bind:errors={$errors.email}
				required
				id="email-txt-input"
				name="email"
				label={m.email()}
				classes="mb-4"
			/>
			<TextInput
				bind:value={$form.password}
				bind:errors={$errors.password}
				required
				id="password-txt-input"
				name="password"
				label={m.password()}
				type="password"
				classes="mb-4"
			/>
			<TextInput
				bind:value={$form.confirm_password}
				bind:errors={$errors.confirm_password}
				required
				id="confirm-password-txt-input"
				name="confirm_password"
				label={m.confirm_password()}
				type="password"
				classes="mb-4"
			/>
			<div class="divider mb-4"></div>
			<div class="mb-4 text-center">
				<p class="text-error">{$message}</p>
			</div>
			<button type="submit" class="btn btn-primary btn-sm w-full md:btn-md">{m.submit()}</button>
		</form>
	</div>
</main>
