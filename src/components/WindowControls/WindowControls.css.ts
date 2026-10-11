import { globalStyle } from '@vanilla-extract/css';
import { vars } from '../../theme.css';

globalStyle('.zylem-window-controls', {
	display: 'flex',
	alignItems: 'center',
	flexShrink: 0,
	gap: '6px',
});

/**
 * Shared ghost control used for panel chrome: window controls, floating
 * panels, and detached panels. `.floating-panel-button` is kept as an alias
 * so existing panel markup shares this single definition.
 *
 * Resting controls match the ghost button. Close stays that way until it is
 * hovered or focused, when it takes the danger color.
 */
globalStyle('.zylem-window-control, .floating-panel-button', {
	all: 'unset',
	boxSizing: 'border-box',
	position: 'relative',
	cursor: 'pointer',
	flexShrink: 0,
	width: '28px',
	height: '18px',
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
	color: vars.colors.primary,
	borderRadius: '6px',
	border: '1px solid rgba(97, 166, 232, 0.35)',
	background: 'transparent',
	boxShadow: 'none',
	transition: `color ${vars.motion.fast} ${vars.motion.easeOut}, transform ${vars.motion.fast} ${vars.motion.easeOut}, background ${vars.motion.fast} ${vars.motion.easeOut}, border-color ${vars.motion.fast} ${vars.motion.easeOut}, box-shadow ${vars.motion.fast} ${vars.motion.easeOut}`,
});

globalStyle('.zylem-window-control svg, .floating-panel-button svg', {
	position: 'relative',
	zIndex: 1,
	display: 'block',
});

globalStyle('.zylem-window-control:hover, .floating-panel-button:hover', {
	background: 'rgba(97, 166, 232, 0.12)',
	boxShadow: vars.effects.glowPrimary,
	color: vars.colors.primary,
	transform: 'translateY(-1px)',
});

globalStyle('.zylem-window-control:active, .floating-panel-button:active', {
	transform: 'translateY(1px)',
});

globalStyle('.zylem-window-control:focus-visible, .floating-panel-button:focus-visible', {
	background: 'rgba(97, 166, 232, 0.12)',
	boxShadow: `${vars.effects.glowPrimary}, ${vars.effects.focusRing}`,
});

globalStyle('.zylem-window-control--close:hover', {
	borderColor: 'rgba(255, 132, 114, 0.78)',
	background: 'rgba(230, 69, 52, 0.16)',
	color: '#ffb4a8',
	boxShadow: vars.effects.glowDanger,
});

globalStyle('.zylem-window-control--close:focus-visible', {
	borderColor: 'rgba(255, 132, 114, 0.78)',
	background: 'rgba(230, 69, 52, 0.16)',
	color: '#ffb4a8',
	boxShadow: `${vars.effects.glowDanger}, ${vars.effects.focusRing}`,
});
