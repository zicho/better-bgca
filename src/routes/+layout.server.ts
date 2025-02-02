import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const { user, session, lang } = locals;

	return {
		user,
		session,
		lang
	};
}) satisfies LayoutServerLoad;
