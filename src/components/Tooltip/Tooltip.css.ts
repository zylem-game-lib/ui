import { globalStyle, keyframes } from '@vanilla-extract/css';
import { vars } from '../../theme.css';

const enter = keyframes({
  from: { opacity: 0, transform: 'translateY(4px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

globalStyle('.zylem-tooltip', {
  position: 'relative',
  zIndex: 10050,
  maxWidth: '260px',
  padding: `${vars.spacing.xs} ${vars.spacing.sm}`,
  borderRadius: vars.radii.control,
  border: '1px solid rgba(97, 166, 232, 0.45)',
  background: vars.material.glassPanelDark,
  boxShadow:
    '0 8px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.12)',
  backdropFilter: `blur(${vars.effects.blurSm}) saturate(1.15)`,
  color: vars.colors.text,
  fontFamily: vars.typography.fontFamily,
  fontSize: `calc(${vars.typography.fontSize} - 1px)`,
  fontWeight: 600,
  letterSpacing: '0.02em',
  pointerEvents: 'none',
  '@supports': {
    'not (backdrop-filter: blur(1px))': {
      background: vars.colors.surface,
    },
  },
});

globalStyle('.zylem-tooltip[data-enter]', {
  animation: `${enter} 0.15s ${vars.motion.easeOut}`,
});
