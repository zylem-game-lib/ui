/**
 * Hue scales for tinted chrome, toolbar modes included.
 *
 * Each step is a `--zylem-shade-*` custom property. Overwrite the variable
 * and every recipe that references it — a yellow toolbar, for example —
 * follows. `100` is the light rim, `500` the base, `900` the deep end.
 * Fed to the theme as `tokens.shades` / `varNames.shades`.
 */

export const shadeValues = {
	yellow: {
		100: '#FFF6D0',
		300: '#FFE296',
		500: '#E2B12A',
		700: '#B48014',
		900: '#5C3A08',
	},
	brown: {
		100: '#F3E2CF',
		300: '#C4956A',
		500: '#8C5A32',
		700: '#5C3A22',
		900: '#2E1C12',
	},
	black: {
		100: '#E6EBEF',
		300: '#88929E',
		500: '#2D3643',
		700: '#1A1F27',
		900: '#11151C',
	},
	white: {
		100: '#FFFFFF',
		300: '#F4F8FC',
		500: '#E6EBEF',
		700: '#C5D0DC',
		900: '#8E9AAB',
	},
	magenta: {
		100: '#FFD6F2',
		300: '#F48AD4',
		500: '#E045A8',
		700: '#A02074',
		900: '#5A103C',
	},
	indigo: {
		100: '#E0E4FF',
		300: '#9AA6F5',
		500: '#5C6AD6',
		700: '#343E8C',
		900: '#1A2048',
	},
	red: {
		100: '#FFD8D2',
		300: '#F08A7C',
		500: '#E64534',
		700: '#A82F24',
		900: '#5C1610',
	},
	purple: {
		100: '#F0E4FF',
		300: '#C49AF0',
		500: '#8B5AD6',
		700: '#5A2E96',
		900: '#2E184C',
	},
} as const;

export type ShadeHue = keyof typeof shadeValues;
export type ShadeStep = keyof (typeof shadeValues)['yellow'];

/** Custom-property name per step, sans the leading `--`. Lock-step with {@link shadeValues}. */
export const shadeVarNames = {
	yellow: {
		100: 'zylem-shade-yellow-100',
		300: 'zylem-shade-yellow-300',
		500: 'zylem-shade-yellow-500',
		700: 'zylem-shade-yellow-700',
		900: 'zylem-shade-yellow-900',
	},
	brown: {
		100: 'zylem-shade-brown-100',
		300: 'zylem-shade-brown-300',
		500: 'zylem-shade-brown-500',
		700: 'zylem-shade-brown-700',
		900: 'zylem-shade-brown-900',
	},
	black: {
		100: 'zylem-shade-black-100',
		300: 'zylem-shade-black-300',
		500: 'zylem-shade-black-500',
		700: 'zylem-shade-black-700',
		900: 'zylem-shade-black-900',
	},
	white: {
		100: 'zylem-shade-white-100',
		300: 'zylem-shade-white-300',
		500: 'zylem-shade-white-500',
		700: 'zylem-shade-white-700',
		900: 'zylem-shade-white-900',
	},
	magenta: {
		100: 'zylem-shade-magenta-100',
		300: 'zylem-shade-magenta-300',
		500: 'zylem-shade-magenta-500',
		700: 'zylem-shade-magenta-700',
		900: 'zylem-shade-magenta-900',
	},
	indigo: {
		100: 'zylem-shade-indigo-100',
		300: 'zylem-shade-indigo-300',
		500: 'zylem-shade-indigo-500',
		700: 'zylem-shade-indigo-700',
		900: 'zylem-shade-indigo-900',
	},
	red: {
		100: 'zylem-shade-red-100',
		300: 'zylem-shade-red-300',
		500: 'zylem-shade-red-500',
		700: 'zylem-shade-red-700',
		900: 'zylem-shade-red-900',
	},
	purple: {
		100: 'zylem-shade-purple-100',
		300: 'zylem-shade-purple-300',
		500: 'zylem-shade-purple-500',
		700: 'zylem-shade-purple-700',
		900: 'zylem-shade-purple-900',
	},
} as const;

/** `var(--zylem-shade-*)` for a step, without loading the theme contract. */
export function shadeVar(hue: ShadeHue, step: ShadeStep): string {
	return `var(--${shadeVarNames[hue][step]})`;
}
