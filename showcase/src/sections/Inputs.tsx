import { createSignal } from 'solid-js';
import {
  NumberField,
  SearchInput,
  Select,
  TextField,
} from '../../../src/components';

export function Inputs() {
  const [name, setName] = createSignal('PlayerShip');
  const [mass, setMass] = createSignal(1);
  const [body, setBody] = createSignal<string | null>('dynamic');
  const [search, setSearch] = createSignal('');

  return (
    <div class="section" id="inputs">
      <h2>Inputs</h2>
      <h3>TextField / NumberField / Select / SearchInput</h3>
      <div class="demo-container">
        <div
          style={{
            display: 'grid',
            'grid-template-columns': 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'var(--zylem-spacing-md)',
          }}
        >
          <TextField
            label="Entity name"
            value={name()}
            onChange={setName}
            placeholder="Text input"
          />
          <NumberField
            label="Mass"
            value={mass()}
            onChange={setMass}
            minValue={0}
            step={0.25}
          />
          <Select
            label="Body"
            options={[
              { value: 'dynamic', label: 'Dynamic' },
              { value: 'fixed', label: 'Fixed' },
              { value: 'kinematic', label: 'Kinematic' },
            ]}
            value={body() ?? undefined}
            onChange={setBody}
            placeholder="Select body type"
          />
          <div>
            <span class="zylem-field-label">Search entities</span>
            <SearchInput
              value={search()}
              onInput={setSearch}
              placeholder="Search entities..."
            />
          </div>
        </div>
        <div style={{ 'margin-top': 'var(--zylem-spacing-md)' }}>
          <TextField
            label="Notes (multiline)"
            multiline
            rows={3}
            placeholder="Enter notes..."
          />
        </div>
      </div>
    </div>
  );
}
