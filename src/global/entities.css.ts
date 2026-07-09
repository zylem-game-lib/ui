import { globalStyle } from '@vanilla-extract/css';
import { vars } from '../theme.css';

globalStyle('.entities-list', {
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.md,
  overflowY: 'auto',
  overflowX: 'hidden',
});

// :where() keeps this shadow-DOM reset at zero specificity so consuming
// apps' own list rules still win.
globalStyle(':where(ul)', {
  all: 'unset',
});

globalStyle('.entity-item-wrapper', {
  all: 'unset',
  cursor: 'pointer',
});

globalStyle('.entity-item', {
  display: 'grid',
  gap: vars.spacing.sm,
  gridTemplateColumns: '1fr 1fr 1fr',
  border: '1px solid rgba(97, 166, 232, 0.32)',
  borderRadius: vars.radii.card,
  background: vars.material.glassPanelDark,
  boxShadow:
    'inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 12px rgba(0,0,0,0.25)',
  padding: vars.spacing.md,
  margin: `${vars.spacing.md} 0`,
  fontWeight: 600,
  color: vars.colors.text,
  transition: `background ${vars.motion.normal} ${vars.motion.easeOut}, border-color ${vars.motion.normal} ${vars.motion.easeOut}, box-shadow ${vars.motion.normal} ${vars.motion.easeOut}`,
});

globalStyle('.entity-item-wrapper.hovered .entity-item, .entity-item.hovered', {
  borderColor: 'rgba(150, 210, 255, 0.6)',
  boxShadow: `inset 0 1px 0 rgba(255,255,255,0.12), ${vars.effects.glowPrimary}`,
  color: '#F4FAFF',
});

globalStyle('.entity-item-wrapper:active .entity-item', {
  borderColor: 'rgba(20, 255, 60, 0.6)',
  boxShadow: `inset 0 1px 0 rgba(255,255,255,0.12), ${vars.effects.glowActive}`,
});

globalStyle('.entity-info-item', {
  display: 'grid',
  gridTemplateColumns: 'min-content max-content',
  gap: vars.spacing.sm,
});
