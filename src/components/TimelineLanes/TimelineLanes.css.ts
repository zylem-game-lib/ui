import { globalStyle } from '@vanilla-extract/css';
import { vars } from '../../theme.css';

const RULER_HEIGHT = '26px';
const LANE_BORDER = '1px solid rgba(97, 166, 232, 0.16)';

globalStyle('.zylem-lanes', {
  position: 'relative',
  overflow: 'auto',
  minHeight: 0,
  minWidth: 0,
  fontFamily: vars.typography.fontFamily,
  fontSize: `calc(${vars.typography.fontSize} - 2px)`,
  color: vars.colors.text,
  background: vars.material.fieldGlass,
  border: '1px solid rgba(97, 166, 232, 0.22)',
  borderRadius: vars.radii.control,
  boxShadow: vars.effects.shadowInset,
  userSelect: 'none',
});

globalStyle('.zylem-lanes[data-disabled]', {
  opacity: 0.6,
});

globalStyle('.zylem-lanes-content', {
  position: 'relative',
  minWidth: '100%',
  minHeight: '100%',
});

// Ruler row: sticky to the top of the scroller, above the lanes and playhead.
globalStyle('.zylem-lanes-ruler-row', {
  position: 'sticky',
  top: 0,
  zIndex: 3,
  display: 'flex',
  height: RULER_HEIGHT,
  background: vars.material.panelHeaderGloss,
  backgroundColor: 'rgba(14, 30, 48, 0.96)',
  borderBottom: '1px solid rgba(97, 166, 232, 0.3)',
  boxShadow: '0 1px 0 rgba(255,255,255,0.06) inset',
});

globalStyle('.zylem-lanes-corner', {
  position: 'sticky',
  left: 0,
  zIndex: 4,
  flex: 'none',
  width: 'var(--zylem-lanes-header)',
  display: 'flex',
  alignItems: 'center',
  padding: `0 ${vars.spacing.sm}`,
  fontSize: '10px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: vars.colors.textSecondary,
  background: 'rgba(14, 30, 48, 0.98)',
  borderRight: LANE_BORDER,
});

globalStyle('.zylem-lanes-ruler', {
  position: 'relative',
  flex: 'none',
  height: '100%',
  cursor: 'pointer',
});

globalStyle('.zylem-lanes-range', {
  position: 'absolute',
  top: 0,
  bottom: 0,
  background: 'rgba(240, 180, 60, 0.18)',
  borderLeft: '1px solid rgba(240, 180, 60, 0.7)',
  borderRight: '1px solid rgba(240, 180, 60, 0.7)',
  pointerEvents: 'none',
});

globalStyle('.zylem-lanes-tick', {
  position: 'absolute',
  bottom: 0,
  width: '1px',
  height: '6px',
  background: 'rgba(205, 232, 255, 0.35)',
  pointerEvents: 'none',
});

globalStyle('.zylem-lanes-tick[data-major]', {
  height: '10px',
  background: 'rgba(205, 232, 255, 0.7)',
});

globalStyle('.zylem-lanes-tick-label', {
  position: 'absolute',
  left: '4px',
  bottom: '8px',
  fontSize: '10px',
  fontVariantNumeric: 'tabular-nums',
  whiteSpace: 'nowrap',
  color: vars.colors.textSecondary,
});

globalStyle('.zylem-lanes-playhead-head', {
  position: 'absolute',
  bottom: 0,
  width: 0,
  height: 0,
  marginLeft: '-6px',
  borderLeft: '6px solid transparent',
  borderRight: '6px solid transparent',
  borderTop: '8px solid rgba(255, 244, 200, 0.98)',
  filter: 'drop-shadow(0 0 3px rgba(240, 180, 60, 0.8))',
  pointerEvents: 'none',
});

