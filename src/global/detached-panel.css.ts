import { globalStyle, keyframes } from '@vanilla-extract/css';
import { vars } from '../theme.css';

const dropIndicatorPulse = keyframes({
  from: { opacity: 0.6 },
  to: { opacity: 1 },
});

globalStyle('.detached-panel', {
  minWidth: '250px',
  minHeight: '150px',
  position: 'fixed',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: vars.radii.panel,
  border: '1px solid rgba(97, 166, 232, 0.38)',
  background: vars.material.glassPanelDark,
  boxShadow: vars.effects.shadowPanel,
  backdropFilter: `blur(${vars.effects.blurSm}) saturate(1.14)`,
  overflow: 'hidden',
  '@supports': {
    'not (backdrop-filter: blur(1px))': {
      background: vars.colors.surface,
    },
  },
});

globalStyle('.detached-panel-titlebar', {
  boxSizing: 'border-box',
  minHeight: '32px',
  padding: `0 ${vars.spacing.md}`,
  cursor: 'grab',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: vars.spacing.sm,
  userSelect: 'none',
  background: vars.material.glossyBar,
  borderBottom: '1px solid rgba(5, 18, 32, 0.85)',
  boxShadow:
    'inset 0 1px 0 rgba(255,255,255,0.62), inset 0 -1px 0 rgba(255,255,255,0.08)',
  color: '#F4FAFF',
  fontFamily: vars.typography.fontFamily,
  fontWeight: 700,
  fontSize: '12px',
  textShadow: '0 1px 1px rgba(0,0,0,0.65)',
});

globalStyle('.detached-panel-titlebar:active', {
  cursor: 'grabbing',
});

globalStyle('.detached-panel-content', {
  background: 'transparent',
  flex: 1,
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'column',
});

globalStyle('.accordion-item--dragging', {
  opacity: 0.5,
});

globalStyle('.accordion-drag-ghost', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: vars.material.glassPanelDark,
  border: '2px dotted rgba(230, 69, 52, 0.8)',
  borderRadius: vars.radii.panel,
  color: vars.colors.text,
  fontFamily: vars.typography.fontFamily,
  backdropFilter: `blur(${vars.effects.blurSm})`,
  boxShadow: `0 8px 24px rgba(0, 0, 0, 0.5), ${vars.effects.glowDanger}`,
  position: 'fixed',
  zIndex: 9999,
  pointerEvents: 'none',
});

globalStyle('.accordion-drop-indicator', {
  height: '4px',
  background: vars.colors.accent,
  borderRadius: '2px',
  margin: `${vars.spacing.sm} ${vars.spacing.md}`,
  boxShadow: `0 0 8px ${vars.colors.accent}`,
  animation: `${dropIndicatorPulse} 0.8s ease-in-out infinite alternate`,
});
