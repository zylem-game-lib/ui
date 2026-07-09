import { globalStyle } from '@vanilla-extract/css';
import { vars } from '../theme.css';

globalStyle('.selected', {
  background: vars.material.buttonGlassActive,
  boxShadow: `inset 0 0 6px rgba(20, 255, 60, 0.35), ${vars.effects.glowActive}`,
});

globalStyle('.overlay', {
  background:
    'linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px)',
  backgroundSize: '100% 3px',
  pointerEvents: 'none',
});

// Default scrollbars: slim glass rail (use `.zylem-scroll` for the full
// 13px HyperGlass treatment defined in hyperglass-base.css.ts).
globalStyle('::-webkit-scrollbar', {
  width: '8px',
  height: '8px',
});

globalStyle('::-webkit-scrollbar-track', {
  background: 'rgba(7, 19, 33, 0.4)',
  borderRadius: '999px',
});

globalStyle('::-webkit-scrollbar-thumb', {
  borderRadius: '999px',
  border: '1px solid rgba(5, 16, 28, 0.82)',
  background:
    'linear-gradient(90deg, rgba(220,242,255,0.4), rgba(97,166,232,0.65) 42%, rgba(19,62,102,0.9))',
});

globalStyle('::-webkit-scrollbar-thumb:hover', {
  background:
    'linear-gradient(90deg, rgba(240,250,255,0.6), rgba(97,166,232,0.9) 42%, rgba(21,76,130,0.98))',
});
