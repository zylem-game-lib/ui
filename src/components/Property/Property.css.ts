import { globalStyle } from '@vanilla-extract/css';
import { vars } from '../../theme.css';

/**
 * HyperCard-style field list — owns the `.zylem-property-*` classes used by
 * the editor.
 */
globalStyle('.zylem-property-list', {
  display: 'flex',
  flexDirection: 'column',
  borderRadius: vars.radii.control,
  border: '1px solid rgba(97, 166, 232, 0.18)',
  background: 'rgba(8, 19, 31, 0.35)',
  overflow: 'hidden',
});

globalStyle('.zylem-property-row', {
  minHeight: '30px',
  display: 'grid',
  gridTemplateColumns: '112px 1fr',
  alignItems: 'center',
  gap: vars.spacing.sm,
  padding: `${vars.spacing.xs} ${vars.spacing.sm}`,
  borderBottom: '1px solid rgba(97,166,232,0.12)',
  background: 'linear-gradient(90deg, rgba(97,166,232,0.045), transparent 45%)',
});

globalStyle('.zylem-property-row:last-child', {
  borderBottom: 'none',
});

globalStyle('.zylem-property-row:hover', {
  background:
    'linear-gradient(90deg, rgba(97,166,232,0.13), rgba(97,166,232,0.025) 65%)',
});

globalStyle('.zylem-property-label', {
  fontSize: '11px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: vars.colors.textSecondary,
  fontFamily: vars.typography.fontFamily,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  userSelect: 'none',
});

globalStyle('.zylem-property-value', {
  color: vars.colors.primary,
  fontSize: vars.typography.fontSize,
  fontFamily: vars.typography.fontFamily,
  fontWeight: 500,
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

globalStyle('.zylem-property-value--clickable', {
  cursor: 'pointer',
  textDecoration: 'underline',
  textDecorationStyle: 'dotted',
  textUnderlineOffset: '2px',
});

globalStyle('.zylem-property-value--clickable:hover', {
  textDecorationStyle: 'solid',
  color: vars.colors.active,
});
