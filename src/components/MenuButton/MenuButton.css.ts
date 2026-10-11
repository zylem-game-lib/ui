import { globalStyle } from '@vanilla-extract/css';
import { vars } from '../../theme.css';

/**
 * Split button with an attached menu. The face reuses `.zylem-toolbar-btn` for
 * its look, so a MenuButton dropped into a toolbar matches its neighbours.
 */

globalStyle('.zylem-menu-button', {
	position: 'relative',
	display: 'inline-flex',
	alignItems: 'stretch',
});

globalStyle('.zylem-menu-button__face', {
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
});

/*
 * The chevron overlaps the face's trailing corner rather than sitting beside it,
 * so gaining a second affordance does not widen the button and break a toolbar's
 * rhythm.
 */
globalStyle('.zylem-menu-button__chevron', {
	position: 'absolute',
	right: '-5px',
	bottom: '-5px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: '18px',
	height: '18px',
	padding: 0,
	color: vars.colors.text,
	background: vars.colors.border,
	border: `0.5px solid ${vars.colors.surface}`,
	borderRadius: '50%',
	cursor: 'pointer',
	transition: `color ${vars.motion.fast} ${vars.motion.easeOut}`,
});

globalStyle('.zylem-menu-button__chevron svg', {
	width: '18px',
	height: '18px',
	stroke: 'currentColor',
});

/*
 * The non-split chevron is decoration over a face that is already the trigger.
 * Ignoring the pointer keeps it from hovering or hit-testing like its own
 * control, and lets clicks through to the face beneath.
 */
globalStyle('.zylem-menu-button__chevron--static', {
	pointerEvents: 'none',
});

globalStyle('.zylem-menu-button__chevron:hover:not([disabled])', {
	color: '#fff',
});

globalStyle('.zylem-menu-button__chevron:focus-visible', {
	outline: 'none',
	boxShadow: vars.effects.focusRing,
});

globalStyle('.zylem-menu-button__chevron[disabled]', {
	opacity: 0.45,
	cursor: 'not-allowed',
});

globalStyle('.zylem-menu-button__panel', {
	zIndex: vars.layers.menu,
	color: vars.colors.text,
	fontFamily: vars.typography.fontFamily,
	borderRadius: vars.radii.panel,
	border: '1px solid rgba(97, 166, 232, 0.45)',
	background: vars.material.glassPanelDark,
	boxShadow: vars.effects.shadowPanel,
	backdropFilter: `blur(${vars.effects.blurMd}) saturate(1.22)`,
	outline: 'none',
	'@supports': {
		'not (backdrop-filter: blur(1px))': {
			background: vars.colors.surface,
		},
	},
});

/** Icon glyphs supplied as inline SVG markup rather than components. */
globalStyle('.zylem-menu-button__face svg', {
	width: '18px',
	height: '18px',
});
