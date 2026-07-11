/**
 * Panel content replicas matching the editor's Game/Stage/Entities accordion
 * sections (GameSection.tsx, StageSection.tsx, EntitiesSection.tsx).
 */
import Box from 'lucide-solid/icons/box';
import CloudFog from 'lucide-solid/icons/cloud-fog';
import Cone from 'lucide-solid/icons/cone';
import Cylinder from 'lucide-solid/icons/cylinder';
import GhostIcon from 'lucide-solid/icons/ghost';
import Globe from 'lucide-solid/icons/globe';
import Grid3x3 from 'lucide-solid/icons/grid-3x3';
import PersonStanding from 'lucide-solid/icons/person-standing';
import Pill from 'lucide-solid/icons/pill';
import Pyramid from 'lucide-solid/icons/pyramid';
import Sparkles from 'lucide-solid/icons/sparkles';
import Spline from 'lucide-solid/icons/spline';
import Square from 'lucide-solid/icons/square';
import SquareDashed from 'lucide-solid/icons/square-dashed';
import Sun from 'lucide-solid/icons/sun';
import Torus from 'lucide-solid/icons/torus';
import Type from 'lucide-solid/icons/type';
import { For, type Component } from 'solid-js';
import { Tooltip } from '../../../src/components';

function PropertyRow(props: { label: string; value: string }) {
  return (
    <div class="zylem-property-row">
      <span class="zylem-property-label">{props.label}</span>
      <span class="zylem-property-value">{props.value}</span>
    </div>
  );
}

export function GamePanelContent() {
  return (
    <div class="panel-content">
      <section class="zylem-property-list">
        <PropertyRow label="ID" value="demo-game" />
        <PropertyRow label="Aspect Ratio" value="1.778" />
        <PropertyRow label="Fullscreen" value="No" />
        <PropertyRow label="Debug" value="Yes" />
        <PropertyRow label="Resolution" value="640x360" />
      </section>
      <section class="zylem-toolbar">
        <button type="button" class="zylem-button" data-size="sm">
          Print Global State
        </button>
        <button type="button" class="zylem-button" data-size="sm">
          Print All
        </button>
      </section>
    </div>
  );
}

export function StagePanelContent() {
  return (
    <div class="panel-content">
      <section class="zylem-property-list">
        <PropertyRow label="ID" value="main-level" />
        <PropertyRow label="Background" value="#11151C" />
        <PropertyRow label="Gravity" value="X:0.00 Y:-9.81 Z:0.00" />
        <PropertyRow label="Variables" value="3 defined" />
      </section>
      <section class="zylem-toolbar">
        <button type="button" class="zylem-button" data-size="sm">
          Print Stage State
        </button>
      </section>
    </div>
  );
}

/**
 * Type-to-icon mapping aligned with the engine `EntityTypeMap`
 * (Sprite, Sphere, Rect, Text, Box, Plane, Zone, Actor, Disk, Cone, Pyramid,
 * Cylinder, Pill, ParticleSystem, Light, Fog, Line).
 */
export const ENTITY_ICONS: Array<{ type: string; icon: Component<{ class?: string }> }> = [
  { type: 'Box', icon: Box },
  { type: 'Sphere', icon: Globe },
  { type: 'Disk', icon: Torus },
  { type: 'Sprite', icon: GhostIcon },
  { type: 'Actor', icon: PersonStanding },
  { type: 'Text', icon: Type },
  { type: 'Rect', icon: Square },
  { type: 'Plane', icon: Grid3x3 },
  { type: 'Zone', icon: SquareDashed },
  { type: 'Cone', icon: Cone },
  { type: 'Pyramid', icon: Pyramid },
  { type: 'Cylinder', icon: Cylinder },
  { type: 'Pill', icon: Pill },
  { type: 'ParticleSystem', icon: Sparkles },
  { type: 'Light', icon: Sun },
  { type: 'Fog', icon: CloudFog },
  { type: 'Line', icon: Spline },
];

export function EntitiesPanelContent() {
  return (
    <div class="panel-content">
      <section class="zylem-section">
        <h4 class="zylem-section-title">Entities ({ENTITY_ICONS.length})</h4>
        <div class="entity-grid">
          <For each={ENTITY_ICONS}>
            {(entity) => (
              <Tooltip content={entity.type} placement="top" openDelay={200}>
                <button
                  type="button"
                  class="entity-grid-item"
                  aria-label={entity.type}
                >
                  <entity.icon class="entity-icon" />
                </button>
              </Tooltip>
            )}
          </For>
        </div>
      </section>
    </div>
  );
}
