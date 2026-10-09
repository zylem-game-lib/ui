import { globalStyle } from '@vanilla-extract/css';
import { vars } from '../../theme.css';

/** Soft drop plus a light top rim and a darker lower edge. */
const jewelDepth =
  'inset 0 1px 0 rgba(255,255,255,0.72), inset 0 -1px 0 rgba(0,0,0,0.28), 0 2px 4px rgba(0,0,0,0.4)';

globalStyle('.zylem-window-controls', {
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
  gap: '6px',
});

/**
 * Shared glass jewel used for all panel chrome: window controls, floating
 * panels, and detached panels. `.floating-panel-button` is kept as an alias
 * so existing panel markup shares this single definition.
 *
 * Collapse (and the untyped alias) is blue glass; close is red glass.
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
  color: '#FFFFFF',
  borderRadius: '6px',
  border: '1px solid rgba(214, 234, 255, 0.82)',
  background:
    'linear-gradient(180deg, rgba(206, 230, 255, 0.78) 0%, rgba(96, 158, 216, 0.84) 42%, rgba(48, 108, 172, 0.92) 100%)',
  boxShadow: `${jewelDepth}, 0 0 8px rgba(97, 166, 232, 0.28)`,
  transition: `filter ${vars.motion.fast} ${vars.motion.easeOut}, transform ${vars.motion.fast} ${vars.motion.easeOut}, background ${vars.motion.fast} ${vars.motion.easeOut}, border-color ${vars.motion.fast} ${vars.motion.easeOut}, box-shadow ${vars.motion.fast} ${vars.motion.easeOut}`,
});

/** Top-edge gloss. Clipped by the button; the icon sits above it. */
globalStyle('.zylem-window-control::before, .floating-panel-button::before', {
  content: '""',
  position: 'absolute',
  left: '2px',
  right: '2px',
  top: '1px',
  height: '48%',
  borderRadius: '5px 5px 46% 46%',
  background:
    'linear-gradient(180deg, rgba(255,255,255,0.55), rgba(255,255,255,0.1) 55%, rgba(255,255,255,0))',
  pointerEvents: 'none',
});

globalStyle('.zylem-window-control svg, .floating-panel-button svg', {
  position: 'relative',
  zIndex: 1,
  display: 'block',
  filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.4))',
});

globalStyle('.zylem-window-control--close', {
  borderColor: 'rgba(255, 198, 188, 0.88)',
  background:
    'linear-gradient(180deg, rgba(255, 196, 186, 0.78) 0%, rgba(228, 82, 70, 0.9) 44%, rgba(186, 46, 40, 0.96) 100%)',
  boxShadow: `${jewelDepth}, 0 0 8px rgba(230, 69, 52, 0.34)`,
});

globalStyle('.zylem-window-control:hover, .floating-panel-button:hover', {
  filter: 'brightness(1.12)',
  transform: 'translateY(-1px)',
});

globalStyle('.zylem-window-control:active, .floating-panel-button:active', {
  filter: 'brightness(0.92)',
  transform: 'translateY(1px)',
});

globalStyle(
  '.zylem-window-control:focus-visible, .floating-panel-button:focus-visible',
  {
    boxShadow: `${jewelDepth}, 0 0 8px rgba(97, 166, 232, 0.28), ${vars.effects.focusRing}`,
  },
);

globalStyle('.zylem-window-control--close:focus-visible', {
  boxShadow: `${jewelDepth}, 0 0 8px rgba(230, 69, 52, 0.34), ${vars.effects.focusRing}`,
});
