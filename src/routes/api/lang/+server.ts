// src/routes/api/change-language/+server.js

import { i18n } from '$lib/i18n'; // Ensure the correct import path for your i18n setup
import { type AvailableLanguageTag } from '$lib/paraglide/runtime';
import { json, redirect } from '@sveltejs/kit';

export async function GET({ url, cookies, locals }) {
	// Get the language from the query string
	const lang = url.searchParams.get('lang');
	const redirectUrl = url.searchParams.get('redirect');
	if (!lang) {
		return json({ error: 'No language provided' }, { status: 400 });
	}

	cookies.set('paraglide_lang', lang, { path: '/' });
	locals.lang = lang as AvailableLanguageTag;

	const canonicalPath = i18n.route(redirectUrl!);
	const localisedPath = i18n.resolveRoute(canonicalPath, lang as AvailableLanguageTag);

	redirect(302, localisedPath);
}
