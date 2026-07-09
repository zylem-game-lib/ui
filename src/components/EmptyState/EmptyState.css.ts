import { globalStyle } from '@vanilla-extract/css';
import { vars } from '../../theme.css';

globalStyle('.zylem-empty-state', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.spacing.sm,
  padding: vars.spacing.xl,
  textAlign: 'center',
  borderRadius: vars.radii.card,
  border: '1px dashed rgba(97, 166, 232, 0.3)',
  background: 'rgba(8, 19, 31, 0.3)',
  color: vars.colors.textSecondary,
  fontFamily: vars.typography.fontFamily,
});

globalStyle('.zylem-empty-state-title', {
  fontSize: vars.typography.fontSize,
  fontWeight: 600,
  color: vars.colors.text,
});

globalStyle('.zylem-empty-state-message', {
  fontSize: `calc(${vars.typography.fontSize} - 1px)`,
  lineHeight: 1.45,
  maxWidth: '360px',
});
