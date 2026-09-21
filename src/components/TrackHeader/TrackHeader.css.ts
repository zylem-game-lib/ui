import { globalStyle } from '@vanilla-extract/css';
import { vars } from '../../theme.css';

globalStyle('.zylem-track-header', {
  display: 'flex',
  alignItems: 'stretch',
  gap: vars.spacing.xs,
  width: '100%',
  minWidth: 0,
  boxSizing: 'border-box',
  padding: `0 ${vars.spacing.xs} 0 0`,
  fontFamily: vars.typography.fontFamily,
  color: vars.colors.text,
  cursor: 'default',
});

globalStyle('.zylem-track-header[data-disabled]', {
  opacity: 0.6,
});

globalStyle('.zylem-track-header-swatch', {
  flex: 'none',
  width: '4px',
  background: 'var(--zylem-track-color)',
  boxShadow: '0 0 6px color-mix(in srgb, var(--zylem-track-color) 60%, transparent)',
});

globalStyle('.zylem-track-header-main', {
  flex: '1 1 auto',
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '1px',
  padding: `0 ${vars.spacing.xs}`,
});

globalStyle('.zylem-track-header-title', {
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.xs,
  minWidth: 0,
});

globalStyle('.zylem-track-header-icon', {
  display: 'inline-flex',
  flex: 'none',
  color: vars.colors.textSecondary,
});

globalStyle('.zylem-track-header-icon > svg', {
  width: '13px',
  height: '13px',
});

globalStyle('.zylem-track-header-name', {
  fontSize: `calc(${vars.typography.fontSize} - 1px)`,
  fontWeight: 600,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

globalStyle('.zylem-track-header[data-muted] .zylem-track-header-name', {
  color: vars.colors.textSecondary,
});

globalStyle('.zylem-track-header-input', {
  width: '100%',
  minWidth: 0,
  boxSizing: 'border-box',
  padding: '1px 4px',
  font: 'inherit',
  fontSize: `calc(${vars.typography.fontSize} - 1px)`,
  color: vars.colors.text,
  background: vars.material.fieldGlass,
  border: '1px solid rgba(97, 166, 232, 0.5)',
  borderRadius: '4px',
  outline: 'none',
});

globalStyle('.zylem-track-header-input:focus-visible', {
  boxShadow: vars.effects.focusRing,
});

globalStyle('.zylem-track-header-detail', {
  fontSize: '10px',
  color: vars.colors.textSecondary,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

globalStyle('.zylem-track-header-toggles', {
  flex: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '3px',
});

globalStyle('.zylem-track-toggle', {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '18px',
  height: '18px',
  padding: 0,
  fontFamily: vars.typography.fontFamily,
  fontSize: '10px',
  fontWeight: 700,
  lineHeight: 1,
  color: vars.colors.textSecondary,
  background: 'rgba(8, 19, 31, 0.6)',
  border: '1px solid rgba(97, 166, 232, 0.28)',
  borderRadius: '4px',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
  cursor: 'pointer',
  outline: 'none',
  transition: `background ${vars.motion.fast} ${vars.motion.easeOut}, color ${vars.motion.fast} ${vars.motion.easeOut}`,
});

globalStyle('.zylem-track-toggle > svg', {
  width: '11px',
  height: '11px',
});

globalStyle('.zylem-track-toggle:hover:not(:disabled)', {
  color: vars.colors.text,
  background: 'rgba(97, 166, 232, 0.22)',
});

globalStyle('.zylem-track-toggle:focus-visible', {
  boxShadow: vars.effects.focusRing,
});

globalStyle('.zylem-track-toggle:disabled', {
  cursor: 'default',
  opacity: 0.5,
});

globalStyle('.zylem-track-toggle[data-kind="mute"][aria-pressed="true"]', {
  color: '#2b1a08',
  background: 'linear-gradient(180deg, rgba(255, 220, 130, 0.95), rgba(230, 150, 40, 0.95))',
  borderColor: 'rgba(255, 230, 170, 0.8)',
});

globalStyle('.zylem-track-toggle[data-kind="solo"][aria-pressed="true"]', {
  color: '#062010',
  background: 'linear-gradient(180deg, rgba(170, 255, 190, 0.95), rgba(28, 174, 63, 0.95))',
  borderColor: 'rgba(190, 255, 203, 0.8)',
});

globalStyle('.zylem-track-toggle[data-kind="lock"][aria-pressed="true"]', {
  color: vars.colors.text,
  background: 'rgba(97, 166, 232, 0.35)',
  borderColor: 'rgba(178, 219, 255, 0.7)',
});

globalStyle('.zylem-track-header-actions', {
  display: 'inline-flex',
  alignItems: 'center',
});
