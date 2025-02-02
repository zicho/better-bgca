import { signInUsername } from '$lib/server/utils/emailPasswordAuthUtils';
import { i18nRedirect } from '$lib/server/utils/navUtils';
import { loginUserSchema } from '$lib/validation/schemas/loginUserSchema';
import { type Cookies } from '@sveltejs/kit';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const login = async ({
	request,
	cookies,
	locals
}: {
	request: Request;
	cookies: Cookies;
	locals: App.Locals;
}) => {
	const form = await superValidate(request, zod(loginUserSchema));

	if (!form.valid) {
		return fail(400, { form });
	}

	const user = form.data;
	const authResponse = await signInUsername({ user });

	if (authResponse.success) {
		const { session } = authResponse;
		cookies.set(session!.name, session!.value, session!.opts);

		i18nRedirect('/', locals.lang);
	} else {
		return message(form, authResponse.message);
	}
};
