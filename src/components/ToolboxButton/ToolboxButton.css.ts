import { globalStyle } from '@vanilla-extract/css';
import { vars } from '../../theme.css';
import { artCaption } from '../ToolGroup/ToolGroup.css';

/**
 * Toolbox tile: `.zylem-toolbar-btn` at panel scale. Same border, glass,
 * press and selected treatment; icon stacked over a label.
 */
globalStyle('.zylem-toolbox-btn', {
  boxSizing: 'border-box',
  display: 'inline-flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.spacing.sm,
  width: '100%',
  minHeight: '72px',
  padding: `${vars.spacing.md} ${vars.spacing.sm}`,
  fontFamily: vars.typography.fontFamily,
  fontSize: vars.typography.fontSize,
  fontWeight: 600,
  lineHeight: 1,
  whiteSpace: 'nowrap',
  textShadow: '0 1px 1px rgba(0,0,0,0.6)',
  cursor: 'pointer',
  userSelect: 'none',
  borderRadius: vars.radii.button,
  border: '1px solid rgba(150, 210, 255, 0.5)',
  background: vars.material.buttonGlass,
  boxShadow: vars.effects.shadowButton,
  color: '#E8F4FF',
  transition: `transform ${vars.motion.fast} ${vars.motion.easeOut}, box-shadow ${vars.motion.fast} ${vars.motion.easeOut}, filter ${vars.motion.fast} ${vars.motion.easeOut}, background ${vars.motion.fast} ${vars.motion.easeOut}`,
});

globalStyle('.zylem-toolbox-btn:hover:not([disabled])', {
  background: vars.material.buttonGlassHover,
  boxShadow: `${vars.effects.shadowButton}, ${vars.effects.glowPrimary}`,
  transform: 'translateY(-1px)',
});

globalStyle('.zylem-toolbox-btn:active:not([disabled])', {
  transform: 'translateY(1px)',
  filter: 'brightness(0.92)',
  boxShadow:
    'inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -1px 0 rgba(255,255,255,0.55), inset 0 2px 3px rgba(0,0,0,0.28), 0 1px 3px rgba(0,0,0,0.28)',
});

globalStyle('.zylem-toolbox-btn:focus-visible', {
  outline: 'none',
  boxShadow: `${vars.effects.shadowButton}, ${vars.effects.focusRing}`,
});

globalStyle('.zylem-toolbox-btn[data-selected]', {
  borderColor: 'rgba(20, 255, 60, 0.78)',
  background: vars.material.buttonGlassActive,
  boxShadow: `${vars.effects.shadowButton}, ${vars.effects.glowActive}`,
});

globalStyle('.zylem-toolbox-btn[disabled]', {
  opacity: 0.45,
  cursor: 'not-allowed',
});

globalStyle('.zylem-toolbox-btn-icon', {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '24px',
  height: '24px',
});

globalStyle('.zylem-toolbox-btn-icon svg', {
  width: '24px',
  height: '24px',
  stroke: 'currentColor',
  filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.55))',
});

globalStyle('.zylem-toolbox-btn-label', {
  display: 'block',
});

/**
 * Extra large tiles. A button's own `data-size` wins; otherwise it inherits
 * the enclosing grid's. `lg` suits three columns, `xl` two.
 */
const lg = (suffix = '') =>
  `.zylem-toolbox-btn[data-size="lg"]${suffix}, .zylem-toolbox-grid[data-size="lg"] .zylem-toolbox-btn:not([data-size])${suffix}`;
const xl = (suffix = '') =>
  `.zylem-toolbox-btn[data-size="xl"]${suffix}, .zylem-toolbox-grid[data-size="xl"] .zylem-toolbox-btn:not([data-size])${suffix}`;

globalStyle(lg(), {
  minHeight: '96px',
  gap: vars.spacing.md,
  padding: `${vars.spacing.lg} ${vars.spacing.sm}`,
  fontSize: `calc(${vars.typography.fontSize} + 1px)`,
  borderRadius: vars.radii.card,
});

globalStyle(`${lg(' .zylem-toolbox-btn-icon')}, ${lg(' .zylem-toolbox-btn-icon svg')}`, {
  width: '32px',
  height: '32px',
});

globalStyle(xl(), {
  minHeight: '120px',
  gap: vars.spacing.md,
  padding: `${vars.spacing.xl} ${vars.spacing.md}`,
  fontSize: `calc(${vars.typography.fontSize} + 2px)`,
  borderRadius: vars.radii.card,
});

globalStyle(`${xl(' .zylem-toolbox-btn-icon')}, ${xl(' .zylem-toolbox-btn-icon svg')}`, {
  width: '40px',
  height: '40px',
});

globalStyle('.zylem-toolbox-grid', {
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.sm,
  minWidth: 0,
});

globalStyle('.zylem-toolbox-grid-label', artCaption);

globalStyle('.zylem-toolbox-grid-items', {
  display: 'grid',
  gridTemplateColumns: 'repeat(var(--zylem-toolbox-columns, 2), minmax(0, 1fr))',
  gap: vars.spacing.sm,
});
