import { login } from '$lib/form_actions/login';
import { loginUserSchema } from '$lib/validation/schemas/loginUserSchema';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async () => {
	const form = await superValidate(zod(loginUserSchema));
	return { form };
};

export const actions = {
	default: login
};
