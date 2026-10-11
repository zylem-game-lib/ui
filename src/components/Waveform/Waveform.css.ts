import { globalStyle } from '@vanilla-extract/css';
import { vars } from '../../theme.css';

globalStyle('.zylem-waveform', {
  position: 'relative',
  width: '100%',
  minWidth: 0,
  boxSizing: 'border-box',
  overflow: 'hidden',
  borderRadius: vars.radii.control,
  border: '1px solid rgba(97, 166, 232, 0.22)',
  background: vars.material.fieldGlass,
  boxShadow: vars.effects.shadowInset,
  userSelect: 'none',
});

globalStyle('.zylem-waveform[data-disabled]', {
  opacity: 0.6,
});

globalStyle('.zylem-waveform-canvas', {
  display: 'block',
  width: '100%',
  height: '100%',
});

globalStyle('.zylem-waveform-shade', {
  position: 'absolute',
  top: 0,
  bottom: 0,
  background: 'rgba(0, 0, 0, 0.45)',
  pointerEvents: 'none',
});

globalStyle('.zylem-waveform-edge', {
  position: 'absolute',
  top: 0,
  bottom: 0,
  width: '10px',
  marginLeft: '-5px',
  cursor: 'ew-resize',
});

globalStyle('.zylem-waveform-edge::before', {
  content: '""',
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: '4px',
  width: '2px',
  background: 'rgba(255, 244, 200, 0.95)',
  boxShadow: '0 0 6px rgba(240, 180, 60, 0.7)',
});

globalStyle('.zylem-waveform-edge::after', {
  content: '""',
  position: 'absolute',
  top: '50%',
  left: '1px',
  width: '8px',
  height: '16px',
  marginTop: '-8px',
  borderRadius: '3px',
  background: 'linear-gradient(180deg, rgba(255, 244, 200, 0.98), rgba(240, 180, 60, 0.95))',
  border: '1px solid rgba(255,255,255,0.7)',
  boxSizing: 'border-box',
});

// The ring goes on the grip: around the full-height edge it would be clipped.
globalStyle('.zylem-waveform-edge:focus-visible', {
  outline: 'none',
  boxShadow: 'none',
});

globalStyle('.zylem-waveform-edge:focus-visible::after', {
  boxShadow: vars.effects.focusRing,
});

globalStyle('.zylem-waveform-playhead', {
  position: 'absolute',
  top: 0,
  bottom: 0,
  width: '1px',
  background: 'rgba(255, 236, 170, 0.9)',
  boxShadow: '0 0 6px rgba(240, 180, 60, 0.7)',
  pointerEvents: 'none',
});
