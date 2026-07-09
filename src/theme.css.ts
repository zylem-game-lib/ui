import {
	createGlobalTheme,
	createGlobalThemeContract,
} from '@vanilla-extract/css';

/**
 * Concrete design-token values for the Zylem UI.
 *
 * Each leaf in this object is paired with a CSS custom-property name in
 * {@link varNames}. The two structures must stay in lock-step. Values feed
 * `createGlobalTheme`; names feed `createGlobalThemeContract` so the
 * generated CSS variables keep their legacy `--zylem-*` identifiers.
 */
const tokens = {
	colors: {
		primary: '#61A6E8',
		primaryHover: '#3B8AD8',
		primaryActive: '#0C6EB8',

		accent: '#E64534',
		accentHover: '#C93A2C',
		accentActive: '#A82F24',

		background: '#11151C',
		backgroundTranslucent: 'rgba(10, 20, 30, 0.46)',
		surface: '#1A1F27',
		surfaceHover: '#222831',
		border: '#2D3643',

		active: 'rgba(20, 255, 60, 0.7)',
		activeHover: 'rgba(20, 255, 60, 0.4)',
		successHover: '#2a6734b3',

		text: '#E6EBEF',
		textSecondary: '#88929E',

		consoleBackground: 'rgba(20, 40, 60, 0.25)',
		consoleText: '#61A6E8',
	},
	spacing: {
		xxs: '0.125rem',
		xs: '0.25rem',
		sm: '0.5rem',
		md: '0.75rem',
		lg: '1rem',
		xl: '1.5rem',
		xxl: '2rem',
		xxxl: '3rem',
	},
	sizes: {
		icon: '28px',
		iconSm: '16px',
		iconLg: '96px',
	},
	typography: {
		fontFamily: "'Exo 2', sans-serif",
		fontSize: '14px',
	},
	borders: {
		radius: '12px',
		width: '1.5px',
	},
	material: {
		glassPanel:
			'linear-gradient(180deg, rgba(38, 76, 112, 0.74), rgba(10, 24, 38, 0.58))',
		glassPanelDark:
			'linear-gradient(180deg, rgba(26, 31, 39, 0.75), rgba(10, 20, 30, 0.68))',
		glossyBar:
			'linear-gradient(180deg, rgba(205, 232, 255, 0.55) 0%, rgba(97, 166, 232, 0.34) 38%, rgba(18, 54, 88, 0.86) 100%)',
		buttonGlass:
			'linear-gradient(180deg, rgba(178, 219, 255, 0.34), rgba(30, 94, 148, 0.72) 48%, rgba(9, 34, 58, 0.92))',
		buttonGlassHover:
			'linear-gradient(180deg, rgba(218, 242, 255, 0.58), rgba(48, 137, 220, 0.86) 48%, rgba(11, 62, 112, 0.96))',
		buttonGlassActive:
			'linear-gradient(180deg, rgba(190, 255, 203, 0.42), rgba(28, 174, 63, 0.78) 50%, rgba(9, 86, 31, 0.95))',
		buttonGlassDanger:
			'linear-gradient(180deg, rgba(255, 210, 202, 0.36), rgba(230, 69, 52, 0.82) 50%, rgba(96, 18, 13, 0.94))',
		fieldGlass:
			'linear-gradient(180deg, rgba(8, 19, 31, 0.82), rgba(15, 39, 62, 0.72))',
		panelHeaderGloss:
			'linear-gradient(180deg, rgba(190, 226, 255, 0.18), rgba(61, 118, 165, 0.16) 46%, rgba(10, 27, 44, 0.26))',
	},
	effects: {
		blurSm: '8px',
		blurMd: '14px',
		blurLg: '24px',

		shadowPanel:
			'0 22px 54px rgba(0, 0, 0, 0.48), inset 0 1px 0 rgba(255, 255, 255, 0.10)',
		shadowButton:
			'inset 0 1px 0 rgba(255,255,255,0.38), inset 0 -1px 0 rgba(0,0,0,0.45), 0 2px 7px rgba(0,0,0,0.35)',
		shadowInset:
			'inset 0 1px 2px rgba(0,0,0,0.42), inset 0 -1px 0 rgba(255,255,255,0.08)',

		glowPrimary: '0 0 18px rgba(97, 166, 232, 0.28)',
		glowActive: '0 0 20px rgba(20, 255, 60, 0.26)',
		glowDanger: '0 0 20px rgba(230, 69, 52, 0.24)',

		focusRing:
			'0 0 0 2px rgba(97, 166, 232, 0.38), 0 0 18px rgba(97, 166, 232, 0.22)',
	},
	radii: {
		window: '14px',
		panel: '12px',
		button: '7px',
		control: '6px',
		card: '10px',
	},
	motion: {
		fast: '120ms',
		normal: '160ms',
		easeOut: 'cubic-bezier(.2,.8,.2,1)',
	},
} as const;

