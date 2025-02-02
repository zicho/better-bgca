// See https://svelte.dev/docs/kit/types#app.d.ts

import type { AvailableLanguageTag } from '$lib/paraglide/runtime';
import type { Session, User } from 'better-auth';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: User | null;
			session: Session | null;
			lang: AvailableLanguageTag;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
