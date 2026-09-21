import { Accordion as AccordionComponent, Checkbox, NumberField, PropertyList, PropertyRow } from '../../../src/components';
import { AccordionDemo } from '../demos/AccordionDemo';

export function Accordion() {
  return (
    <div class="section" id="accordion">
      <h2>Accordion</h2>
      <h3>.zylem-accordion + .accordion-* (Kobalte, click headers to expand)</h3>
      <div class="demo-container" style={{ width: '400px' }}>
        <AccordionDemo defaultExpanded={['stage-config']} />
      </div>
      <h3>stack: natural-height inspector sections, the parent scrolls</h3>
      <div class="demo-container" style={{ width: '280px', height: '260px', overflow: 'auto' }}>
        <AccordionComponent
          stack
          multiple
          defaultValue={['transform', 'view']}
          items={[
            {
              id: 'transform',
              title: 'Transform',
              content: () => (
                <div class="panel-content">
                  <PropertyList>
                    <PropertyRow label="X">
                      <NumberField value={12} step={1} />
                    </PropertyRow>
                    <PropertyRow label="Y">
                      <NumberField value={8} step={1} />
                    </PropertyRow>
                  </PropertyList>
                </div>
              ),
            },
            {
              id: 'view',
              title: 'View',
              content: () => (
                <div class="panel-content">
                  <Checkbox label="Grid" defaultChecked />
                  <Checkbox label="Onion skin" />
                </div>
              ),
            },
            { id: 'export', title: 'Export', content: () => <div class="panel-content">Nothing yet.</div> },
          ]}
        />
      </div>
    </div>
  );
}
