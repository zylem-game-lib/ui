import { For } from 'solid-js';

type TokenRow = Array<{ token: string; darkLabel?: boolean }>;

const rows: TokenRow[] = [
  [
    { token: '--zylem-color-primary' },
    { token: '--zylem-color-primary-hover' },
    { token: '--zylem-color-primary-active' },
    { token: '--zylem-color-accent' },
  ],
  [
    { token: '--zylem-color-background' },
    { token: '--zylem-color-background-translucent' },
    { token: '--zylem-color-surface' },
    { token: '--zylem-color-border' },
  ],
  [
    { token: '--zylem-color-active', darkLabel: true },
    { token: '--zylem-color-active-hover', darkLabel: true },
    { token: '--zylem-color-success-hover' },
  ],
  [
    { token: '--zylem-color-text', darkLabel: true },
    { token: '--zylem-color-text-secondary', darkLabel: true },
    { token: '--zylem-color-console-background' },
    { token: '--zylem-color-console-text', darkLabel: true },
  ],
];

const shadeHues = [
  'yellow',
  'brown',
  'black',
  'white',
  'magenta',
  'indigo',
  'red',
  'purple',
] as const;

const shadeSteps = [100, 300, 500, 700, 900] as const;

function shadeDarkLabel(hue: (typeof shadeHues)[number], step: number): boolean {
  if (hue === 'white') return step < 900;
  if (hue === 'black') return step === 100;
  if (hue === 'yellow') return step <= 500;
  return step <= 300;
}

function Swatch(props: { token: string; darkLabel?: boolean; shade?: boolean }) {
  return (
    <div
      class={props.shade ? 'color-token color-token--shade' : 'color-token'}
      style={{ background: `var(${props.token})` }}
    >
      <span
        class="color-token-label"
        style={props.darkLabel ? { color: 'var(--zylem-color-background)' } : undefined}
      >
        {props.token}
      </span>
    </div>
  );
}

export function Colors() {
  return (
    <div class="section" id="colors">
      <h2>Colors (--zylem-color-*)</h2>
      <For each={rows}>
        {(row) => (
          <div class="demo-row">
            <For each={row}>
              {(entry) => <Swatch token={entry.token} darkLabel={entry.darkLabel} />}
            </For>
          </div>
        )}
      </For>
      <h3>Shades (--zylem-shade-*)</h3>
      <For each={shadeHues}>
        {(hue) => (
          <div class="demo-row">
            <For each={shadeSteps}>
              {(step) => (
                <Swatch
                  shade
                  token={`--zylem-shade-${hue}-${step}`}
                  darkLabel={shadeDarkLabel(hue, step)}
                />
              )}
            </For>
          </div>
        )}
      </For>
    </div>
  );
}
