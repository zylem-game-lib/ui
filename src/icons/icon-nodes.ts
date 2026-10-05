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

export const cameraIconNodes = {
  perspective: PerspectiveNode,
  'sideview-perspective': SideviewPerspectiveNode,
  'top-down-perspective': TopDownPerspectiveNode,
  'isometric-perspective': IsometricPerspectiveNode,
  'free-perspective': FreePerspectiveNode,
  'game-camera': GameCameraNode,
} as const;

export type CameraIconName = keyof typeof cameraIconNodes;
