import { register } from '$lib/form_actions/register';
import { registerUserSchema } from '$lib/validation/schemas/registerUserSchema';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async () => {
	const form = await superValidate(zod(registerUserSchema));
	return { form };
};

export const actions = {
	default: register
};
