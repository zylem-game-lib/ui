import { globalStyle } from '@vanilla-extract/css';
import { vars } from '../../theme.css';
import '../shared/field.css';

globalStyle('.zylem-numberfield-group', {
  display: 'inline-flex',
  alignItems: 'stretch',
  position: 'relative',
  width: '100%',
});

globalStyle('.zylem-numberfield-input', {
  width: '100%',
  height: '28px',
  paddingRight: '26px',
  fontVariantNumeric: 'tabular-nums',
});

globalStyle('.zylem-numberfield-stepper', {
  position: 'absolute',
  right: '3px',
  width: '20px',
  height: '11px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  border: '1px solid rgba(150, 210, 255, 0.4)',
  borderRadius: '4px',
  background: vars.material.buttonGlass,
  color: '#F4FAFF',
  fontSize: '8px',
  lineHeight: 1,
  padding: 0,
  transition: `filter ${vars.motion.fast} ${vars.motion.easeOut}`,
});

globalStyle('.zylem-numberfield-stepper:hover', {
  filter: 'brightness(1.25)',
});

globalStyle('.zylem-numberfield-stepper:active', {
  filter: 'brightness(0.85)',
});

globalStyle('.zylem-numberfield-stepper--up', { top: '3px' });
globalStyle('.zylem-numberfield-stepper--down', { bottom: '3px' });
