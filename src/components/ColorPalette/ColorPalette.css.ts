import { globalStyle } from '@vanilla-extract/css';
import { vars } from '../../theme.css';
import { TILE_SIZE } from '../AddTile/AddTile.css';
import { checkerBackground } from '../PixelGrid/PixelGrid.css';

globalStyle('.zylem-palette', {
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: vars.spacing.sm,
});

globalStyle('.zylem-swatch', {
  boxSizing: 'border-box',
  width: TILE_SIZE,
  height: TILE_SIZE,
  flex: 'none',
  padding: 0,
  margin: 0,
  cursor: 'pointer',
  borderRadius: vars.radii.control,
  border: '1px solid rgba(150, 210, 255, 0.4)',
  background: 'var(--zylem-swatch-color, transparent)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.22), 0 1px 3px rgba(0,0,0,0.4)',
  transition: `transform ${vars.motion.fast} ${vars.motion.easeOut}, box-shadow ${vars.motion.fast} ${vars.motion.easeOut}`,
});

globalStyle('.zylem-swatch[data-transparent]', {
  vars: { '--zylem-pixel-grid-cell': '5px' },
  background: checkerBackground,
});

globalStyle('.zylem-swatch:hover:not([disabled])', {
  transform: 'translateY(-1px)',
  boxShadow: `inset 0 1px 0 rgba(255,255,255,0.3), 0 2px 6px rgba(0,0,0,0.45), ${vars.effects.glowPrimary}`,
});

globalStyle('.zylem-swatch:focus-visible', {
  outline: 'none',
  boxShadow: vars.effects.focusRing,
});

globalStyle('.zylem-swatch[data-selected]', {
  borderColor: '#F4FAFF',
  boxShadow: `0 0 0 2px rgba(10, 20, 30, 0.9), 0 0 0 3px rgba(244, 250, 255, 0.85), ${vars.effects.glowPrimary}`,
});

globalStyle('.zylem-swatch[disabled]', {
  opacity: 0.45,
  cursor: 'not-allowed',
});
