import { globalStyle } from '@vanilla-extract/css';
import { vars } from '../../theme.css';

/**
 * Tiny corner HUD for the resolved Zylem build number. Sits above game
 * chrome (`tooltip` tier) and stays out of the way of the editor toggle
 * (bottom-right).
 */
globalStyle('.zylem-build-label', {
  position: 'fixed',
  top: '10px',
  right: '12px',
  zIndex: vars.layers.tooltip,
  pointerEvents: 'auto',
  padding: `2px ${vars.spacing.sm}`,
  borderRadius: '5px',
  border: '1px solid rgba(97, 166, 232, 0.35)',
  background:
    'linear-gradient(180deg, rgba(60, 80, 105, 0.55), rgba(26, 31, 39, 0.78))',
  boxShadow:
    'inset 0 1px 0 rgba(255,255,255,0.22), 0 2px 8px rgba(0,0,0,0.35)',
  color: vars.colors.textSecondary,
  fontFamily: vars.typography.fontFamily,
  fontSize: '10px',
  fontWeight: 700,
  letterSpacing: '0.06em',
  lineHeight: 1.4,
  textShadow: '0 1px 1px rgba(0,0,0,0.55)',
  userSelect: 'none',
  whiteSpace: 'nowrap',
});
