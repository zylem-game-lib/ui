import { globalStyle } from '@vanilla-extract/css';
import { vars } from '../../theme.css';
import '../shared/field.css';

globalStyle('.zylem-search', {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
});

globalStyle('.zylem-search-icon', {
  position: 'absolute',
  left: vars.spacing.sm,
  width: '14px',
  height: '14px',
  color: vars.colors.textSecondary,
  pointerEvents: 'none',
});

globalStyle('.zylem-search-input', {
  width: '100%',
  height: '28px',
  paddingLeft: '28px',
});
