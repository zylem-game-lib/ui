import { globalStyle } from '@vanilla-extract/css';
import { vars } from '../../theme.css';

globalStyle('.zylem-switch-root', {
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.spacing.sm,
  cursor: 'pointer',
  userSelect: 'none',
});

globalStyle('.zylem-switch-root[data-disabled]', {
  opacity: 0.5,
  cursor: 'not-allowed',
});

globalStyle('.zylem-switch-input', {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
});

globalStyle('.zylem-switch-control', {
  boxSizing: 'border-box',
  width: '38px',
  height: '20px',
  borderRadius: '999px',
  border: '1px solid rgba(97, 166, 232, 0.42)',
  background: vars.material.fieldGlass,
  boxShadow: vars.effects.shadowInset,
  padding: '2px',
  display: 'flex',
  alignItems: 'center',
  transition: `background ${vars.motion.normal} ${vars.motion.easeOut}, box-shadow ${vars.motion.normal} ${vars.motion.easeOut}`,
});

globalStyle('.zylem-switch-root[data-checked] .zylem-switch-control', {
  background:
    'linear-gradient(180deg, rgba(178, 219, 255, 0.3), rgba(30, 94, 148, 0.85))',
  boxShadow: `${vars.effects.shadowInset}, ${vars.effects.glowPrimary}`,
});

globalStyle('.zylem-switch-root:focus-within .zylem-switch-control', {
  boxShadow: `${vars.effects.shadowInset}, ${vars.effects.focusRing}`,
});

globalStyle('.zylem-switch-thumb', {
  width: '14px',
  height: '14px',
  borderRadius: '999px',
  border: '1px solid rgba(255,255,255,0.4)',
  background:
    'linear-gradient(180deg, rgba(240,250,255,0.95), rgba(160,200,235,0.9))',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.7), 0 1px 3px rgba(0,0,0,0.5)',
  transition: `transform ${vars.motion.normal} ${vars.motion.easeOut}`,
});

globalStyle('.zylem-switch-thumb[data-checked]', {
  transform: 'translateX(18px)',
});

globalStyle('.zylem-switch-label', {
  fontFamily: vars.typography.fontFamily,
  fontSize: vars.typography.fontSize,
  color: vars.colors.text,
});
