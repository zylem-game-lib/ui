import { createSignal, For } from 'solid-js';
import { Sidebar as UISidebar } from '../../../src/components';

const items = ['Dashboard', 'Game Editor', 'Settings', 'Help'];

export function Sidebar() {
  const [active, setActive] = createSignal('Game Editor');

  return (
    <div class="section" id="sidebar">
      <h2>Sidebar</h2>
      <h3>Sidebar / Sidebar.Section / Sidebar.Item</h3>
      <div style={{ width: '250px', height: '280px' }}>
        <UISidebar>
          <UISidebar.Section title="Navigation">
            <For each={items}>
              {(item) => (
                <UISidebar.Item active={active() === item} onClick={() => setActive(item)}>
                  {item}
                </UISidebar.Item>
              )}
            </For>
          </UISidebar.Section>
        </UISidebar>
      </div>
    </div>
  );
}
