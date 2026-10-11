export function Typography() {
  return (
    <div class="section" id="typography">
      <h2>Typography</h2>
      <h3>.zylem-exo-2</h3>
      <div class="demo-container">
        <p
          class="zylem-exo-2"
          style={{
            'font-size': '24px',
            'font-weight': 700,
            margin: '0 0 8px 0',
            color: 'var(--zylem-color-primary)',
          }}
        >
          Exo 2 Bold - Heading
        </p>
        <p
          class="zylem-exo-2"
          style={{
            'font-size': '18px',
            'font-weight': 600,
            margin: '0 0 8px 0',
            color: 'var(--zylem-color-primary)',
          }}
        >
          Exo 2 SemiBold - Subheading
        </p>
        <p
          class="zylem-exo-2"
          style={{
            'font-size': '14px',
            'font-weight': 400,
            margin: '0',
            color: 'var(--zylem-color-primary)',
          }}
        >
          Exo 2 Regular - Body text for the Zylem game engine interface. This is the default font style used
          throughout the editor.
        </p>
      </div>

      <h3>.zylem-mono</h3>
      <div class="demo-container">
        <p
          class="zylem-mono"
          style={{
            'font-size': '24px',
            'font-weight': 600,
            margin: '0 0 8px 0',
            color: 'var(--zylem-color-primary)',
          }}
        >
          01:23.45
        </p>
        <p
          class="zylem-mono"
          style={{
            'font-size': '18px',
            'font-weight': 500,
            margin: '0 0 8px 0',
            color: 'var(--zylem-color-primary)',
          }}
        >
          128 BPM · 4/4
        </p>
        <p
          class="zylem-mono"
          style={{
            'font-size': '14px',
            'font-weight': 400,
            margin: '0',
            color: 'var(--zylem-color-primary)',
          }}
        >
          16 × 16 px · −12.0 dB
        </p>
      </div>
    </div>
  );
}
