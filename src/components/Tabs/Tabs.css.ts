import { globalStyle } from '@vanilla-extract/css';
import { vars } from '../../theme.css';

globalStyle('.zylem-tabs-root', {
  display: 'flex',
  flexDirection: 'column',
  minHeight: 0,
  width: '100%',
});

// Stack-card tab list: tabs read as cards peeking out of a stack.
globalStyle('.zylem-tabs-list', {
  display: 'flex',
  alignItems: 'flex-end',
  gap: '3px',
  position: 'relative',
  padding: `${vars.spacing.xs} ${vars.spacing.xs} 0`,
});

globalStyle('.zylem-tabs-trigger', {
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.spacing.xs,
  padding: `${vars.spacing.xs} ${vars.spacing.md}`,
  borderRadius: `${vars.radii.button} ${vars.radii.button} 0 0`,
  border: '1px solid rgba(97, 166, 232, 0.3)',
  borderBottom: 'none',
  background:
    'linear-gradient(180deg, rgba(26, 31, 39, 0.6), rgba(10, 20, 30, 0.5))',
  color: vars.colors.textSecondary,
  fontFamily: vars.typography.fontFamily,
  fontSize: `calc(${vars.typography.fontSize} - 1px)`,
  fontWeight: 600,
  cursor: 'pointer',
  outline: 'none',
  transition: `background ${vars.motion.fast} ${vars.motion.easeOut}, color ${vars.motion.fast} ${vars.motion.easeOut}`,
});

globalStyle('.zylem-tabs-trigger:hover', {
  color: vars.colors.text,
  background:
    'linear-gradient(180deg, rgba(38, 76, 112, 0.5), rgba(15, 39, 62, 0.45))',
});

globalStyle('.zylem-tabs-trigger[data-selected]', {
  color: '#F4FAFF',
  background: vars.material.buttonGlass,
  borderColor: 'rgba(150, 210, 255, 0.55)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.35)',
  textShadow: '0 1px 1px rgba(0,0,0,0.6)',
});

globalStyle('.zylem-tabs-trigger:focus-visible', {
  boxShadow: vars.effects.focusRing,
});

globalStyle('.zylem-tabs-trigger[data-disabled]', {
  opacity: 0.45,
  cursor: 'not-allowed',
});

globalStyle('.zylem-tabs-content', {
  flex: 1,
  minHeight: 0,
  borderRadius: `0 ${vars.radii.card} ${vars.radii.card} ${vars.radii.card}`,
  border: '1px solid rgba(97, 166, 232, 0.3)',
  background: vars.material.glassPanelDark,
  padding: vars.spacing.md,
  outline: 'none',
});
