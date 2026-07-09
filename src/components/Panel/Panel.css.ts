import { globalStyle } from '@vanilla-extract/css';
import { vars } from '../../theme.css';

/**
 * Glass card: transparent panel with 1px electric-blue border, inner
 * highlight, subtle blur, and rounded panel corners.
 */
globalStyle('.zylem-panel', {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  minHeight: 0,
  borderRadius: vars.radii.panel,
  border: '1px solid rgba(97, 166, 232, 0.38)',
  background: vars.material.glassPanelDark,
  boxShadow:
    '0 16px 36px rgba(0,0,0,0.36), inset 0 1px 0 rgba(255,255,255,0.09)',
  backdropFilter: `blur(${vars.effects.blurSm}) saturate(1.14)`,
  overflow: 'hidden',
  '@supports': {
    'not (backdrop-filter: blur(1px))': {
      background: vars.colors.surface,
    },
  },
});

/**
 * Borderless variant: drops the outline, outer shadow, and background so a
 * panel can sit flush inside an already-outlined region (fewer outlines).
 */
globalStyle('.zylem-panel--borderless', {
  border: 'none',
  borderRadius: 0,
  background: 'transparent',
  boxShadow: 'none',
  backdropFilter: 'none',
  '@supports': {
    'not (backdrop-filter: blur(1px))': {
      background: 'transparent',
    },
  },
});

/** Brighter blue-glass variant for hero/window surfaces. */
globalStyle('.zylem-panel--window', {
  borderRadius: vars.radii.window,
  border: '1px solid rgba(146, 205, 255, 0.54)',
  boxShadow: vars.effects.shadowPanel,
  backdropFilter: `blur(${vars.effects.blurMd}) saturate(1.22)`,
});

/** Aqua-inspired glossy header strip for panels. */
globalStyle('.zylem-panel-header', {
  boxSizing: 'border-box',
  minHeight: '32px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: vars.spacing.sm,
  padding: `0 ${vars.spacing.md}`,
  borderBottom: '1px solid rgba(97, 166, 232, 0.22)',
  background: vars.material.panelHeaderGloss,
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15)',
  userSelect: 'none',
});

globalStyle('.zylem-panel-header-title', {
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '0.09em',
  textTransform: 'uppercase',
  color: vars.colors.text,
  fontFamily: vars.typography.fontFamily,
  textShadow: '0 1px 1px rgba(0,0,0,0.55)',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

globalStyle('.zylem-panel-body', {
  flex: 1,
  minHeight: 0,
  padding: vars.spacing.md,
});

globalStyle('.zylem-panel-body--flush', {
  padding: 0,
});
