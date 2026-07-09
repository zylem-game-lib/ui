import { globalStyle } from '@vanilla-extract/css';
import { vars } from '../../theme.css';
import '../shared/field.css';

globalStyle('.zylem-textfield-input', {
  width: '100%',
  height: '28px',
});

globalStyle('.zylem-textfield-textarea', {
  width: '100%',
  minHeight: '72px',
  padding: vars.spacing.sm,
  resize: 'vertical',
  lineHeight: 1.45,
});