/**
 * Mirror of {@link tokens} where each leaf is the CSS custom-property name
 * (sans the leading `--`). Passed to `createGlobalThemeContract` so the
 * generated `var(...)` references resolve to the legacy `--zylem-*`
 * identifiers that the rest of the codebase already consumes.
 */
const varNames = {
	colors: {
		primary: 'zylem-color-primary',
		primaryHover: 'zylem-color-primary-hover',
		primaryActive: 'zylem-color-primary-active',

		accent: 'zylem-color-accent',
		accentHover: 'zylem-color-accent-hover',
		accentActive: 'zylem-color-accent-active',

		background: 'zylem-color-background',
		backgroundTranslucent: 'zylem-color-background-translucent',
		surface: 'zylem-color-surface',
		surfaceHover: 'zylem-color-surface-hover',
		border: 'zylem-color-border',

		active: 'zylem-color-active',
		activeHover: 'zylem-color-active-hover',
		successHover: 'zylem-color-success-hover',

		text: 'zylem-color-text',
		textSecondary: 'zylem-color-text-secondary',

		consoleBackground: 'zylem-color-console-background',
		consoleText: 'zylem-color-console-text',
	},
	spacing: {
		xxs: 'zylem-spacing-xxs',
		xs: 'zylem-spacing-xs',
		sm: 'zylem-spacing-sm',
		md: 'zylem-spacing-md',
		lg: 'zylem-spacing-lg',
		xl: 'zylem-spacing-xl',
		xxl: 'zylem-spacing-xxl',
		xxxl: 'zylem-spacing-xxxl',
	},
	sizes: {
		icon: 'zylem-size-icon',
		iconSm: 'zylem-size-icon-sm',
		iconLg: 'zylem-size-icon-lg',
	},
	typography: {
		fontFamily: 'zylem-font-family',
		fontSize: 'zylem-font-size',
	},
	borders: {
		radius: 'zylem-radius',
		width: 'zylem-border',
	},
	material: {
		glassPanel: 'zylem-material-glass-panel',
		glassPanelDark: 'zylem-material-glass-panel-dark',
		glossyBar: 'zylem-material-glossy-bar',
		buttonGlass: 'zylem-material-button-glass',
		buttonGlassHover: 'zylem-material-button-glass-hover',
		buttonGlassActive: 'zylem-material-button-glass-active',
		buttonGlassDanger: 'zylem-material-button-glass-danger',
		fieldGlass: 'zylem-material-field-glass',
		panelHeaderGloss: 'zylem-material-panel-header-gloss',
	},
	effects: {
		blurSm: 'zylem-effect-blur-sm',
		blurMd: 'zylem-effect-blur-md',
		blurLg: 'zylem-effect-blur-lg',

		shadowPanel: 'zylem-effect-shadow-panel',
		shadowButton: 'zylem-effect-shadow-button',
		shadowInset: 'zylem-effect-shadow-inset',

		glowPrimary: 'zylem-effect-glow-primary',
		glowActive: 'zylem-effect-glow-active',
		glowDanger: 'zylem-effect-glow-danger',

		focusRing: 'zylem-effect-focus-ring',
	},
	radii: {
		window: 'zylem-radius-window',
		panel: 'zylem-radius-panel',
		button: 'zylem-radius-button',
		control: 'zylem-radius-control',
		card: 'zylem-radius-card',
	},
	motion: {
		fast: 'zylem-motion-fast',
		normal: 'zylem-motion-normal',
		easeOut: 'zylem-motion-ease-out',
	},
} as const;

/**
 * Typed `vars` contract — leaves resolve to `var(--zylem-*)` strings. Use
 * inside `style()` / `globalStyle()` / `sprinkles()` to consume the design
 * tokens with autocomplete and type safety.
 */
export const vars = createGlobalThemeContract(varNames);

// `:host` is included so the tokens also resolve inside the editor web
// component's shadow DOM, where `:root` doesn't match (see logo.css.ts).
createGlobalTheme(':root, :host', vars, tokens);

/** Token values as a plain readonly object, exported for downstream tooling. */
export const tokenValues = tokens;
