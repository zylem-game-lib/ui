import { globalStyle } from '@vanilla-extract/css';
import { vars } from '../../theme.css';

/** Shared uppercase caption used by the art-tool groups and strips. */
export const artCaption = {
  fontFamily: vars.typography.fontFamily,
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: vars.colors.textSecondary,
  whiteSpace: 'nowrap',
} as const;

globalStyle('.zylem-tool-group', {
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.spacing.md,
  minWidth: 0,
});

globalStyle('.zylem-tool-group-label', artCaption);

globalStyle('.zylem-tool-group-items', {
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: vars.spacing.sm,
});

// Tool buttons are square; the label lives in the tooltip.
globalStyle('.zylem-tool-btn', {
  width: '34px',
  padding: 0,
});
