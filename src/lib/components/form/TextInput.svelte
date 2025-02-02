<script lang="ts">
	type TextInputProps = {
		value: string;
		id: string;
		name: string;
		label: string;
		placeholder?: string;
		type?: 'text' | 'password';
		errors?: string[];
		infoMessage?: string;
		classes?: string;
		required?: boolean;
	};

	let {
		value = $bindable(),
		id,
		name,
		label,
		placeholder,
		type = 'text',
		errors = $bindable(),
		infoMessage,
		classes,
		required
	}: TextInputProps = $props();

	let errorMessage = $derived.by(() => {
		if (!errors) return;
		if (errors.length === 1) return errors[0];
		return errors.join(', ');
	});
</script>

<label class="form-control {classes}">
	<div class="label pb-1">
		<span class="md:text-md label-text text-xs sm:text-sm">{label}</span>
		<span class="md:text-md label-text-alt text-xs text-error sm:text-sm">{errorMessage}</span>
	</div>
	<input
		{value}
		{name}
		{id}
		{type}
		placeholder={placeholder ?? label}
		class="input input-xs input-bordered sm:input-sm md:input-md"
		{required}
	/>
	{#if infoMessage}
		<div class="label">
			<span class="md:text-md label-text-alt text-xs sm:text-sm">{infoMessage}</span>
		</div>
	{/if}
</label>
