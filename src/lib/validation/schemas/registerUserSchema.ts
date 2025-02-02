import {
	EMAIL_INVALID,
	INVALID_USERNAME,
	MAX_CHARACTERS_F,
	MIN_CHARACTERS_F,
	PW_NO_MATCH
} from '$lib/data/strings/ValidationMessages';
import formatString from '$lib/server/utils/utils';
import { z } from 'zod';
import validationRules from '../config/ValidationRules';
import { basePasswordSchema } from './basePasswordSchema';

export const registerUserSchema = z
	.object({
		username: z
			.string()
			.regex(/^[a-zA-Z][a-zA-Z0-9_-]{2,}$/, {
				message: INVALID_USERNAME
			})
			.min(validationRules.minUsernameLength, {
				message: formatString(MIN_CHARACTERS_F, validationRules.minUsernameLength)
			})
			.max(validationRules.maxUsernameLength, {
				message: formatString(MAX_CHARACTERS_F, validationRules.maxPasswordLength)
			}),
		email: z.string().email({ message: EMAIL_INVALID }),
		password: basePasswordSchema,
		confirm_password: basePasswordSchema
	})
	.refine((data) => data.password === data.confirm_password, {
		message: PW_NO_MATCH,
		path: ['confirm_password']
	});
