import { signOut } from '$lib/server/utils/emailPasswordAuthUtils';
import { i18nRedirect } from '$lib/server/utils/navUtils';

export async function load({ request, locals, cookies }) {
	if (!locals.session || !locals.user) {
		i18nRedirect('/login', locals.lang);
	}

	const authResponse = await signOut({ headers: request.headers });
	const { session } = authResponse;
	cookies.delete(session!.name, { path: '/' });

	locals.session = null;
	locals.user = null;

	i18nRedirect('/login', locals.lang);
}
