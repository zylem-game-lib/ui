import { globalStyle } from '@vanilla-extract/css';
import { vars } from '../../theme.css';

globalStyle('.zylem-separator', {
  border: 'none',
});

globalStyle('.zylem-separator[data-orientation="horizontal"]', {
  height: '1px',
  width: '100%',
  margin: `${vars.spacing.sm} 0`,
  background:
    'linear-gradient(90deg, transparent, rgba(97, 166, 232, 0.4), transparent)',
});

globalStyle('.zylem-separator[data-orientation="vertical"]', {
  width: '1px',
  alignSelf: 'stretch',
  margin: `0 ${vars.spacing.sm}`,
  background:
    'linear-gradient(180deg, transparent, rgba(97, 166, 232, 0.4), transparent)',
});
