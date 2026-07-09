import { globalStyle } from '@vanilla-extract/css';
import { vars } from '../../theme.css';

globalStyle('.zylem-progress-root', {
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.xxs,
  width: '100%',
});

globalStyle('.zylem-progress-header', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

globalStyle('.zylem-progress-label', {
  fontSize: '11px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: vars.colors.textSecondary,
  fontFamily: vars.typography.fontFamily,
});

globalStyle('.zylem-progress-value', {
  fontSize: `calc(${vars.typography.fontSize} - 2px)`,
  color: vars.colors.primary,
  fontFamily: vars.typography.fontFamily,
  fontVariantNumeric: 'tabular-nums',
});

globalStyle('.zylem-progress-track', {
  position: 'relative',
  height: '10px',
  width: '100%',
  overflow: 'hidden',
  borderRadius: '999px',
  border: '1px solid rgba(97, 166, 232, 0.28)',
  background: vars.material.fieldGlass,
  boxShadow: vars.effects.shadowInset,
});

globalStyle('.zylem-progress-fill', {
  height: '100%',
  borderRadius: '999px',
  background:
    'linear-gradient(180deg, rgba(178, 219, 255, 0.7), rgba(48, 137, 220, 0.92))',
  boxShadow: `inset 0 1px 0 rgba(255,255,255,0.5), ${vars.effects.glowPrimary}`,
  transition: `width ${vars.motion.normal} ${vars.motion.easeOut}`,
  width: 'var(--kb-progress-fill-width)',
});
