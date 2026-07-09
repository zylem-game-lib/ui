import { globalStyle } from '@vanilla-extract/css';
import { vars } from '../../theme.css';

globalStyle('.zylem-window-controls', {
  display: 'flex',
  alignItems: 'center',
  gap: '7px',
});

/**
 * Shared glass icon button used for all panel chrome: window controls,
 * floating panels, and detached panels. `.floating-panel-button` is kept as
 * an alias so existing panel markup shares this single definition.
 */
globalStyle('.zylem-window-control, .floating-panel-button', {
  all: 'unset',
  boxSizing: 'border-box',
  cursor: 'pointer',
  minWidth: '18px',
  height: '18px',
  padding: '0 4px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '10px',
  lineHeight: 1,
  color: '#F4FAFF',
  textShadow: '0 1px 1px rgba(0,0,0,0.6)',
  borderRadius: vars.radii.control,
  border: '1px solid rgba(255,255,255,0.38)',
  background: vars.material.buttonGlass,
  boxShadow:
    'inset 1px 1px 0 rgba(255,255,255,0.5), inset -1px -1px 0 rgba(0,0,0,0.4), 0 1px 3px rgba(0,0,0,0.4)',
  transition: `filter ${vars.motion.fast} ${vars.motion.easeOut}, transform ${vars.motion.fast} ${vars.motion.easeOut}, background ${vars.motion.fast} ${vars.motion.easeOut}, border-color ${vars.motion.fast} ${vars.motion.easeOut}`,
});

globalStyle('.zylem-window-control:hover, .floating-panel-button:hover', {
  filter: 'brightness(1.2)',
  transform: 'translateY(-1px)',
});

globalStyle('.zylem-window-control:active, .floating-panel-button:active', {
  filter: 'brightness(0.9)',
  transform: 'translateY(1px)',
});

globalStyle(
  '.zylem-window-control:focus-visible, .floating-panel-button:focus-visible',
  {
    boxShadow: `inset 1px 1px 0 rgba(255,255,255,0.5), inset -1px -1px 0 rgba(0,0,0,0.4), ${vars.effects.focusRing}`,
  },
);

/** Close is neutral glass at rest and only turns accent on hover. */
globalStyle('.zylem-window-control--close:hover', {
  background: vars.colors.accent,
  borderColor: 'rgba(255, 160, 150, 0.75)',
  boxShadow: `inset 1px 1px 0 rgba(255,255,255,0.4), inset -1px -1px 0 rgba(0,0,0,0.4), ${vars.effects.glowDanger}`,
});
