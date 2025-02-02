import {
	INVALID_USERNAME_OR_PASSWORD,
	UNKNOWN_ERROR,
	USER_WITH_THIS_EMAIL_ALREADY_EXISTS,
	USERNAME_TAKEN
} from '$lib/data/strings/ValidationMessages';

type BetterAuthError = {
	body: {
		code: string;
		message: string;
	};
};

export function getErrorCode(err: unknown): string {
	if (
		typeof err === 'object' &&
		err !== null &&
		'body' in err &&
		typeof (err as any).body === 'object' &&
		'code' in (err as any).body
	) {
		return getErrorMessageFromCode(err as unknown as BetterAuthError);
	}

	return UNKNOWN_ERROR;
}

function getErrorMessageFromCode(error: BetterAuthError) {
	const { code, message } = error.body;

	console.log('getErrorMessageFromCode results:');
	console.log('message', message);
	console.log('code', code);

	switch (code) {
		case 'INVALID_USERNAME_OR_PASSWORD':
			return INVALID_USERNAME_OR_PASSWORD;
		case 'USER_ALREADY_EXISTS':
			return USER_WITH_THIS_EMAIL_ALREADY_EXISTS;
		case 'USERNAME_IS_ALREADY_TAKEN_PLEASE_TRY_ANOTHER':
			return USERNAME_TAKEN;
		case 'FAILED_TO_CREATE_USER':
			return USERNAME_TAKEN;
		default:
			return message ?? UNKNOWN_ERROR;
	}
}

export default function formatString(template: string, ...args: any[]): string {
	return template.replace(/{(\d+)}/g, (match, number) => {
		return typeof args[number] !== 'undefined' ? args[number] : match;
	});
}
