import { i18n } from '$lib/i18n';
import { auth, checkSession } from '$lib/server/auth';
import { migrateToLatest } from '$lib/server/db/migrate';
import { i18nRedirect } from '$lib/server/utils/navUtils';
import { type Handle, type ServerInit } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { svelteKitHandler } from 'better-auth/svelte-kit';

export const init: ServerInit = async () => {
	await migrateToLatest();
};

const handleAuth: Handle = async ({ event, resolve }) => {
	return svelteKitHandler({ event, resolve, auth });
};

export const handleRoutes: Handle = async ({ event, resolve }) => {
	// Extract the group name from parentheses
	const match = event.route.id?.match(/\(([^)]+)\)/);
	const group = match ? match[1].split(/[\s/]+/)[0] : null;

	// Check session validity
	const session = await checkSession(event);

	if (group === 'non_authed') {
		if (session) {
			i18nRedirect('/', event.locals.lang);
		}
	} else if (group === 'protected') {
		if (!session) {
			i18nRedirect('/login', event.locals.lang);
		}
	}

	if (session) {
		event.locals.user = session.user;
		event.locals.session = session.session;
	}

	// Default: Proceed with the request
	return resolve(event);
};

const handleParaglide: Handle = i18n.handle();

export const handle: Handle = sequence(handleAuth, handleRoutes, handleParaglide);