globalStyle('.zylem-lanes-playhead', {
  position: 'absolute',
  top: RULER_HEIGHT,
  bottom: 0,
  zIndex: 1,
  width: '1px',
  marginLeft: '-0.5px',
  background: 'rgba(255, 236, 170, 0.9)',
  boxShadow: '0 0 6px rgba(240, 180, 60, 0.7)',
  pointerEvents: 'none',
});

globalStyle('.zylem-lanes-rows', {
  display: 'flex',
  flexDirection: 'column',
});

// Lanes: sticky header cell + a body that carries the beat/second grid.
globalStyle('.zylem-lane', {
  display: 'flex',
  flex: 'none',
  borderBottom: LANE_BORDER,
});

globalStyle('.zylem-lane[data-selected]', {
  background: 'rgba(97, 166, 232, 0.07)',
});

globalStyle('.zylem-lane-header', {
  position: 'sticky',
  left: 0,
  zIndex: 2,
  flex: 'none',
  width: 'var(--zylem-lanes-header)',
  minWidth: 0,
  display: 'flex',
  alignItems: 'stretch',
  background: 'rgba(16, 27, 42, 0.96)',
  borderRight: LANE_BORDER,
});

globalStyle('.zylem-lane[data-selected] > .zylem-lane-header', {
  background: 'rgba(30, 54, 82, 0.96)',
});

globalStyle('.zylem-lane-body', {
  position: 'relative',
  flex: 'none',
  height: '100%',
  backgroundImage: [
    'repeating-linear-gradient(90deg, rgba(205, 232, 255, 0.16) 0 1px, transparent 1px var(--zylem-lanes-major))',
    'repeating-linear-gradient(90deg, rgba(205, 232, 255, 0.06) 0 1px, transparent 1px var(--zylem-lanes-minor))',
  ].join(', '),
});

globalStyle('.zylem-lane[data-dimmed] > .zylem-lane-body', {
  opacity: 0.45,
});

globalStyle('.zylem-lane--group', {
  background: 'rgba(97, 166, 232, 0.08)',
});

globalStyle('.zylem-lane--group > .zylem-lane-header', {
  fontSize: '10px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: vars.colors.textSecondary,
});

globalStyle('.zylem-lane--group > .zylem-lane-body', {
  backgroundImage: 'none',
});

globalStyle('.zylem-lane-end', {
  position: 'absolute',
  top: 0,
  bottom: 0,
  right: 0,
  background: 'rgba(0, 0, 0, 0.28)',
  pointerEvents: 'none',
});

// Clips: color-tinted glass blocks with edge handles.
globalStyle('.zylem-clip', {
  position: 'absolute',
  top: '4px',
  bottom: '4px',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  borderRadius: '5px',
  border: '1px solid color-mix(in srgb, var(--zylem-clip-color) 70%, white 30%)',
  background:
    'linear-gradient(180deg, color-mix(in srgb, var(--zylem-clip-color) 70%, white 30%) 0%, color-mix(in srgb, var(--zylem-clip-color) 75%, black 25%) 100%)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.35), 0 1px 3px rgba(0,0,0,0.45)',
  color: '#0b1522',
  cursor: 'grab',
  outline: 'none',
  transition: `box-shadow ${vars.motion.fast} ${vars.motion.easeOut}, filter ${vars.motion.fast} ${vars.motion.easeOut}`,
});

globalStyle('.zylem-clip:hover:not([data-disabled])', {
  filter: 'brightness(1.08)',
});

globalStyle('.zylem-clip[data-selected]', {
  borderColor: 'rgba(255, 255, 255, 0.9)',
  boxShadow: `inset 0 1px 0 rgba(255,255,255,0.45), 0 0 0 1px rgba(255,255,255,0.5), ${vars.effects.glowPrimary}`,
});

globalStyle('.zylem-clip:focus-visible', {
  boxShadow: vars.effects.focusRing,
});

globalStyle('.zylem-clip[data-dragging]', {
  cursor: 'grabbing',
  filter: 'brightness(1.12)',
});

globalStyle('.zylem-clip[data-disabled]', {
  cursor: 'default',
  opacity: 0.7,
});

