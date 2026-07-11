import { globalStyle } from '@vanilla-extract/css';
import { vars } from '../theme.css';

// :where() keeps this shadow-DOM reset at zero specificity so consuming
// apps' own button rules (and universal box-sizing rules) still win.
globalStyle(':where(button)', {
  all: 'unset',
});

globalStyle('#zylem-editor-container', {
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 1,
  pointerEvents: 'none',
});

globalStyle('#zylem-editor-toggle', {
  width: vars.sizes.iconLg,
  height: vars.sizes.iconLg,
  backgroundImage: 'var(--zylem-logo-url)',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  cursor: 'grab',
  zIndex: 1,
  pointerEvents: 'auto',
  filter: 'drop-shadow(0 0 10px rgba(97, 166, 232, 0.35))',
});

globalStyle('.zylem-exo-2', {
  fontFamily: vars.typography.fontFamily,
  fontOpticalSizing: 'auto',
  fontWeight: 400,
  fontStyle: 'normal',
});

globalStyle('.scrollable-y', {
  overflowY: 'scroll',
  overflowX: 'hidden',
  scrollBehavior: 'smooth',
});

globalStyle('.scroll-thin', {
  scrollbarWidth: 'thin',
  scrollbarColor: 'rgba(97,166,232,0.55) rgba(10,20,30,0.5)',
});

globalStyle('.scroll-thin::-webkit-scrollbar', {
  width: '6px',
  height: '6px',
});

globalStyle('.scroll-thin::-webkit-scrollbar-track', {
  background: 'transparent',
});

globalStyle('.scroll-thin::-webkit-scrollbar-thumb', {
  borderRadius: '999px',
  background:
    'linear-gradient(90deg, rgba(220,242,255,0.4), rgba(97,166,232,0.65) 42%, rgba(19,62,102,0.9))',
});

globalStyle('.scroll-thin::-webkit-scrollbar-thumb:hover', {
  background:
    'linear-gradient(90deg, rgba(240,250,255,0.6), rgba(97,166,232,0.9) 42%, rgba(21,76,130,0.98))',
});

// Icon default for toolbar/editor icons.
globalStyle('.zylem-icon', {
  width: '18px',
  height: '18px',
  stroke: 'currentColor',
  filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.55))',
});

/**
 * Floating panel chrome (editor main panel). Glass window with a glossy
 * molded title bar.
 */
globalStyle('.floating-panel', {
  borderRadius: vars.radii.window,
  border: '1px solid rgba(146, 205, 255, 0.54)',
  background: vars.material.glassPanelDark,
  boxShadow: vars.effects.shadowPanel,
  backdropFilter: `blur(${vars.effects.blurMd}) saturate(1.22)`,
  overflow: 'hidden',
  pointerEvents: 'auto',
  '@supports': {
    'not (backdrop-filter: blur(1px))': {
      background: vars.colors.surface,
    },
  },
});

globalStyle('.floating-panel-titlebar', {
  minHeight: '34px',
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  padding: `0 ${vars.spacing.md}`,
  background: vars.material.glossyBar,
  borderBottom: '1px solid rgba(5, 18, 32, 0.85)',
  boxShadow:
    'inset 0 1px 0 rgba(255,255,255,0.62), inset 0 -1px 0 rgba(255,255,255,0.08)',
  fontFamily: vars.typography.fontFamily,
  fontWeight: 700,
  cursor: 'grab',
  userSelect: 'none',
  transition: `filter ${vars.motion.fast} ${vars.motion.easeOut}`,
});

globalStyle('.floating-panel-titlebar:hover', {
  filter: 'brightness(1.08)',
});

globalStyle('.floating-panel-titlebar:active', {
  filter: 'brightness(0.95)',
  cursor: 'grabbing',
});

globalStyle('.floating-panel-title', {
  fontSize: '13px',
  letterSpacing: '0.02em',
  color: '#F4FAFF',
  textShadow: '0 1px 1px rgba(0,0,0,0.65)',
});

// `.floating-panel-button` styles live in WindowControls.css.ts, shared
// with `.zylem-window-control`.

globalStyle('.floating-panel-content', {
  background: 'transparent',
});

globalStyle('.floating-panel-controls', {
  display: 'flex',
  alignItems: 'center',
  gap: '7px',
});

globalStyle('.zylem-section', {
  padding: vars.spacing.sm,
});

globalStyle('.zylem-section-title', {
  margin: `0 0 ${vars.spacing.sm} 0`,
  fontSize: '11px',
  fontFamily: vars.typography.fontFamily,
  color: vars.colors.textSecondary,
  fontWeight: 700,
  letterSpacing: '0.09em',
  textTransform: 'uppercase',
});

/** Entity grid: glossy glass icon tiles. Type names use portaled `.zylem-tooltip`. */
globalStyle('.entity-grid', {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(40px, 1fr))',
  gap: vars.spacing.xs,
});

/** Tooltip/trigger wrappers must fill the cell so the icon button keeps a square. */
globalStyle('.entity-grid > *', {
  display: 'flex',
  minWidth: 0,
  aspectRatio: '1',
});

globalStyle('.entity-grid-item', {
  position: 'relative',
  flex: 1,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: vars.material.buttonGlass,
  border: '1px solid rgba(150, 210, 255, 0.5)',
  borderRadius: vars.radii.control,
  boxShadow: vars.effects.shadowButton,
  cursor: 'pointer',
  color: vars.colors.textSecondary,
  transition: `background ${vars.motion.fast} ${vars.motion.easeOut}, border-color ${vars.motion.fast} ${vars.motion.easeOut}, transform ${vars.motion.fast} ${vars.motion.easeOut}, box-shadow ${vars.motion.fast} ${vars.motion.easeOut}, filter ${vars.motion.fast} ${vars.motion.easeOut}`,
});

globalStyle('.entity-grid-item:hover', {
  background: vars.material.buttonGlassHover,
  borderColor: 'rgba(150, 210, 255, 0.75)',
  boxShadow: `${vars.effects.shadowButton}, ${vars.effects.glowPrimary}`,
  transform: 'translateY(-1px)',
  color: '#F4FAFF',
});

globalStyle('.entity-grid-item:active', {
  transform: 'translateY(1px)',
  filter: 'brightness(0.92)',
  boxShadow:
    'inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -1px 0 rgba(255,255,255,0.55), inset 0 2px 3px rgba(0,0,0,0.28), 0 1px 3px rgba(0,0,0,0.28)',
});

globalStyle('.entity-grid-item:focus-visible', {
  outline: 'none',
  boxShadow: `${vars.effects.shadowButton}, ${vars.effects.focusRing}`,
});

globalStyle('.entity-icon', {
  width: '20px',
  height: '20px',
  color: 'currentColor',
  position: 'relative',
  zIndex: 1,
  filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.55))',
});

globalStyle('.entity-grid-item:hover .entity-icon', {
  color: '#F4FAFF',
});
