import { render } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { afterEach, describe, expect, it } from 'vitest';

import {
  ensureLayerContainer,
  LAYER_PORTAL_CLASS,
  resolveLayerRoot,
} from '../src/layers/resolve-mount';
import { LayerProvider, LayerScope, useLayer } from '../src/layers/LayerContext';

afterEach(() => {
  document.body.innerHTML = '';
});

/** A host element with an open shadow root holding one child. */
function withShadowRoot(): { host: HTMLElement; inner: HTMLElement } {
  const host = document.createElement('div');
  document.body.append(host);
  const shadow = host.attachShadow({ mode: 'open' });
  const inner = document.createElement('span');
  shadow.append(inner);
  return { host, inner };
}

describe('resolveLayerRoot', () => {
  it('resolves a node in the document to the body', () => {
    const node = document.createElement('div');
    document.body.append(node);

    expect(resolveLayerRoot(node)).toBe(document.body);
  });

  it('resolves a node inside a shadow root to that shadow root', () => {
    const { host, inner } = withShadowRoot();

    // The whole point: an overlay for this node has to mount inside the shadow
    // tree, because that is where the host's styles were injected.
    expect(resolveLayerRoot(inner)).toBe(host.shadowRoot);
  });

  it('falls back to the body for a detached node', () => {
    expect(resolveLayerRoot(document.createElement('div'))).toBe(document.body);
  });

  it('falls back to the body when given nothing', () => {
    expect(resolveLayerRoot(null)).toBe(document.body);
    expect(resolveLayerRoot(undefined)).toBe(document.body);
  });
});

describe('ensureLayerContainer', () => {
  it('creates a container in the resolved root', () => {
    const node = document.createElement('div');
    document.body.append(node);

    const container = ensureLayerContainer(node);

    expect(container.classList.contains(LAYER_PORTAL_CLASS)).toBe(true);
    expect(container.parentNode).toBe(document.body);
  });

  it('reuses the container instead of stacking up duplicates', () => {
    const node = document.createElement('div');
    document.body.append(node);

    const first = ensureLayerContainer(node);
    const second = ensureLayerContainer(node);

    // A page with many menus should end up with one container, not one each.
    expect(second).toBe(first);
    expect(document.body.querySelectorAll(`.${LAYER_PORTAL_CLASS}`)).toHaveLength(1);
  });

  it('keeps a shadow tree container separate from the document one', () => {
    const outer = document.createElement('div');
    document.body.append(outer);
    const { host, inner } = withShadowRoot();

    const documentContainer = ensureLayerContainer(outer);
    const shadowContainer = ensureLayerContainer(inner);

    expect(shadowContainer).not.toBe(documentContainer);
    expect(shadowContainer.parentNode).toBe(host.shadowRoot);
  });

  it('appends the container last, so it starts above its siblings', () => {
    const node = document.createElement('div');
    document.body.append(node);

    const container = ensureLayerContainer(node);

    expect(document.body.lastElementChild).toBe(container);
  });
});

describe('useLayer', () => {
  it('resolves a z-index from the tier token', () => {
    let zIndex = '';
    render(() => {
      zIndex = useLayer('menu').zIndex();
      return <span />;
    });

    // Left as the custom property rather than a resolved number, so the cascade
    // stays in charge of the tier's value.
    expect(zIndex).toBe('var(--zylem-layer-menu)');
  });

  it('adds a rank offset within the tier', () => {
    let zIndex = '';
    render(() => {
      zIndex = useLayer('panel', 7).zIndex();
      return <span />;
    });

    expect(zIndex).toBe('calc(var(--zylem-layer-panel) + 7)');
  });

  it('tracks a reactive rank', () => {
    let layer!: ReturnType<typeof useLayer>;
    const [rank, setRank] = createSignal(1);
    render(() => {
      layer = useLayer('panel', rank);
      return <span />;
    });

    expect(layer.zIndex()).toBe('calc(var(--zylem-layer-panel) + 1)');

    // Raising a window to the front changes its rank, and the z-index has to
    // follow without the overlay being remounted.
    setRank(2);
    expect(layer.zIndex()).toBe('calc(var(--zylem-layer-panel) + 2)');
  });

  it('resolves a mount with no provider present', () => {
    let layer!: ReturnType<typeof useLayer>;
    render(() => {
      layer = useLayer('menu');
      return <span ref={layer.anchorRef} />;
    });

    // A lone Tooltip has to work without any setup.
    expect(layer.mount()?.classList.contains(LAYER_PORTAL_CLASS)).toBe(true);
  });

  it('uses the provider container when one is mounted', () => {
    let layer!: ReturnType<typeof useLayer>;
    const Child = () => {
      layer = useLayer('menu');
      return <span />;
    };
    render(() => (
      <LayerProvider>
        <Child />
      </LayerProvider>
    ));

    expect(layer.mount()?.classList.contains(LAYER_PORTAL_CLASS)).toBe(true);
    expect(layer.mount()?.parentNode).toBe(document.body);
  });

  it('resolves to the nearest scope container rather than the page one', () => {
    let outerLayer!: ReturnType<typeof useLayer>;
    let innerLayer!: ReturnType<typeof useLayer>;

    const Outer = () => {
      outerLayer = useLayer('menu');
      return <span />;
    };
    const Inner = () => {
      innerLayer = useLayer('tooltip');
      return <span />;
    };

    const { container } = render(() => (
      <LayerProvider>
        <Outer />
        <LayerScope>
          <Inner />
        </LayerScope>
      </LayerProvider>
    ));

    const scope = container.querySelector('.zylem-layer-scope');
    expect(scope).not.toBeNull();

    // Everything opened inside the scope stays inside it, which combined with
    // the scope's own stacking context is what stops a dialog's overlays from
    // escaping over the rest of the page.
    expect(scope!.contains(innerLayer.mount()!)).toBe(true);
    expect(scope!.contains(outerLayer.mount()!)).toBe(false);
  });

  it('keeps tier values identical inside a scope, so ranks mean the same thing', () => {
    let inner!: ReturnType<typeof useLayer>;
    const Inner = () => {
      inner = useLayer('tooltip', 500);
      return <span />;
    };
    render(() => (
      <LayerScope>
        <Inner />
      </LayerScope>
    ));

    // Containment comes from the scope's stacking context, not from shrinking the
    // numbers, so a panel can still be ranked above a scope's tooltips.
    expect(inner.zIndex()).toBe('calc(var(--zylem-layer-tooltip) + 500)');
  });
});
