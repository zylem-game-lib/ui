import { globalStyle } from '@vanilla-extract/css';
import { vars } from '../../theme.css';

/**
 * Square glass icon button for toolbars — owns the `.zylem-toolbar-btn`
 * class the editor already uses. Selected state uses the live-green jewel
 * treatment.
 */
globalStyle('.zylem-toolbar-btn', {
  boxSizing: 'border-box',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.spacing.xs,
  minWidth: '34px',
  height: '34px',
  padding: `0 ${vars.spacing.sm}`,
  fontFamily: vars.typography.fontFamily,
  fontSize: `calc(${vars.typography.fontSize} - 1px)`,
  fontWeight: 600,
  whiteSpace: 'nowrap',
  textShadow: '0 1px 1px rgba(0,0,0,0.6)',
  cursor: 'pointer',
  borderRadius: vars.radii.control,
  border: '1px solid rgba(150, 210, 255, 0.5)',
  background: vars.material.buttonGlass,
  boxShadow: vars.effects.shadowButton,
  color: '#E8F4FF',
  transition: `transform ${vars.motion.fast} ${vars.motion.easeOut}, box-shadow ${vars.motion.fast} ${vars.motion.easeOut}, filter ${vars.motion.fast} ${vars.motion.easeOut}, background ${vars.motion.fast} ${vars.motion.easeOut}`,
});

globalStyle('.zylem-toolbar-btn:hover', {
  background: vars.material.buttonGlassHover,
  boxShadow: `${vars.effects.shadowButton}, ${vars.effects.glowPrimary}`,
  transform: 'translateY(-1px)',
});

globalStyle('.zylem-toolbar-btn:active', {
  transform: 'translateY(1px)',
  filter: 'brightness(0.92)',
});

globalStyle('.zylem-toolbar-btn:focus-visible', {
  outline: 'none',
  boxShadow: `${vars.effects.shadowButton}, ${vars.effects.focusRing}`,
});

globalStyle('.zylem-toolbar-btn[data-selected], .zylem-toolbar-btn.selected', {
  borderColor: 'rgba(20, 255, 60, 0.78)',
  background: vars.material.buttonGlassActive,
  boxShadow: `${vars.effects.shadowButton}, ${vars.effects.glowActive}`,
});

globalStyle('.zylem-toolbar-btn[disabled]', {
  opacity: 0.45,
  cursor: 'not-allowed',
});

globalStyle('.zylem-toolbar-btn svg', {
  width: '18px',
  height: '18px',
  stroke: 'currentColor',
  filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.55))',
});
