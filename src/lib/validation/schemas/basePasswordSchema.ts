import {
	MAX_CHARACTERS_F,
	MIN_CHARACTERS_F,
	PW_NO_SPACES
} from '$lib/data/strings/ValidationMessages';
import { z } from 'zod';
import validationRules from '../config/ValidationRules';
import formatString from '$lib/server/utils/utils';

export const basePasswordSchema = z
	.string()
	.regex(/^[^\s]*$/, { message: PW_NO_SPACES })
	.min(validationRules.minPasswordLength, {
		message: formatString(MIN_CHARACTERS_F, validationRules.minPasswordLength)
	})
	.max(validationRules.maxPasswordLength, {
		message: formatString(MAX_CHARACTERS_F, validationRules.maxPasswordLength)
	})
	.trim();
