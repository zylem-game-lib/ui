import { globalStyle } from '@vanilla-extract/css';
import { vars } from '../theme.css';

/**
 * HyperGlass foundation styles: app root background treatment, visible
 * Aqua-inspired glass scrollbars, shared focus rings, and a light CodePen-
 * inspired specular sheen on glossy controls. Component-level glass
 * treatments live in each component's recipe; this file covers page-level
 * chrome plus shared lighting primitives.
 */

// Root surface: dark navy with a soft radial glow, angled light wash, and a
// faint blueprint grid.
globalStyle('.zylem-hyperglass-root', {
  minHeight: '100vh',
  color: vars.colors.text,
  fontFamily: vars.typography.fontFamily,
  backgroundColor: vars.colors.background,
  backgroundImage: `
    radial-gradient(circle at 30% 0%, rgba(97, 166, 232, 0.18), transparent 32%),
    linear-gradient(-75deg, rgba(255, 255, 255, 0) 0%, rgba(97, 166, 232, 0.07) 42%, rgba(255, 255, 255, 0) 68%),
    linear-gradient(rgba(97, 166, 232, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(97, 166, 232, 0.045) 1px, transparent 1px)
  `,
  backgroundSize: '100% 100%, 100% 100%, 24px 24px, 24px 24px',
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
 * Specular sheen on glossy interactive hosts — a soft diagonal band that
 * nudges on hover and shifts toward the top on press (CodePen glass lighting,
 * dialed down for HyperGlass). Uses ::before so label/icon content paints above.
 * Applied on the control classes themselves (not under `.zylem-hyperglass-root`)
 * so portaled surfaces like Dialog keep the same look.
 * Pseudo selectors are listed per-host (comma lists don't inherit a trailing ::before).
 */
// Absolute-positioned hosts (e.g. `.zylem-console-clear`) already form a
// containing block for the sheen — don't override them to `relative` or they
// stretch in flex parents. `.entity-grid-item` already sets `relative` in
// editor-base.
globalStyle('.zylem-button:not(.zylem-console-clear), .zylem-toolbar-btn', {
  position: 'relative',
});

globalStyle(
  '.zylem-button::before, .zylem-toolbar-btn::before, .entity-grid-item::before',
  {
    content: '""',
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    pointerEvents: 'none',
    background: `linear-gradient(
    -45deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.42) 40%,
    rgba(255, 255, 255, 0.42) 50%,
    rgba(255, 255, 255, 0) 55%
  )`,
    backgroundSize: '200% 200%',
    backgroundPosition: '0% 50%',
    backgroundRepeat: 'no-repeat',
    mixBlendMode: 'screen',
    opacity: 0.4,
    transition: `background-position ${vars.motion.normal} ${vars.motion.easeOut}, opacity ${vars.motion.fast} ${vars.motion.easeOut}`,
    '@media': {
      '(prefers-reduced-motion: reduce)': {
        transition: 'none',
        backgroundPosition: '0% 50%',
      },
    },
  },
);

globalStyle(
  '.zylem-button:hover:not([disabled])::before, .zylem-toolbar-btn:hover:not([disabled])::before, .entity-grid-item:hover::before',
  {
    backgroundPosition: '25% 50%',
    opacity: 0.5,
    '@media': {
      '(prefers-reduced-motion: reduce)': {
        backgroundPosition: '0% 50%',
      },
    },
  },
);

globalStyle(
  '.zylem-button:active:not([disabled])::before, .zylem-toolbar-btn:active:not([disabled])::before, .entity-grid-item:active::before',
  {
    backgroundPosition: '50% 15%',
    opacity: 0.58,
    '@media': {
      '(prefers-reduced-motion: reduce)': {
        backgroundPosition: '0% 50%',
      },
    },
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
