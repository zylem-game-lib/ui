import { globalStyle, keyframes } from '@vanilla-extract/css';
import { LAYER_PORTAL_CLASS } from '../../layers/resolve-mount';
import { vars } from '../../theme.css';

const backdropEnter = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const contentEnter = keyframes({
  from: { opacity: 0, transform: 'translateY(8px) scale(0.98)' },
  to: { opacity: 1, transform: 'translateY(0) scale(1)' },
});

// The <dialog> is a transparent sheet over the whole viewport; the card inside
// is the visible window. Undoes the UA's `dialog:modal` box (centered,
// max-sized, scrolling) but never sets `display`, which would override the UA
// rule that hides a closed dialog.
globalStyle('.zylem-dialog', {
  position: 'fixed',
  inset: 0,
  width: '100%',
  height: '100%',
  maxWidth: 'none',
  maxHeight: 'none',
  margin: 0,
  padding: 0,
  border: 0,
  background: 'transparent',
  color: 'inherit',
  font: 'inherit',
  overflow: 'visible',
  outline: 'none',
});

globalStyle('.zylem-dialog::backdrop', {
  background: 'rgba(5, 10, 18, 0.6)',
  backdropFilter: 'blur(3px)',
  animation: `${backdropEnter} 0.15s ${vars.motion.easeOut}`,
});

globalStyle('html:has(.zylem-dialog[open])', {
  overflow: 'hidden',
});

globalStyle('.zylem-dialog-positioner', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxSizing: 'border-box',
  width: '100%',
  height: '100%',
  padding: vars.spacing.lg,
});

// The scope's portal container, where overlays opened from the dialog mount.
// Out of flow so it takes no part in centering the card, at the dialog's
// origin, which is the viewport's.
globalStyle(`.zylem-dialog-positioner > .${LAYER_PORTAL_CLASS}`, {
  position: 'absolute',
  top: 0,
  left: 0,
});

globalStyle('.zylem-dialog-content', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '440px',
  maxHeight: '100%',
  minHeight: 0,
  borderRadius: vars.radii.window,
  border: '1px solid rgba(146, 205, 255, 0.54)',
  background: vars.material.glassPanelDark,
  boxShadow: vars.effects.shadowPanel,
  backdropFilter: `blur(${vars.effects.blurMd}) saturate(1.22)`,
  overflow: 'hidden',
  animation: `${contentEnter} 0.16s ${vars.motion.easeOut}`,
  '@supports': {
    'not (backdrop-filter: blur(1px))': {
      background: vars.colors.surface,
    },
  },
});

globalStyle('.zylem-dialog-content[data-size="lg"]', {
  maxWidth: '760px',
});

// Fullscreen fills the positioner (viewport minus its padding). The body takes
// whatever height the header and footer leave, so browser-style content can
// hand scrolling to its own columns.
globalStyle('.zylem-dialog-content[data-size="fullscreen"]', {
  maxWidth: 'none',
  height: '100%',
  borderRadius: vars.radii.card,
});

globalStyle('.zylem-dialog-header', {
  flex: 'none',
  minHeight: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: vars.spacing.md,
  padding: `${vars.spacing.xs} ${vars.spacing.md}`,
  background: vars.material.glossyBar,
  borderBottom: '1px solid rgba(5, 18, 32, 0.85)',
  boxShadow:
    'inset 0 1px 0 rgba(255,255,255,0.62), inset 0 -1px 0 rgba(255,255,255,0.08)',
});

globalStyle('.zylem-dialog-titles', {
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  flex: '1 1 auto',
  minWidth: 0,
});

globalStyle('.zylem-dialog-title', {
  margin: 0,
  fontSize: '13px',
  fontWeight: 700,
  letterSpacing: '0.02em',
  color: '#F4FAFF',
  fontFamily: vars.typography.fontFamily,
  textShadow: '0 1px 1px rgba(0,0,0,0.65)',
});

globalStyle('.zylem-dialog-subtitle', {
  margin: 0,
  fontSize: `calc(${vars.typography.fontSize} - 2px)`,
  fontWeight: 500,
  color: 'rgba(232, 244, 255, 0.78)',
  fontFamily: vars.typography.fontFamily,
  textShadow: '0 1px 1px rgba(0,0,0,0.5)',
});

globalStyle('.zylem-dialog-header-extra', {
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.sm,
  flex: 'none',
});

globalStyle('.zylem-dialog-body', {
  flex: '1 1 auto',
  minHeight: 0,
  overflow: 'auto',
  padding: vars.spacing.lg,
  color: vars.colors.text,
  fontFamily: vars.typography.fontFamily,
  fontSize: vars.typography.fontSize,
  lineHeight: 1.45,
});

// In fullscreen the body becomes a flex column so content can lay out against
// the dialog's height (and own its scrolling).
globalStyle('.zylem-dialog-content[data-size="fullscreen"] .zylem-dialog-body', {
  display: 'flex',
  flexDirection: 'column',
});

globalStyle('.zylem-dialog-footer', {
  flex: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: vars.spacing.sm,
  padding: `0 ${vars.spacing.lg} ${vars.spacing.lg}`,
});

globalStyle('.zylem-dialog-content[data-size="fullscreen"] .zylem-dialog-footer', {
  padding: `${vars.spacing.sm} ${vars.spacing.lg}`,
  borderTop: '1px solid rgba(97, 166, 232, 0.28)',
  background: 'rgba(4, 12, 20, 0.6)',
});
