import { globalStyle } from '@vanilla-extract/css';
import { vars } from '../../theme.css';

// Knob -----------------------------------------------------------------------

globalStyle('.zylem-knob', {
  display: 'inline-flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '2px',
  fontFamily: vars.typography.fontFamily,
  color: vars.colors.text,
  userSelect: 'none',
});

globalStyle('.zylem-knob[data-disabled]', {
  opacity: 0.5,
});

globalStyle('.zylem-knob-dial', {
  display: 'block',
  borderRadius: '999px',
  cursor: 'ns-resize',
  outline: 'none',
  touchAction: 'none',
});

globalStyle('.zylem-knob[data-dragging] .zylem-knob-dial', {
  cursor: 'grabbing',
});

globalStyle('.zylem-knob-dial:focus-visible', {
  boxShadow: vars.effects.focusRing,
});

globalStyle('.zylem-knob-dial svg', {
  display: 'block',
  overflow: 'visible',
});

globalStyle('.zylem-knob-track', {
  fill: 'none',
  stroke: 'rgba(8, 19, 31, 0.9)',
  strokeWidth: 3,
  strokeLinecap: 'round',
});

globalStyle('.zylem-knob-fill', {
  fill: 'none',
  stroke: 'rgba(120, 190, 255, 0.95)',
  strokeWidth: 3,
  strokeLinecap: 'round',
  filter: 'drop-shadow(0 0 3px rgba(97, 166, 232, 0.7))',
});

globalStyle('.zylem-knob-cap', {
  fill: 'rgba(40, 70, 105, 1)',
  stroke: 'rgba(178, 219, 255, 0.5)',
  strokeWidth: 1,
});

globalStyle('.zylem-knob-pointer', {
  stroke: 'rgba(240, 250, 255, 0.98)',
  strokeWidth: 2,
  strokeLinecap: 'round',
});

globalStyle('.zylem-knob-label', {
  fontSize: '9px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: vars.colors.textSecondary,
});

globalStyle('.zylem-knob-value', {
  fontSize: '10px',
  fontVariantNumeric: 'tabular-nums',
  color: vars.colors.text,
});

// Mixer strip ----------------------------------------------------------------

globalStyle('.zylem-mixer-strip', {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: vars.spacing.xs,
  width: '64px',
  padding: `${vars.spacing.sm} ${vars.spacing.xs}`,
  fontFamily: vars.typography.fontFamily,
  color: vars.colors.text,
  background: vars.material.glassPanelDark,
  border: '1px solid rgba(97, 166, 232, 0.2)',
  borderTop: '3px solid var(--zylem-track-color)',
  borderRadius: vars.radii.control,
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
  userSelect: 'none',
});

globalStyle('.zylem-mixer-strip[data-master]', {
  width: '76px',
  background: vars.material.glassPanel,
});

globalStyle('.zylem-mixer-strip[data-selected]', {
  boxShadow: `inset 0 1px 0 rgba(255,255,255,0.06), 0 0 0 1px rgba(178, 219, 255, 0.6), ${vars.effects.glowPrimary}`,
});

globalStyle('.zylem-mixer-strip[data-disabled]', {
  opacity: 0.6,
});

globalStyle('.zylem-mixer-fader-row', {
  display: 'flex',
  alignItems: 'stretch',
  gap: '4px',
  height: '132px',
});

globalStyle('.zylem-fader', {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  width: '24px',
  height: '100%',
  touchAction: 'none',
});

globalStyle('.zylem-fader[data-disabled]', {
  opacity: 0.5,
});

globalStyle('.zylem-fader-sr', {
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

globalStyle('.zylem-fader-track', {
  position: 'relative',
  flex: '1 1 auto',
  width: '8px',
  margin: '0 auto',
  borderRadius: '999px',
  border: '1px solid rgba(97, 166, 232, 0.28)',
  background: vars.material.fieldGlass,
  boxShadow: vars.effects.shadowInset,
  cursor: 'pointer',
});

globalStyle('.zylem-fader-fill', {
  position: 'absolute',
  bottom: 0,
  width: '100%',
  borderRadius: '999px',
  background:
    'linear-gradient(0deg, rgba(48, 137, 220, 0.8), rgba(178, 219, 255, 0.55))',
});

globalStyle('.zylem-fader-zero', {
  position: 'absolute',
  left: '-6px',
  right: '-6px',
  bottom: 'calc(100% * 60 / 66)',
  height: '1px',
  background: 'rgba(205, 232, 255, 0.4)',
  pointerEvents: 'none',
});

globalStyle('.zylem-fader-thumb', {
  display: 'block',
  left: '-7px',
  width: '22px',
  height: '12px',
  borderRadius: '4px',
  border: '1px solid rgba(255,255,255,0.55)',
  background:
    'linear-gradient(180deg, rgba(240,250,255,0.96), rgba(140,190,235,0.92))',
  boxShadow: `inset 0 1px 0 rgba(255,255,255,0.75), inset 0 -3px 0 rgba(0,0,0,0.18), 0 1px 4px rgba(0,0,0,0.5)`,
  cursor: 'grab',
  outline: 'none',
});

globalStyle('.zylem-fader-thumb:active', {
  cursor: 'grabbing',
});

globalStyle('.zylem-fader-thumb:focus-visible', {
  boxShadow: `inset 0 1px 0 rgba(255,255,255,0.75), ${vars.effects.focusRing}`,
});

globalStyle('.zylem-mixer-meter', {
  position: 'relative',
  width: '6px',
  borderRadius: '3px',
  background: 'rgba(8, 19, 31, 0.9)',
  border: '1px solid rgba(97, 166, 232, 0.2)',
  overflow: 'hidden',
});

globalStyle('.zylem-mixer-meter-fill', {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  background:
    'linear-gradient(0deg, rgba(28, 174, 63, 0.95) 0%, rgba(170, 255, 190, 0.95) 65%, rgba(255, 220, 130, 0.95) 85%, rgba(230, 69, 52, 0.95) 100%)',
  transition: `height 60ms linear`,
});

globalStyle('.zylem-mixer-readout', {
  fontSize: '10px',
  fontVariantNumeric: 'tabular-nums',
  color: vars.colors.textSecondary,
  whiteSpace: 'nowrap',
});

globalStyle('.zylem-mixer-toggles', {
  display: 'flex',
  gap: '3px',
});

globalStyle('.zylem-mixer-name', {
  maxWidth: '100%',
  fontSize: '11px',
  fontWeight: 600,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

globalStyle('.zylem-mixer-strip[data-muted] .zylem-mixer-name', {
  color: vars.colors.textSecondary,
});

globalStyle('.zylem-mixer-strip[data-master] .zylem-mixer-name', {
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
});
