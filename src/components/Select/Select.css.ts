import { globalStyle } from '@vanilla-extract/css';
import { vars } from '../../theme.css';
import '../shared/field.css';

globalStyle('.zylem-select-trigger', {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: vars.spacing.sm,
  width: '100%',
  height: '28px',
  cursor: 'pointer',
  textAlign: 'left',
});

globalStyle('.zylem-select-value', {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

globalStyle('.zylem-select-icon', {
  flexShrink: 0,
  fontSize: '9px',
  color: vars.colors.primary,
  transition: `transform ${vars.motion.fast} ${vars.motion.easeOut}`,
});

globalStyle('.zylem-select-trigger[data-expanded] .zylem-select-icon', {
  transform: 'rotate(180deg)',
});

globalStyle('.zylem-select-content', {
  zIndex: 10000,
  borderRadius: vars.radii.control,
  border: '1px solid rgba(97, 166, 232, 0.45)',
  background: vars.material.glassPanelDark,
  boxShadow: vars.effects.shadowPanel,
  backdropFilter: `blur(${vars.effects.blurMd}) saturate(1.22)`,
  overflow: 'hidden',
  '@supports': {
    'not (backdrop-filter: blur(1px))': {
      background: vars.colors.surface,
    },
  },
});

globalStyle('.zylem-select-listbox', {
  maxHeight: '280px',
  overflowY: 'auto',
  padding: vars.spacing.xs,
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  outline: 'none',
});

globalStyle('.zylem-select-item', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: vars.spacing.sm,
  padding: `${vars.spacing.xs} ${vars.spacing.sm}`,
  borderRadius: '4px',
  color: vars.colors.text,
  fontFamily: vars.typography.fontFamily,
  fontSize: vars.typography.fontSize,
  cursor: 'pointer',
  userSelect: 'none',
  outline: 'none',
});

globalStyle('.zylem-select-item[data-highlighted]', {
  background: 'rgba(97, 166, 232, 0.22)',
  color: '#F4FAFF',
});

globalStyle('.zylem-select-item[data-selected]', {
  background: vars.material.buttonGlass,
  boxShadow: vars.effects.shadowButton,
  color: '#F4FAFF',
});

globalStyle('.zylem-select-item[data-disabled]', {
  opacity: 0.45,
  cursor: 'not-allowed',
});

globalStyle('.zylem-select-item-indicator', {
  color: vars.colors.active,
  fontSize: '11px',
});
