import { shadeVar, type ShadeStep } from './shades';

/**
 * Toolbar rail and resting-button chrome.
 *
 * Defaults are the primary glass the editor already ships. A `data-mode` on
 * the toolbar reassigns these variables for that strip. Set the same
 * variables on any ancestor to overwrite a subtree without a mode. Mode
 * recipes reference shade variables, so overriding a shade retints them.
 */

export type ToolbarChrome = {
	rail: string;
	border: string;
	separator: string;
	buttonBorder: string;
	buttonGlass: string;
	buttonGlassHover: string;
	buttonText: string;
	buttonTextShadow: string;
	glow: string;
};

/** Primary glass. Matches the literals the toolbar used before modes existed. */
export const toolbarChromeValues = {
	rail: 'linear-gradient(180deg, rgba(130, 180, 230, 0.2), rgba(30, 60, 95, 0.28) 50%, rgba(8, 22, 38, 0.4))',
	border: 'rgba(97, 166, 232, 0.3)',
	separator: 'rgba(97, 166, 232, 0.4)',
	buttonBorder: 'rgba(150, 210, 255, 0.5)',
	buttonGlass:
		'linear-gradient(180deg, rgba(178, 219, 255, 0.34), rgba(30, 94, 148, 0.72) 48%, rgba(9, 34, 58, 0.92))',
	buttonGlassHover:
		'linear-gradient(180deg, rgba(218, 242, 255, 0.58), rgba(48, 137, 220, 0.86) 48%, rgba(11, 62, 112, 0.96))',
	buttonText: '#E8F4FF',
	buttonTextShadow: '0 1px 1px rgba(0,0,0,0.6)',
	glow: '0 0 18px rgba(97, 166, 232, 0.28)',
} as const satisfies ToolbarChrome;

/** Custom-property name per chrome token, sans the leading `--`. */
export const toolbarVarNames = {
	rail: 'zylem-toolbar-rail',
	border: 'zylem-toolbar-border',
	separator: 'zylem-toolbar-separator',
	buttonBorder: 'zylem-toolbar-button-border',
	buttonGlass: 'zylem-toolbar-button-glass',
	buttonGlassHover: 'zylem-toolbar-button-glass-hover',
	buttonText: 'zylem-toolbar-button-text',
	buttonTextShadow: 'zylem-toolbar-button-text-shadow',
	glow: 'zylem-toolbar-glow',
} as const satisfies Record<keyof ToolbarChrome, string>;

/** Colorway for a toolbar rail and its resting buttons. */
export type ToolbarMode =
	| 'primary'
	| 'black'
	| 'white'
	| 'brown'
	| 'yellow'
	| 'magenta'
	| 'purple';

type TintHue = 'brown' | 'yellow' | 'magenta' | 'purple';

function mix(color: string, amount: string): string {
	return `color-mix(in srgb, ${color} ${amount}, transparent)`;
}

/** Shared glass for a chromatic mode: light rim, saturated mid, deep base. */
function tintedToolbar(hue: TintHue): ToolbarChrome {
	const tone = (step: ShadeStep) => shadeVar(hue, step);
	return {
		rail: `linear-gradient(180deg, ${mix(tone(300), '22%')}, ${mix(tone(700), '30%')} 50%, ${mix(
			tone(900),
			'46%'
		)})`,
		border: mix(tone(500), '42%'),
		separator: mix(tone(300), '50%'),
		buttonBorder: mix(tone(100), '55%'),
		buttonGlass: `linear-gradient(180deg, ${mix(tone(100), '36%')}, ${mix(tone(500), '74%')} 48%, ${mix(
			tone(900),
			'92%'
		)})`,
		buttonGlassHover: `linear-gradient(180deg, ${mix(tone(100), '58%')}, ${mix(tone(300), '82%')} 48%, ${mix(
			tone(700),
			'94%'
		)})`,
		buttonText: tone(100),
		buttonTextShadow: '0 1px 1px rgba(0,0,0,0.6)',
		glow: `0 0 18px ${mix(tone(500), '36%')}`,
	};
}

function blackToolbar(): ToolbarChrome {
	const white = (step: ShadeStep) => shadeVar('white', step);
	const black = (step: ShadeStep) => shadeVar('black', step);
	return {
		rail: `linear-gradient(180deg, ${mix(black(500), '55%')}, ${mix(black(900), '82%')})`,
		border: mix(white(700), '28%'),
		separator: mix(white(500), '24%'),
		buttonBorder: mix(white(500), '32%'),
		buttonGlass: `linear-gradient(180deg, ${mix(black(300), '40%')}, ${mix(black(700), '88%')} 48%, ${black(
			900
		)})`,
		buttonGlassHover: `linear-gradient(180deg, ${mix(black(100), '28%')}, ${mix(black(500), '80%')} 48%, ${black(
			700
		)})`,
		buttonText: white(100),
		buttonTextShadow: '0 1px 1px rgba(0,0,0,0.6)',
		glow: `0 0 16px ${mix(white(500), '20%')}`,
	};
}

function whiteToolbar(): ToolbarChrome {
	const white = (step: ShadeStep) => shadeVar('white', step);
	const black = (step: ShadeStep) => shadeVar('black', step);
	return {
		rail: `linear-gradient(180deg, ${mix(white(100), '88%')}, ${mix(white(500), '72%')})`,
		border: mix(black(500), '28%'),
		separator: mix(black(500), '35%'),
		buttonBorder: mix(black(300), '45%'),
		buttonGlass: `linear-gradient(180deg, ${white(100)}, color-mix(in srgb, ${white(500)} 92%, ${black(
			300
		)}) 48%, color-mix(in srgb, ${white(700)} 90%, ${black(500)}))`,
		buttonGlassHover: `linear-gradient(180deg, ${white(100)}, ${white(300)} 48%, ${white(500)})`,
		buttonText: black(900),
		buttonTextShadow: '0 1px 1px rgba(255,255,255,0.65)',
		glow: `0 0 16px ${mix(white(100), '50%')}`,
	};
}

/** Chrome each mode assigns onto a toolbar. `primary` is the default glass. */
export const toolbarModes: Record<ToolbarMode, ToolbarChrome> = {
	primary: toolbarChromeValues,
	black: blackToolbar(),
	white: whiteToolbar(),
	brown: tintedToolbar('brown'),
	yellow: tintedToolbar('yellow'),
	magenta: tintedToolbar('magenta'),
	purple: tintedToolbar('purple'),
};
