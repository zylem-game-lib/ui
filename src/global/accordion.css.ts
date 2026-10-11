import { globalStyle } from '@vanilla-extract/css';
import { vars } from '../theme.css';

/**
 * HyperGlass accordion: flat minimal section headers over glass content
 * regions. Shared by the editor's AccordionMenu markup and the library's
 * Accordion component.
 */
globalStyle('.zylem-accordion', {
  color: vars.colors.text,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  minHeight: 0,
});

// The header is a heading element; its UA margins would open gaps around the
// trigger, and differ by heading level.
globalStyle('.accordion-header', {
  position: 'sticky',
  top: 0,
  zIndex: 1,
  display: 'flex',
  margin: 0,
});

globalStyle('.accordion-item', {
  position: 'relative',
  borderBottom: '1px solid rgba(97, 166, 232, 0.22)',
  display: 'flex',
  flexDirection: 'column',
  minHeight: 0,
  scrollbarWidth: 'none',
});

globalStyle('.accordion-item:last-child', {
  borderBottom: 'none',
});

globalStyle('.accordion-item[data-expanded]', {
  scrollbarWidth: 'thin',
  flex: 1,
  minHeight: 0,
});

globalStyle('.accordion-trigger', {
  boxSizing: 'border-box',
  width: '100%',
  flex: 1,
  padding: `${vars.spacing.sm} ${vars.spacing.md}`,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: vars.spacing.sm,
  border: 'none',
  background: 'transparent',
  color: vars.colors.text,
  fontFamily: vars.typography.fontFamily,
  fontSize: vars.typography.fontSize,
  fontWeight: 600,
  letterSpacing: '0.03em',
  cursor: 'pointer',
  outline: 'none',
  transition: `background ${vars.motion.fast} ${vars.motion.easeOut}`,
});

globalStyle('.accordion-trigger:hover', {
  background: 'rgba(97, 166, 232, 0.08)',
});

globalStyle('.accordion-trigger[data-expanded]', {
  background: 'rgba(97, 166, 232, 0.12)',
  color: '#F4FAFF',
});

globalStyle('.accordion-trigger:focus-visible', {
  boxShadow: vars.effects.focusRing,
});

globalStyle('.accordion-content', {
  overflowY: 'auto',
  flex: 1,
  minHeight: 0,
  transition: 'height 0.3s ease',
});

/**
 * Stack layout: natural-height sections, no per-section scrolling. The
 * accordion grows with its content and leaves scrolling to the parent.
 */
globalStyle('.zylem-accordion--stack', {
  height: 'auto',
  flex: 'none',
});

globalStyle('.zylem-accordion--stack .accordion-item[data-expanded]', {
  flex: 'none',
});

// The parent scrolls, so headers must not pin over the sections above them.
globalStyle('.zylem-accordion--stack .accordion-header', {
  position: 'static',
});

globalStyle('.zylem-accordion--stack .accordion-content', {
  flex: 'none',
  overflow: 'visible',
});

globalStyle('.accordion-trigger::after', {
  // The empty alternative text keeps the chevron out of the trigger's
  // accessible name; the first value is for browsers without that syntax.
  content: ["'\\25BC'", "'\\25BC' / ''"],
  position: 'relative',
  color: vars.colors.textSecondary,
  fontSize: '10px',
  transition: `transform ${vars.motion.normal} ${vars.motion.easeOut}`,
});

globalStyle('.accordion-trigger[data-expanded]::after', {
  transform: 'rotate(180deg)',
  color: '#F4FAFF',
});

globalStyle('.panel-content', {
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.md,
  padding: vars.spacing.md,
  color: vars.colors.text,
});
