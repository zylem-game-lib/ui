import { globalStyle } from '@vanilla-extract/css';
import { vars } from '../../theme.css';

globalStyle('.zylem-checkbox-root', {
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.spacing.sm,
  cursor: 'pointer',
  userSelect: 'none',
});

globalStyle('.zylem-checkbox-root[data-disabled]', {
  opacity: 0.5,
  cursor: 'not-allowed',
});

globalStyle('.zylem-checkbox-input', {
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

// Square glass toggle: beveled jewel that fills with blue glass when checked.
globalStyle('.zylem-checkbox-control', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '18px',
  height: '18px',
  borderRadius: vars.radii.control,
  border: '1px solid rgba(97, 166, 232, 0.5)',
  background: vars.material.fieldGlass,
  boxShadow: vars.effects.shadowInset,
  transition: `background ${vars.motion.fast} ${vars.motion.easeOut}, box-shadow ${vars.motion.fast} ${vars.motion.easeOut}, border-color ${vars.motion.fast} ${vars.motion.easeOut}`,
});

globalStyle('.zylem-checkbox-root:hover .zylem-checkbox-control', {
  borderColor: 'rgba(150, 210, 255, 0.7)',
  boxShadow: `${vars.effects.shadowInset}, ${vars.effects.glowPrimary}`,
});

globalStyle('.zylem-checkbox-root[data-checked] .zylem-checkbox-control', {
  background: vars.material.buttonGlass,
  border: '1px solid rgba(150, 210, 255, 0.65)',
  boxShadow: vars.effects.shadowButton,
});

globalStyle('.zylem-checkbox-root:focus-within .zylem-checkbox-control', {
  boxShadow: `${vars.effects.shadowInset}, ${vars.effects.focusRing}`,
});

globalStyle('.zylem-checkbox-icon', {
  width: '12px',
  height: '12px',
  color: '#F4FAFF',
  strokeWidth: 3.5,
  filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.6))',
});

globalStyle('.zylem-checkbox-label', {
  fontFamily: vars.typography.fontFamily,
  fontSize: vars.typography.fontSize,
  color: vars.colors.text,
});

globalStyle('.zylem-checkbox-root:hover .zylem-checkbox-label', {
  color: vars.colors.primary,
});
