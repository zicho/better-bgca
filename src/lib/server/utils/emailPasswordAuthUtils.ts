import type { Session } from 'better-auth';
import { auth, type TAuthResponse } from '../auth';
import { getErrorCode } from './utils';

// Utility to parse the `set-cookie` header
function parseCookies(setCookieHeader: string) {
	const cookiesArray = setCookieHeader.split(/, (?=[^;]+=[^;]+)/); // Handle multiple cookies
	return cookiesArray.map((cookie) => {
		// Split cookie string and attributes
		const [cookieString, ...attributes] = cookie.split('; ');
		const [name, value] = cookieString.split('=');

		const opts = {
			path: '/',
			httpOnly: attributes.includes('HttpOnly'),
			sameSite: attributes.includes('SameSite=Lax') ? 'lax' : ('strict' as 'lax' | 'strict'),
			maxAge:
				Number(attributes.find((attr) => attr.startsWith('Max-Age'))?.split('=')[1]) ?? undefined
		};

		return {
			name,
			value: decodeURIComponent(value),
			opts
		};
	});
}

// Utility to handle API response and extract cookie session
async function handleAuthResponse(response: Response): Promise<TAuthResponse> {
	const setCookieHeader = response.headers.get('set-cookie');

	if (setCookieHeader) {
		const cookies = parseCookies(setCookieHeader);
		if (cookies.length > 0) {
			// Return the first cookie as the session (adjust if multiple sessions are expected)
			return {
				success: true,
				session: cookies[0]
			};
		}
	}

	return { success: false };
}

export async function signInUsername({
	user
}: {
	user: { username: string; password: string };
}): Promise<TAuthResponse> {
	try {
		const response = await auth.api.signInUsername({
			body: user,
			asResponse: true // Return raw response
		});

		return handleAuthResponse(response);
	} catch (err) {
		return { success: false, message: getErrorCode(err) };
	}
}

export async function signOut({
headers
}: {
headers: Headers;
}): Promise<TAuthResponse> {
	try {
		const response = await auth.api.signOut({
			headers,
			asResponse: true // Return raw response
		});

		return handleAuthResponse(response);
	} catch (err) {
		return { success: false, message: getErrorCode(err) };
	}
}

export async function signUpEmail({
	user
}: {
	user: {
		username: string;
		email: string;
		password: string;
	};
}): Promise<TAuthResponse> {
	try {
		const response = await auth.api.signUpEmail({
			body: {
				name: user.username,
				username: user.username,
				email: user.email,
				password: user.password
			},
			asResponse: true // Return raw response
		});

		return handleAuthResponse(response);
	} catch (err) {
		return { success: false, message: getErrorCode(err) };
	}
}
