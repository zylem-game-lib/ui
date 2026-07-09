import { globalStyle, keyframes } from '@vanilla-extract/css';
import { vars } from '../../theme.css';

const enter = keyframes({
  from: { opacity: 0, transform: 'translateY(-4px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

globalStyle('.zylem-dropdown-content', {
  zIndex: 10000,
  minWidth: '180px',
  padding: vars.spacing.xs,
  borderRadius: vars.radii.control,
  border: '1px solid rgba(97, 166, 232, 0.45)',
  background: vars.material.glassPanelDark,
  boxShadow: vars.effects.shadowPanel,
  backdropFilter: `blur(${vars.effects.blurMd}) saturate(1.22)`,
  outline: 'none',
  '@supports': {
    'not (backdrop-filter: blur(1px))': {
      background: vars.colors.surface,
    },
  },
});

globalStyle('.zylem-dropdown-content[data-expanded]', {
  animation: `${enter} 0.12s ${vars.motion.easeOut}`,
});

globalStyle('.zylem-dropdown-item', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: vars.spacing.md,
  padding: `${vars.spacing.xs} ${vars.spacing.sm}`,
  borderRadius: '4px',
  color: vars.colors.text,
  fontFamily: vars.typography.fontFamily,
  fontSize: vars.typography.fontSize,
  cursor: 'pointer',
  userSelect: 'none',
  outline: 'none',
});

globalStyle('.zylem-dropdown-item[data-highlighted]', {
  background: 'rgba(97, 166, 232, 0.22)',
  color: '#F4FAFF',
});

globalStyle('.zylem-dropdown-item[data-disabled]', {
  opacity: 0.45,
  cursor: 'not-allowed',
});

globalStyle('.zylem-dropdown-item--danger', {
  color: '#FF9C8F',
});

globalStyle('.zylem-dropdown-item--danger[data-highlighted]', {
  background: 'rgba(230, 69, 52, 0.25)',
  color: '#FFD9D3',
});

globalStyle('.zylem-dropdown-shortcut', {
  fontSize: `calc(${vars.typography.fontSize} - 3px)`,
  color: vars.colors.textSecondary,
  letterSpacing: '0.06em',
});

globalStyle('.zylem-dropdown-separator', {
  height: '1px',
  border: 'none',
  margin: `${vars.spacing.xs} ${vars.spacing.sm}`,
  background:
    'linear-gradient(90deg, transparent, rgba(97, 166, 232, 0.35), transparent)',
});
