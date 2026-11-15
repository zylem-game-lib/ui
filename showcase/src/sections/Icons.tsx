import { createMemo, createSignal, For, Show } from 'solid-js';
import { Button, SearchInput } from '../../../src/components';
import { CameraToolbar } from '../demos/CameraToolbar';
import { filterIcons, ICON_CATALOG, ICON_CATEGORIES } from '../icon-catalog';

const PAGE_SIZE = 50;

export function Icons() {
  const [query, setQuery] = createSignal('');
  const [category, setCategory] = createSignal('All');
  const [size, setSize] = createSignal(64);
  const [page, setPage] = createSignal(0);
  const filtered = createMemo(() => filterIcons(query(), category()));
  const pageCount = () => Math.max(1, Math.ceil(filtered().length / PAGE_SIZE));
  const visible = () => filtered().slice(page() * PAGE_SIZE, (page() + 1) * PAGE_SIZE);

  return (
    <div class="section" id="icons">
      <h2>Icons</h2>
      <p class="icon-catalog-description">
        Custom genres and behaviors, camera and interface glyphs, and every Lucide icon
        used by the library or showcase. Search by name, ID, or behavior API alias.
      </p>
      <div class="icon-catalog-controls">
        <label class="icon-catalog-search">
          <span class="zylem-field-label">Search icons</span>
          <SearchInput
            value={query()}
            onInput={(value) => { setQuery(value); setPage(0); }}
            placeholder="Try platform, wall-kick, or createFollowTarget"
            aria-label="Search icons"
          />
        </label>
        <label>
          <span class="zylem-field-label">Category</span>
          <select
            class="zylem-field icon-catalog-select"
            value={category()}
            onChange={(event) => { setCategory(event.currentTarget.value); setPage(0); }}
          >
            <option value="All">All categories</option>
            <For each={ICON_CATEGORIES}>
              {(value) => <option value={value}>{value}</option>}
            </For>
          </select>
        </label>
        <label>
          <span class="zylem-field-label">Preview size</span>
          <select
            class="zylem-field icon-catalog-select"
            value={size()}
            onChange={(event) => setSize(Number(event.currentTarget.value))}
          >
            <For each={[24, 32, 48, 64]}>
              {(value) => <option value={value}>{value} px</option>}
            </For>
          </select>
        </label>
      </div>

      <div class="icon-catalog-summary">
        <p role="status" aria-live="polite">
          {filtered().length} of {ICON_CATALOG.length} icons
          <Show when={filtered().length > 0}>
            {' · '}Showing {page() * PAGE_SIZE + 1}–{Math.min((page() + 1) * PAGE_SIZE, filtered().length)}
          </Show>
        </p>
        <Button onClick={() => { setQuery(''); setCategory('All'); setPage(0); }}>
          Reset filters
        </Button>
      </div>

      <div class="icon-table-scroll" role="region" aria-label="Icon catalog" tabIndex={0}>
        <table class="showcase-table icon-table" style={{ '--icon-preview-size': `${size()}px` }}>
          <caption class="icon-catalog-caption">Icon previews, names, categories, and imports</caption>
          <thead>
            <tr>
              <th scope="col">Preview</th>
              <th scope="col">Name / ID</th>
              <th scope="col">Category</th>
              <th scope="col">Import</th>
            </tr>
          </thead>
          <tbody>
            <For each={visible()} fallback={
              <tr><td colSpan={4} class="icon-catalog-empty">No icons match these filters.</td></tr>
            }>
              {(item) => (
                <tr>
                  <td class="icon-table-preview"><span aria-hidden="true"><item.Icon size={size()} /></span></td>
                  <th scope="row">
                    <span title={item.description}>{item.label}</span>
                    <code class="icon-table-id">{item.id}</code>
                  </th>
                  <td><span class="icon-category-tag">{item.category}</span></td>
                  <td><code class="icon-table-import">{item.importCode}</code></td>
                </tr>
              )}
            </For>
          </tbody>
        </table>
      </div>

      <nav class="icon-catalog-pagination" aria-label="Icon pages">
        <Button disabled={page() === 0} onClick={() => setPage((value) => value - 1)}>Previous</Button>
        <span>Page {page() + 1} of {pageCount()}</span>
        <Button disabled={page() + 1 >= pageCount()} onClick={() => setPage((value) => value + 1)}>Next</Button>
      </nav>

      <h3>Camera toolbar</h3>
      <p class="code-label">Select a camera mode. Hover for the tooltip.</p>
      <div class="demo-container"><CameraToolbar /></div>
    </div>
  );
}