globalStyle('.zylem-clip-label', {
  flex: 'none',
  padding: '2px 6px 0',
  fontSize: '11px',
  fontWeight: 600,
  lineHeight: '14px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  textShadow: '0 1px 0 rgba(255,255,255,0.25)',
});

globalStyle('.zylem-clip-body', {
  position: 'relative',
  flex: '1 1 auto',
  minHeight: 0,
  overflow: 'hidden',
  pointerEvents: 'none',
});

globalStyle('.zylem-clip-blend', {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  background:
    'repeating-linear-gradient(135deg, rgba(0,0,0,0.28) 0 3px, transparent 3px 7px)',
  borderRight: '1px dashed rgba(0,0,0,0.45)',
  pointerEvents: 'none',
});

globalStyle('.zylem-clip-handle', {
  position: 'absolute',
  top: 0,
  bottom: 0,
  width: '7px',
  cursor: 'ew-resize',
});

globalStyle('.zylem-clip-handle[data-edge="start"]', { left: 0 });
globalStyle('.zylem-clip-handle[data-edge="end"]', { right: 0 });

globalStyle('.zylem-clip-handle:hover', {
  background: 'rgba(255,255,255,0.28)',
});

// Markers: diamonds (keyframes) and pins (events) centred on a time.
globalStyle('.zylem-marker', {
  position: 'absolute',
  top: '50%',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  padding: 0,
  margin: 0,
  border: 0,
  background: 'transparent',
  color: vars.colors.text,
  cursor: 'grab',
  transform: 'translate(-50%, -50%)',
  outline: 'none',
});

globalStyle('.zylem-marker[data-shape="pin"]', {
  transform: 'translate(-7px, -50%)',
});

globalStyle('.zylem-marker:disabled', {
  cursor: 'default',
  opacity: 0.6,
});

globalStyle('.zylem-marker[data-dragging]', {
  cursor: 'grabbing',
});

globalStyle('.zylem-marker-glyph', {
  display: 'block',
  width: '11px',
  height: '11px',
  boxSizing: 'border-box',
  border: '1px solid rgba(255, 255, 255, 0.7)',
  boxShadow: '0 1px 3px rgba(0,0,0,0.55)',
  transition: `box-shadow ${vars.motion.fast} ${vars.motion.easeOut}, filter ${vars.motion.fast} ${vars.motion.easeOut}`,
});

globalStyle('.zylem-marker[data-shape="diamond"] .zylem-marker-glyph', {
  borderRadius: '2px',
  background:
    'var(--zylem-marker-color, linear-gradient(135deg, rgba(255, 244, 200, 0.98), rgba(240, 180, 60, 0.95)))',
  transform: 'rotate(45deg)',
});

globalStyle('.zylem-marker[data-shape="pin"] .zylem-marker-glyph', {
  width: '13px',
  height: '13px',
  borderRadius: '999px 999px 999px 2px',
  background:
    'var(--zylem-marker-color, linear-gradient(135deg, rgba(178, 219, 255, 0.98), rgba(48, 137, 220, 0.95)))',
  transform: 'rotate(-45deg)',
});

globalStyle('.zylem-marker:hover:not(:disabled) .zylem-marker-glyph', {
  filter: 'brightness(1.12)',
});

globalStyle('.zylem-marker[data-selected] .zylem-marker-glyph', {
  borderColor: 'white',
  boxShadow: '0 1px 3px rgba(0,0,0,0.55), 0 0 10px rgba(255, 255, 255, 0.7)',
});

globalStyle('.zylem-marker:focus-visible .zylem-marker-glyph', {
  boxShadow: vars.effects.focusRing,
});

globalStyle('.zylem-marker-label', {
  fontSize: '10px',
  whiteSpace: 'nowrap',
  color: vars.colors.text,
  textShadow: '0 1px 1px rgba(0,0,0,0.7)',
  maxWidth: '120px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});
