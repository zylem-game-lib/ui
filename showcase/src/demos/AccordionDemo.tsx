import type { JSX } from 'solid-js';
import { Accordion } from '../../../src/components';
import { ConsoleDemo } from './ConsoleDemo';
import { EntitiesPanelContent, GamePanelContent, StagePanelContent } from './panels';

const PANELS: Array<{ id: string; title: string; content: () => JSX.Element }> = [
  { id: 'game-config', title: 'Game', content: () => <GamePanelContent /> },
  { id: 'stage-config', title: 'Stage', content: () => <StagePanelContent /> },
  { id: 'entities', title: 'Entities', content: () => <EntitiesPanelContent /> },
  { id: 'console', title: 'Console', content: () => <ConsoleDemo /> },
];

/** Editor sidebar: Game, Stage, Entities, and Console. */
export function AccordionDemo(props: { defaultExpanded?: string[] }) {
  return (
    <Accordion multiple items={PANELS} defaultValue={props.defaultExpanded ?? ['console']} />
  );
}
