import Search from 'lucide-solid/icons/search';
import type { JSX } from 'solid-js';

export interface SearchInputProps {
  value?: string;
  onInput?: (value: string) => void;
  placeholder?: string;
  class?: string;
  'aria-label'?: string;
  onKeyDown?: JSX.EventHandlerUnion<HTMLInputElement, KeyboardEvent>;
}

/**
 * HyperGlass search input: inset glass field with a leading search icon.
 */
export function SearchInput(props: SearchInputProps) {
  return (
    <div class={props.class ? `zylem-search ${props.class}` : 'zylem-search'}>
      <Search class="zylem-search-icon" />
      <input
        type="search"
        class="zylem-field zylem-search-input"
        value={props.value ?? ''}
        placeholder={props.placeholder ?? 'Search...'}
        aria-label={props['aria-label'] ?? props.placeholder ?? 'Search'}
        onInput={(event) => props.onInput?.(event.currentTarget.value)}
        onKeyDown={props.onKeyDown}
      />
    </div>
  );
}
