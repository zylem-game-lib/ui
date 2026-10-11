import Lock from 'lucide-solid/icons/lock';
import LockOpen from 'lucide-solid/icons/lock-open';
import { createSignal, type JSX, Show } from 'solid-js';

export interface TrackHeaderProps {
  name: string;
  /** Swatch color shown as a bar on the left edge. */
  color?: string;
  /** Small glyph before the name (an instrument or camera icon). */
  icon?: JSX.Element;
  /** Secondary line under the name (instrument preset, camera kind). */
  detail?: string;
  selected?: boolean;
  /** Pointer down anywhere on the header; given, the name is also a button for the keyboard. */
  onSelect?: () => void;
  /** Double-click the name to rename; the new name arrives here on Enter/blur. */
  onRename?: (name: string) => void;
  /** Mute / solo / lock toggles render only when their handler is given. */
  muted?: boolean;
  onToggleMute?: () => void;
  solo?: boolean;
  onToggleSolo?: () => void;
  locked?: boolean;
  onToggleLock?: () => void;
  /** Trailing controls (a menu button, an add button). */
  actions?: JSX.Element;
  disabled?: boolean;
  class?: string;
}

/**
 * Header cell for a timeline lane: color bar, name (rename on double-click),
 * an optional detail line, and M / S / lock toggles.
 */
export function TrackHeader(props: TrackHeaderProps) {
  const [editing, setEditing] = createSignal(false);
  const [draft, setDraft] = createSignal('');

  const startRename = () => {
    if (!props.onRename || props.disabled) return;
    setDraft(props.name);
    setEditing(true);
  };
  const commitRename = () => {
    if (!editing()) return;
    setEditing(false);
    const next = draft().trim();
    if (next && next !== props.name) props.onRename?.(next);
  };

  const name = () => (
    <Show
      when={props.onSelect}
      fallback={
        <span class="zylem-track-header-name" onDblClick={startRename} title={props.name}>
          {props.name}
        </span>
      }
    >
      <button
        type="button"
        class="zylem-track-header-name"
        aria-current={props.selected ? 'true' : undefined}
        title={props.name}
        onClick={(event) => {
          // The pointer selected on pointer down; keys and assistive tech click without one.
          if (event.detail === 0) props.onSelect?.();
        }}
        onDblClick={startRename}
      >
        {props.name}
      </button>
    </Show>
  );

  return (
    <div
      class={props.class ? `zylem-track-header ${props.class}` : 'zylem-track-header'}
      style={{ '--zylem-track-color': props.color ?? 'var(--zylem-color-primary)' }}
      data-selected={props.selected ? '' : undefined}
      data-muted={props.muted ? '' : undefined}
      data-disabled={props.disabled ? '' : undefined}
      role="group"
      aria-label={props.name}
      onPointerDown={() => props.onSelect?.()}
    >
      <span class="zylem-track-header-swatch" aria-hidden="true" />
      <div class="zylem-track-header-main">
        <div class="zylem-track-header-title">
          <Show when={props.icon}>
            <span class="zylem-track-header-icon">{props.icon}</span>
          </Show>
          <Show when={editing()} fallback={name()}>
            <input
              class="zylem-track-header-input"
              value={draft()}
              aria-label="Track name"
              ref={(element) => queueMicrotask(() => element.select())}
              onInput={(event) => setDraft(event.currentTarget.value)}
              onBlur={commitRename}
              onKeyDown={(event) => {
                if (event.key === 'Enter') commitRename();
                if (event.key === 'Escape') setEditing(false);
              }}
            />
          </Show>
        </div>
        <Show when={props.detail}>
          <span class="zylem-track-header-detail">{props.detail}</span>
        </Show>
      </div>
      <div class="zylem-track-header-toggles">
        <Show when={props.onToggleMute}>
          <button
            type="button"
            class="zylem-track-toggle"
            data-kind="mute"
            aria-pressed={props.muted ? 'true' : 'false'}
            aria-label="Mute"
            title={props.muted ? 'Unmute' : 'Mute'}
            disabled={props.disabled}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={() => props.onToggleMute?.()}
          >
            M
          </button>
        </Show>
        <Show when={props.onToggleSolo}>
          <button
            type="button"
            class="zylem-track-toggle"
            data-kind="solo"
            aria-pressed={props.solo ? 'true' : 'false'}
            aria-label="Solo"
            title={props.solo ? 'Unsolo' : 'Solo'}
            disabled={props.disabled}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={() => props.onToggleSolo?.()}
          >
            S
          </button>
        </Show>
        <Show when={props.onToggleLock}>
          <button
            type="button"
            class="zylem-track-toggle"
            data-kind="lock"
            aria-pressed={props.locked ? 'true' : 'false'}
            aria-label="Lock"
            title={props.locked ? 'Unlock' : 'Lock'}
            disabled={props.disabled}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={() => props.onToggleLock?.()}
          >
            {props.locked ? (
              <Lock class="zylem-icon" aria-hidden="true" />
            ) : (
              <LockOpen class="zylem-icon" aria-hidden="true" />
            )}
          </button>
        </Show>
        <Show when={props.actions}>
          <span class="zylem-track-header-actions" onPointerDown={(event) => event.stopPropagation()}>
            {props.actions}
          </span>
        </Show>
      </div>
    </div>
  );
}
