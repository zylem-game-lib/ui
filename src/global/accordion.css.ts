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

globalStyle('.accordion-header', {
  position: 'sticky',
  top: 0,
  zIndex: 1,
  display: 'flex',
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

globalStyle('.accordion-trigger::after', {
  content: "'\\25BC'",
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
