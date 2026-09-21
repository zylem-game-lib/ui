import { globalStyle, keyframes } from '@vanilla-extract/css';
import { vars } from '../../theme.css';

const enter = keyframes({
  from: { opacity: 0, transform: 'translate(-50%, 6px)' },
  to: { opacity: 1, transform: 'translate(-50%, 0)' },
});

globalStyle('.zylem-toast', {
  position: 'absolute',
  left: '50%',
  bottom: vars.spacing.lg,
  transform: 'translateX(-50%)',
  zIndex: vars.layers.panel,
  maxWidth: 'calc(100% - 32px)',
  padding: `${vars.spacing.sm} ${vars.spacing.md}`,
  borderRadius: vars.radii.control,
  border: '1px solid rgba(150, 210, 255, 0.45)',
  background: vars.material.glassPanelDark,
  boxShadow: vars.effects.shadowPanel,
  backdropFilter: `blur(${vars.effects.blurSm})`,
  color: vars.colors.text,
  fontFamily: vars.typography.fontFamily,
  fontSize: `calc(${vars.typography.fontSize} - 1px)`,
  lineHeight: 1.4,
  textAlign: 'center',
  pointerEvents: 'none',
  animation: `${enter} 0.16s ${vars.motion.easeOut}`,
  '@supports': {
    'not (backdrop-filter: blur(1px))': {
      background: vars.colors.surface,
    },
  },
});

globalStyle('.zylem-toast[data-position="top"]', {
  top: vars.spacing.lg,
  bottom: 'auto',
});

globalStyle('.zylem-toast[data-tone="success"]', {
  borderColor: 'rgba(120, 255, 150, 0.55)',
});

globalStyle('.zylem-toast[data-tone="error"]', {
  borderColor: 'rgba(255, 132, 114, 0.65)',
  color: '#FFD9D3',
});
