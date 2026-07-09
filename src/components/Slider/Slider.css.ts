import { globalStyle } from '@vanilla-extract/css';
import { vars } from '../../theme.css';

globalStyle('.zylem-slider-root', {
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.xxs,
  width: '100%',
  userSelect: 'none',
  touchAction: 'none',
});

globalStyle('.zylem-slider-root[data-disabled]', {
  opacity: 0.5,
});

globalStyle('.zylem-slider-header', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

globalStyle('.zylem-slider-label', {
  fontSize: '11px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: vars.colors.textSecondary,
  fontFamily: vars.typography.fontFamily,
});

globalStyle('.zylem-slider-value', {
  fontSize: `calc(${vars.typography.fontSize} - 2px)`,
  color: vars.colors.primary,
  fontFamily: vars.typography.fontFamily,
  fontVariantNumeric: 'tabular-nums',
});

globalStyle('.zylem-slider-track', {
  position: 'relative',
  height: '8px',
  width: '100%',
  borderRadius: '999px',
  border: '1px solid rgba(97, 166, 232, 0.28)',
  background: vars.material.fieldGlass,
  boxShadow: vars.effects.shadowInset,
  cursor: 'pointer',
});

globalStyle('.zylem-slider-fill', {
  position: 'absolute',
  height: '100%',
  borderRadius: '999px',
  background:
    'linear-gradient(180deg, rgba(178, 219, 255, 0.65), rgba(48, 137, 220, 0.9))',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.45)',
});

globalStyle('.zylem-slider-thumb', {
  display: 'block',
  width: '16px',
  height: '16px',
  top: '-5px',
  borderRadius: '999px',
  border: '1px solid rgba(255,255,255,0.5)',
  background:
    'linear-gradient(180deg, rgba(240,250,255,0.96), rgba(140,190,235,0.92))',
  boxShadow: `inset 0 1px 0 rgba(255,255,255,0.75), 0 1px 4px rgba(0,0,0,0.5), ${vars.effects.glowPrimary}`,
  cursor: 'grab',
  outline: 'none',
  transition: `box-shadow ${vars.motion.fast} ${vars.motion.easeOut}`,
});

globalStyle('.zylem-slider-thumb:active', {
  cursor: 'grabbing',
});

globalStyle('.zylem-slider-thumb:focus-visible', {
  boxShadow: `inset 0 1px 0 rgba(255,255,255,0.75), ${vars.effects.focusRing}`,
});

globalStyle('.zylem-slider-thumb-input', {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
});
