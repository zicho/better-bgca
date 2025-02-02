import typography from '@tailwindcss/typography';
import daisyui from 'daisyui';
import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {}
	},
	daisyui: {
		themes: [
			{
				default: {
					...require('daisyui/src/theming/themes')['lofi'],
					'base-100': colors.zinc['100'],
					'base-200': colors.zinc['200'],
					'base-300': colors.zinc['300'],
					primary: colors.emerald['600'],
					secondary: colors.zinc['900'],
					// 'secondary-content': colors.zinc['900'],
					accent: colors.slate['300'],
					'accent-content': colors.stone['800'],
					error: colors.red['500'],
					success: colors.green['400'],
					info: colors.sky['300'],
					warning: colors.amber['300']
				}
			}
		]
	},
	plugins: [typography, daisyui]
} satisfies Config;
