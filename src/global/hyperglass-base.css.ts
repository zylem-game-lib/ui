import { globalStyle } from '@vanilla-extract/css';
import { vars } from '../theme.css';

/**
 * HyperGlass foundation styles: app root background treatment, visible
 * Aqua-inspired glass scrollbars, and shared focus rings. Component-level
 * glass treatments live in each component's recipe; this file only covers
 * page-level chrome.
 */

// Root surface: dark navy with a soft radial glow and a faint blueprint grid.
globalStyle('.zylem-hyperglass-root', {
  minHeight: '100vh',
  color: vars.colors.text,
  fontFamily: vars.typography.fontFamily,
  backgroundColor: vars.colors.background,
  backgroundImage: `
    radial-gradient(circle at 30% 0%, rgba(97, 166, 232, 0.18), transparent 32%),
    linear-gradient(rgba(97, 166, 232, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(97, 166, 232, 0.045) 1px, transparent 1px)
  `,
  backgroundSize: '100% 100%, 24px 24px, 24px 24px',
});

// Visible focus ring on any keyboard-focused interactive element.
globalStyle(
  '.zylem-hyperglass-root :focus-visible, .zylem-focus-ring:focus-visible',
  {
    outline: 'none',
    boxShadow: vars.effects.focusRing,
  },
);

/**
 * Glass scrollbars — apply `.zylem-scroll` (or rely on the root cascade for
 * `.zylem-hyperglass-root`) to get the visible Aqua-style rail.
 */
const scrollHosts = '.zylem-scroll, .zylem-hyperglass-root';

globalStyle(scrollHosts, {
  scrollbarColor: 'rgba(97,166,232,0.55) rgba(10,20,30,0.5)',
  scrollbarWidth: 'thin',
});

globalStyle(
  '.zylem-scroll::-webkit-scrollbar, .zylem-hyperglass-root ::-webkit-scrollbar',
  {
    width: '13px',
    height: '13px',
  },
);

globalStyle(
  '.zylem-scroll::-webkit-scrollbar-track, .zylem-hyperglass-root ::-webkit-scrollbar-track',
  {
    borderRadius: '999px',
    background:
      'linear-gradient(90deg, rgba(0,0,0,0.32), rgba(97,166,232,0.11), rgba(255,255,255,0.045))',
    border: '1px solid rgba(97,166,232,0.16)',
  },
);

globalStyle(
  '.zylem-scroll::-webkit-scrollbar-thumb, .zylem-hyperglass-root ::-webkit-scrollbar-thumb',
  {
    borderRadius: '999px',
    border: '2px solid rgba(5, 16, 28, 0.82)',
    background:
      'linear-gradient(90deg, rgba(220,242,255,0.48), rgba(97,166,232,0.72) 42%, rgba(19,62,102,0.92))',
    boxShadow:
      'inset 1px 0 0 rgba(255,255,255,0.42), inset -1px 0 0 rgba(0,0,0,0.34)',
  },
);

globalStyle(
  '.zylem-scroll::-webkit-scrollbar-thumb:hover, .zylem-hyperglass-root ::-webkit-scrollbar-thumb:hover',
  {
    background:
      'linear-gradient(90deg, rgba(240,250,255,0.64), rgba(97,166,232,0.92) 42%, rgba(21,76,130,0.98))',
  },
);

// Opaque fallback when backdrop-filter isn't available: glass panels lean on
// blur for legibility, so give them a solid surface instead.
globalStyle('.zylem-glass', {
  '@supports': {
    'not (backdrop-filter: blur(1px))': {
      backgroundColor: vars.colors.surface,
    },
  },
});
