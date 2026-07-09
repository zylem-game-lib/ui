import { Show, createMemo } from 'solid-js';
import type { JSX } from 'solid-js';

export interface PropertyListProps {
  children: JSX.Element;
  class?: string;
}

/**
 * HyperCard-style field list: wraps `PropertyRow`s in a bordered inset stack.
 */
export function PropertyList(props: PropertyListProps) {
  return (
    <div
      class={
        props.class
          ? `zylem-property-list ${props.class}`
          : 'zylem-property-list'
      }
    >
      {props.children}
    </div>
  );
}

export interface PropertyRowProps {
  label: string;
  /** The value to display. Can be a string, number, or JSX element. */
  value?: string | number | JSX.Element;
  /** If true, treat string values as paths and truncate long ones. */
  isPath?: boolean;
  /** Maximum path segments to show (default: 3). */
  maxPathSegments?: number;
  /** Called with the full value when a truncated path is clicked. */
  onPathClick?: (fullValue: string) => void;
  valueClass?: string;
  /** Children can be used instead of value for complex content. */
  children?: JSX.Element;
}

function truncatePath(
  path: string,
  maxSegments = 3,
): { truncated: string; isTruncated: boolean } {
  const separator = path.includes('\\') ? '\\' : '/';
  const segments = path.split(separator).filter(Boolean);
  if (segments.length <= maxSegments) {
    return { truncated: path, isTruncated: false };
  }
  return {
    truncated: `...${separator}${segments.slice(-maxSegments).join(separator)}`,
    isTruncated: true,
  };
}

function looksLikePath(value: string): boolean {
  return (
    value.includes('/') ||
    value.includes('\\') ||
    /^[A-Za-z]:/.test(value) ||
    value.startsWith('.') ||
    value.startsWith('~')
  );
}

/**
 * HyperGlass property row: label/value inspector field with automatic path
 * truncation and click-to-reveal.
 */
export function PropertyRow(props: PropertyRowProps) {
  const display = createMemo(() => {
    if (props.children !== undefined) {
      return { element: props.children, isClickable: false, fullValue: null as string | null };
    }
    if (typeof props.value !== 'string') {
      return { element: props.value, isClickable: false, fullValue: null as string | null };
    }
    const stringValue = props.value;
    const shouldTruncate = props.isPath ?? looksLikePath(stringValue);
    if (shouldTruncate) {
      const { truncated, isTruncated } = truncatePath(
        stringValue,
        props.maxPathSegments ?? 3,
      );
      return {
        element: truncated,
        isClickable: isTruncated && !!props.onPathClick,
        fullValue: isTruncated ? stringValue : null,
      };
    }
    return { element: stringValue, isClickable: false, fullValue: null as string | null };
  });

  return (
    <div class="zylem-property-row">
      <span class="zylem-property-label">{props.label}</span>
      <Show
        when={display().isClickable}
        fallback={
          <span class={`zylem-property-value ${props.valueClass ?? ''}`}>
            {display().element}
          </span>
        }
      >
        <span
          class={`zylem-property-value zylem-property-value--clickable ${props.valueClass ?? ''}`}
          onClick={() => {
            const fullValue = display().fullValue;
            if (fullValue) props.onPathClick?.(fullValue);
          }}
          title="Click to reveal full path"
        >
          {display().element}
        </span>
      </Show>
    </div>
  );
}
