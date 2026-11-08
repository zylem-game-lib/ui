/**
 * Original Zylem camera icons as Lucide-style SVG node lists.
 * 24×24 viewBox, 2-unit stroke, no fill, rounded caps and joins.
 */
export type IconNode = [
  elementName: 'rect' | 'path',
  attributes: Record<string, string>,
][];

export const PerspectiveNode: IconNode = [
  ['rect', { x: '2', y: '8', width: '8', height: '8', rx: '2' }],
  ['path', { d: 'm10 10 4-2v8l-4-2' }],
  ['path', { d: 'm18 7 4-3m-4 13 4 3' }],
];

export const SideviewPerspectiveNode: IconNode = [
  ['rect', { x: '2', y: '8', width: '8', height: '8', rx: '2' }],
  ['path', { d: 'm10 10 4-2v8l-4-2' }],
  ['path', { d: 'M18 6h4v12h-4' }],
];

export const TopDownPerspectiveNode: IconNode = [
  ['rect', { x: '8', y: '2', width: '8', height: '8', rx: '2' }],
  ['path', { d: 'm10 10-2 4h8l-2-4' }],
  ['path', { d: 'M6 18v4h12v-4' }],
];

export const FreePerspectiveNode: IconNode = [
  ['rect', { x: '7', y: '9', width: '7', height: '6', rx: '1' }],
  ['path', { d: 'm14 11 3-2v6l-3-2' }],
  ['path', { d: 'M3 8a9 9 0 0 1 15-3' }],
  ['path', { d: 'M18 2v3h-3' }],
  ['path', { d: 'M21 16a9 9 0 0 1-15 3' }],
  ['path', { d: 'M6 22v-3h3' }],
];

/** Source: `src/icons/svg/camera-isometric.svg` */
export const IsometricPerspectiveNode: IconNode = [
  ['path', { d: 'M11.549 11.368 2 5.855' }],
  ['path', { d: 'M11.549 19.944 11.549 17.252' }],
  ['path', { d: 'M11.549 14.06 11.549 11.368' }],
  ['path', { d: 'M11.549 19.944 2 14.431' }],
  ['path', { d: 'M2 14.431 2 5.855' }],
  ['path', { d: 'M2 5.855 6.775 3.098' }],
  ['path', { d: 'M6.775 3.098 16.324 8.611' }],
  ['path', { d: 'M11.549 11.368 16.324 8.611' }],
  ['path', { d: 'M16.324 8.611 16.324 11.151' }],
  ['path', { d: 'M13.749 18.674 11.549 19.944' }],
  ['path', { d: 'M15.887 10.899 21.192 13.962' }],
  ['path', { d: 'M11.986 17.656 17.291 20.719' }],
  ['path', { d: 'M15.887 10.899A3.901 2.252 -60 0 0 11.986 17.656' }],
  [
    'path',
    {
      d: 'M21.192 13.962A3.901 2.252 -60 1 1 17.291 20.719A3.901 2.252 -60 1 1 21.192 13.962Z',
    },
  ],
];
export const GameCameraNode: IconNode = [
  ['rect', { x: '2', y: '6', width: '16', height: '12', rx: '2' }],
  ['path', { d: 'm18 10 4-3v10l-4-3' }],
  ['path', { d: 'M6 12h4m-2-2v4' }],
  ['path', { d: 'M14 10h.01M14 14h.01' }],
];

/** Filled window frame for the dock control. 16×16, not the 24 stroke grid. */
export const DockNode: IconNode = [
  [
    'path',
    {
      d: 'M0 2.75C0 1.784.784 1 1.75 1h12.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0 1 14.25 15H1.75A1.75 1.75 0 0 1 0 13.25ZM14.5 6h-13v7.25c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25Zm-6-3.5v2h6V2.75a.25.25 0 0 0-.25-.25ZM5 2.5v2h2v-2Zm-3.25 0a.25.25 0 0 0-.25.25V4.5h2v-2Z',
    },
  ],
];

/**
 * One side-view camera — body on the left, lens pointing right, subject plane
 * on the right — turned about the icon center. Positive degrees are clockwise,
 * which is what puts the camera on that side of the subject:
 * 0 left, 45 iso left/top, 90 top, 135 iso right/top, 180 right,
 * 225 iso right/bottom, 270 bottom, 315 iso left/bottom.
 */
const FACING_RIGHT: IconNode = [
  ['rect', { x: '2', y: '8', width: '8', height: '8', rx: '2' }],
  ['path', { d: 'm10 10 4-2v8l-4-2' }],
  ['path', { d: 'M16 6h4v12h-4' }],
];

function turnCamera(angle: number): IconNode {
  if (angle === 0) return FACING_RIGHT;
  const transform = `rotate(${angle} 12 12)`;
  return FACING_RIGHT.map(([element, attrs]) => [element, { ...attrs, transform }]) as IconNode;
}

export const ViewLeftNode = turnCamera(0);
export const ViewIsoLeftTopNode = turnCamera(45);
export const ViewTopNode = turnCamera(90);
export const ViewIsoRightTopNode = turnCamera(135);
export const ViewRightNode = turnCamera(180);
export const ViewIsoRightBottomNode = turnCamera(225);
export const ViewBottomNode = turnCamera(270);
export const ViewIsoLeftBottomNode = turnCamera(315);

export const cameraIconNodes = {
  perspective: PerspectiveNode,
  'sideview-perspective': SideviewPerspectiveNode,
  'top-down-perspective': TopDownPerspectiveNode,
  'isometric-perspective': IsometricPerspectiveNode,
  'free-perspective': FreePerspectiveNode,
  'game-camera': GameCameraNode,
  'view-left': ViewLeftNode,
  'view-iso-left-top': ViewIsoLeftTopNode,
  'view-top': ViewTopNode,
  'view-iso-right-top': ViewIsoRightTopNode,
  'view-right': ViewRightNode,
  'view-iso-right-bottom': ViewIsoRightBottomNode,
  'view-bottom': ViewBottomNode,
  'view-iso-left-bottom': ViewIsoLeftBottomNode,
} as const;

export type CameraIconName = keyof typeof cameraIconNodes;
