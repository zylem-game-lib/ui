import { fireEvent, render } from '@solidjs/testing-library';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Card } from '../src/components/Card/Card';

afterEach(() => {
  document.body.innerHTML = '';
});

describe('Card', () => {
  it('orders media, title, description, children', () => {
    const { container } = render(() => (
      <Card title="T" description="D" media={<img alt="" src="" />}>
        <span class="tags">tags</span>
      </Card>
    ));
    const card = container.querySelector('.zylem-card')!;
    const order = Array.from(card.children).map((child) => child.className);
    expect(order).toEqual(['zylem-card-media', 'zylem-card-title', 'zylem-card-description', 'tags']);
    expect(card.getAttribute('role')).toBeNull();
  });

  it('activates on Enter and Space when interactive', () => {
    const onClick = vi.fn();
    const { container } = render(() => <Card title="T" interactive selected onClick={onClick} />);
    const card = container.querySelector<HTMLElement>('.zylem-card')!;
    expect(card.getAttribute('role')).toBe('button');
    expect(card.getAttribute('aria-pressed')).toBe('true');
    fireEvent.keyDown(card, { key: 'Enter' });
    fireEvent.keyDown(card, { key: ' ' });
    fireEvent.keyDown(card, { key: 'a' });
    expect(onClick).toHaveBeenCalledTimes(2);
  });
});
