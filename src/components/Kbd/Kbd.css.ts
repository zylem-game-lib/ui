import { globalStyle } from '@vanilla-extract/css';
import { vars } from '../../theme.css';

/**
 * Keyboard hint chip: tiny beveled glass key cap.
 */
globalStyle('.zylem-kbd', {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '18px',
  padding: `1px ${vars.spacing.xs}`,
  borderRadius: '4px',
  border: '1px solid rgba(97, 166, 232, 0.4)',
  background:
    'linear-gradient(180deg, rgba(60, 85, 115, 0.7), rgba(20, 32, 48, 0.85))',
  boxShadow:
    'inset 0 1px 0 rgba(255,255,255,0.28), inset 0 -1px 0 rgba(0,0,0,0.45), 0 1px 2px rgba(0,0,0,0.4)',
  color: vars.colors.text,
  fontFamily: vars.typography.fontFamily,
  fontSize: '10px',
  fontWeight: 700,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  userSelect: 'none',
  whiteSpace: 'nowrap',
});
