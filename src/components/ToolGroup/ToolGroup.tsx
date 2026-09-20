import { type JSX, splitProps } from 'solid-js';

export interface ToolGroupProps extends JSX.HTMLAttributes<HTMLDivElement> {
  /** Caption shown before the controls, e.g. `Tools` or `Palette`. */
  label: string;
  children: JSX.Element;
}

/**
 * Captioned strip for a row of related controls: `TOOLS` followed by tool
 * buttons, `PALETTE` followed by swatches. Several groups sit side by side
 * on one rail.
 */
export function ToolGroup(props: ToolGroupProps) {
  const [local, rest] = splitProps(props, ['label', 'children', 'class']);
  return (
    <div
      role="group"
      aria-label={local.label}
      class={local.class ? `zylem-tool-group ${local.class}` : 'zylem-tool-group'}
      {...rest}
    >
      <span class="zylem-tool-group-label" aria-hidden="true">
        {local.label}
      </span>
      <div class="zylem-tool-group-items">{local.children}</div>
    </div>
  );
}
