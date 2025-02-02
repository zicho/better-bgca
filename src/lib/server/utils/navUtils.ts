import { i18n } from "$lib/i18n";
import type { AvailableLanguageTag } from "$lib/paraglide/runtime";
import { redirect } from "@sveltejs/kit";

export function i18nRedirect(path: string, lang: AvailableLanguageTag) {
    return redirect(302, i18n.resolveRoute(path, lang));
}