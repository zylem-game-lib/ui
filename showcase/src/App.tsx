import { createEffect, createMemo, createSignal, For, on, onCleanup } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { ZYLEM_PACKAGE_VERSIONS } from 'virtual:zylem-versions';
import {
  BuildLabel,
  EmptyState,
  filterItems,
  groupItems,
  ScrollArea,
  SearchInput,
  Sidebar,
  sidebarItemClass,
} from '../../src/components';
import { SECTIONS } from './sections';

const readHash = () => window.location.hash.slice(1);

export function App() {
  const [hash, setHash] = createSignal(readHash());
  const onHashChange = () => setHash(readHash());
  window.addEventListener('hashchange', onHashChange);
  onCleanup(() => window.removeEventListener('hashchange', onHashChange));

  const current = createMemo(
    () => SECTIONS.find((section) => section.id === hash()) ?? SECTIONS[0],
  );

  const [query, setQuery] = createSignal('');
  const matches = createMemo(() => filterItems(SECTIONS, query()));
  const groups = createMemo(() => groupItems(matches()));

  const openFirstMatch = (event: KeyboardEvent) => {
    const first = matches()[0];
    if (event.key === 'Enter' && first) {
      window.location.hash = first.id;
    }
  };

  let nav: HTMLDivElement | undefined;
  let main: HTMLDivElement | undefined;
  createEffect(
    on(current, (section) => {
      main?.scrollTo({ top: 0, left: 0 });
      nav?.querySelector('[aria-current="page"]')?.scrollIntoView({ block: 'nearest' });
      document.title = `${section.label} · Zylem UI Showcase`;
    }),
  );

  return (
    <div class="zylem-hyperglass-root showcase-shell">
      <BuildLabel packages={ZYLEM_PACKAGE_VERSIONS} />
      <Sidebar as="nav" aria-label="Showcase sections">
        <div class="showcase-sidebar-header">
          <h1 class="showcase-brand">Zylem UI</h1>
          <SearchInput
            value={query()}
            onInput={setQuery}
            onKeyDown={openFirstMatch}
            placeholder="Filter components..."
          />
        </div>
        <ScrollArea class="showcase-sidebar-list" ref={nav}>
          <For
            each={groups()}
            fallback={
              <EmptyState class="showcase-sidebar-empty" title="No matches">
                Nothing matches “{query().trim()}”.
              </EmptyState>
            }
          >
            {(group) => (
              <Sidebar.Section title={group.group}>
                <For each={group.items}>
                  {(section) => {
                    const active = () => section.id === current().id;
                    return (
                      <a
                        class={sidebarItemClass}
                        href={`#${section.id}`}
                        data-active={active() ? '' : undefined}
                        aria-current={active() ? 'page' : undefined}
                      >
                        {section.label}
                      </a>
                    );
                  }}
                </For>
              </Sidebar.Section>
            )}
          </For>
        </ScrollArea>
      </Sidebar>
      <ScrollArea class="showcase-main" direction="both" role="main" ref={main}>
        <Dynamic component={current().component} />
      </ScrollArea>
    </div>
  );
}
