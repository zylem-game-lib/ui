import { globalStyle } from '@vanilla-extract/css';
import { vars } from '../../theme.css';

globalStyle('.zylem-piano-roll', {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  minHeight: 0,
  minWidth: 0,
  fontFamily: vars.typography.fontFamily,
  color: vars.colors.text,
  background: vars.material.fieldGlass,
  border: '1px solid rgba(97, 166, 232, 0.22)',
  borderRadius: vars.radii.control,
  boxShadow: vars.effects.shadowInset,
  outline: 'none',
  userSelect: 'none',
});

globalStyle('.zylem-piano-roll:focus-visible', {
  boxShadow: `${vars.effects.shadowInset}, ${vars.effects.focusRing}`,
});

globalStyle('.zylem-piano-roll[data-disabled]', {
  opacity: 0.6,
});

globalStyle('.zylem-piano-roll-scroll', {
  flex: '1 1 auto',
  minHeight: 0,
  overflow: 'auto',
});

globalStyle('.zylem-piano-roll-content', {
  position: 'relative',
  display: 'flex',
});

// Keys: sticky column of white/black rows, labelled at each C.
globalStyle('.zylem-piano-roll-keys', {
  position: 'sticky',
  left: 0,
  zIndex: 2,
  flex: 'none',
  display: 'flex',
  flexDirection: 'column',
  borderRight: '1px solid rgba(97, 166, 232, 0.3)',
  boxShadow: '2px 0 6px rgba(0,0,0,0.35)',
});

globalStyle('.zylem-piano-roll-key', {
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: '0 4px 0 0',
  margin: 0,
  border: 0,
  borderBottom: '1px solid rgba(0,0,0,0.35)',
  fontFamily: vars.typography.fontFamily,
  fontSize: '9px',
  lineHeight: 1,
  color: '#1c2633',
  background: 'linear-gradient(90deg, #dbe6f2, #f4f8fc)',
  cursor: 'pointer',
  outline: 'none',
});

globalStyle('.zylem-piano-roll-key[data-black]', {
  color: '#cdd8e6',
  background: 'linear-gradient(90deg, #0d151f, #263241)',
  boxShadow: 'inset -6px 0 0 rgba(255,255,255,0.05)',
});

globalStyle('.zylem-piano-roll-key[data-c]', {
  fontWeight: 700,
});

globalStyle('.zylem-piano-roll-key:hover:not(:disabled)', {
  filter: 'brightness(1.1)',
});

globalStyle('.zylem-piano-roll-key:active:not(:disabled)', {
  filter: 'brightness(0.92)',
});

// Grid: row stripes plus beat/bar/snap columns from gradients.
globalStyle('.zylem-piano-roll-grid', {
  position: 'relative',
  flex: 'none',
  backgroundImage: [
    'repeating-linear-gradient(90deg, rgba(205, 232, 255, 0.28) 0 1px, transparent 1px var(--zylem-pr-bar))',
    'repeating-linear-gradient(90deg, rgba(205, 232, 255, 0.12) 0 1px, transparent 1px var(--zylem-pr-ppb))',
    'repeating-linear-gradient(90deg, rgba(205, 232, 255, 0.05) 0 1px, transparent 1px var(--zylem-pr-snap))',
  ].join(', '),
});

globalStyle('.zylem-piano-roll-row', {
  position: 'absolute',
  left: 0,
  right: 0,
  boxSizing: 'border-box',
  borderBottom: '1px solid rgba(255,255,255,0.04)',
  pointerEvents: 'none',
});

globalStyle('.zylem-piano-roll-row[data-black]', {
  background: 'rgba(0, 0, 0, 0.22)',
});

globalStyle('.zylem-piano-roll-row[data-c]', {
  borderBottom: '1px solid rgba(205, 232, 255, 0.25)',
});

globalStyle('.zylem-piano-roll-end', {
  position: 'absolute',
  top: 0,
  bottom: 0,
  right: 0,
  background: 'rgba(0, 0, 0, 0.35)',
  pointerEvents: 'none',
});

globalStyle('.zylem-piano-roll-note', {
  position: 'absolute',
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  borderRadius: '3px',
  border: '1px solid rgba(255, 255, 255, 0.55)',
  background:
    'linear-gradient(180deg, rgba(178, 219, 255, 0.98), rgba(48, 137, 220, 0.98))',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.45), 0 1px 2px rgba(0,0,0,0.5)',
  opacity: 'calc(0.45 + 0.55 * var(--zylem-pr-velocity, 0.8))',
  color: '#08131f',
  cursor: 'grab',
  outline: 'none',
  overflow: 'hidden',
});

globalStyle('.zylem-piano-roll-note[data-selected]', {
  background:
    'linear-gradient(180deg, rgba(255, 244, 200, 0.98), rgba(240, 180, 60, 0.98))',
  borderColor: 'white',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6), 0 0 8px rgba(240, 180, 60, 0.7)',
  opacity: 1,
});

globalStyle('.zylem-piano-roll[data-dragging] .zylem-piano-roll-note', {
  cursor: 'grabbing',
});

globalStyle('.zylem-piano-roll-note-label', {
  padding: '0 4px',
  fontSize: '9px',
  fontWeight: 700,
  lineHeight: 1,
  whiteSpace: 'nowrap',
  pointerEvents: 'none',
});

globalStyle('.zylem-piano-roll-note-handle', {
  position: 'absolute',
  top: 0,
  bottom: 0,
  right: 0,
  width: '6px',
  cursor: 'ew-resize',
});

globalStyle('.zylem-piano-roll-playhead', {
  position: 'absolute',
  top: 0,
  bottom: 0,
  width: '1px',
  background: 'rgba(255, 236, 170, 0.9)',
  boxShadow: '0 0 6px rgba(240, 180, 60, 0.7)',
  pointerEvents: 'none',
});

// Velocity lane under the grid: one bar per note, drag vertically.
globalStyle('.zylem-piano-roll-velocity', {
  display: 'flex',
  flex: 'none',
  borderTop: '1px solid rgba(97, 166, 232, 0.3)',
  background: 'rgba(8, 19, 31, 0.6)',
});

globalStyle('.zylem-piano-roll-velocity-label', {
  position: 'sticky',
  left: 0,
  zIndex: 2,
  flex: 'none',
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'flex-end',
  padding: '0 4px 4px 0',
  fontSize: '9px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: vars.colors.textSecondary,
  background: 'rgba(12, 22, 34, 0.98)',
  borderRight: '1px solid rgba(97, 166, 232, 0.3)',
});

globalStyle('.zylem-piano-roll-velocity-lane', {
  position: 'relative',
  flex: 'none',
  height: '100%',
});

globalStyle('.zylem-piano-roll-velocity-bar', {
  position: 'absolute',
  bottom: 0,
  width: '5px',
  marginLeft: '1px',
  borderRadius: '2px 2px 0 0',
  background: 'linear-gradient(180deg, rgba(178, 219, 255, 0.95), rgba(48, 137, 220, 0.85))',
  cursor: 'ns-resize',
});

globalStyle('.zylem-piano-roll-velocity-bar[data-selected]', {
  background: 'linear-gradient(180deg, rgba(255, 244, 200, 0.98), rgba(240, 180, 60, 0.95))',
});
