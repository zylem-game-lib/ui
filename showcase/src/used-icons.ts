import ArrowLeftToLine from 'lucide-solid/icons/arrow-left-to-line';
import ArrowRightToLine from 'lucide-solid/icons/arrow-right-to-line';
import Box from 'lucide-solid/icons/box';
import Boxes from 'lucide-solid/icons/boxes';
import Bug from 'lucide-solid/icons/bug';
import Check from 'lucide-solid/icons/check';
import ChevronDown from 'lucide-solid/icons/chevron-down';
import ChevronLeft from 'lucide-solid/icons/chevron-left';
import ChevronRight from 'lucide-solid/icons/chevron-right';
import ChevronUp from 'lucide-solid/icons/chevron-up';
import Circle from 'lucide-solid/icons/circle';
import CircleChevronDown from 'lucide-solid/icons/circle-chevron-down';
import CloudFog from 'lucide-solid/icons/cloud-fog';
import Cone from 'lucide-solid/icons/cone';
import Copy from 'lucide-solid/icons/copy';
import Cylinder from 'lucide-solid/icons/cylinder';
import Eraser from 'lucide-solid/icons/eraser';
import FastForward from 'lucide-solid/icons/fast-forward';
import Ghost from 'lucide-solid/icons/ghost';
import Globe from 'lucide-solid/icons/globe';
import Grid3x3 from 'lucide-solid/icons/grid-3x3';
import Hand from 'lucide-solid/icons/hand';
import Lock from 'lucide-solid/icons/lock';
import LockOpen from 'lucide-solid/icons/lock-open';
import Menu from 'lucide-solid/icons/menu';
import MousePointer from 'lucide-solid/icons/mouse-pointer';
import PaintBucket from 'lucide-solid/icons/paint-bucket';
import PanelLeft from 'lucide-solid/icons/panel-left';
import Pause from 'lucide-solid/icons/pause';
import Pencil from 'lucide-solid/icons/pencil';
import PersonStanding from 'lucide-solid/icons/person-standing';
import Pill from 'lucide-solid/icons/pill';
import Pipette from 'lucide-solid/icons/pipette';
import Play from 'lucide-solid/icons/play';
import Plus from 'lucide-solid/icons/plus';
import Pyramid from 'lucide-solid/icons/pyramid';
import Repeat from 'lucide-solid/icons/repeat';
import Rewind from 'lucide-solid/icons/rewind';
import RotateCcw from 'lucide-solid/icons/rotate-ccw';
import Search from 'lucide-solid/icons/search';
import Sparkles from 'lucide-solid/icons/sparkles';
import Spline from 'lucide-solid/icons/spline';
import Square from 'lucide-solid/icons/square';
import SquareDashed from 'lucide-solid/icons/square-dashed';
import Sun from 'lucide-solid/icons/sun';
import Torus from 'lucide-solid/icons/torus';
import Trash2 from 'lucide-solid/icons/trash-2';
import Type from 'lucide-solid/icons/type';
import Waypoints from 'lucide-solid/icons/waypoints';
import X from 'lucide-solid/icons/x';
import Zap from 'lucide-solid/icons/zap';
import type { Component } from 'solid-js';

/** Lucide glyph. Every entry here is imported somewhere in this repo. */
export interface UsedIcon {
	name: string;
	label: string;
	Icon: Component<{ size?: number }>;
}

function used(name: string, Icon: UsedIcon['Icon']): UsedIcon {
	const label = name
		.split('-')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
	return { name, label, Icon };
}

/** Every Lucide icon imported by the library or the showcase, once each. */
export const USED_LUCIDE_ICONS: readonly UsedIcon[] = [
	used('arrow-left-to-line', ArrowLeftToLine),
	used('arrow-right-to-line', ArrowRightToLine),
	used('box', Box),
	used('boxes', Boxes),
	used('bug', Bug),
	used('check', Check),
	used('chevron-down', ChevronDown),
	used('chevron-left', ChevronLeft),
	used('chevron-right', ChevronRight),
	used('chevron-up', ChevronUp),
	used('circle', Circle),
	used('circle-chevron-down', CircleChevronDown),
	used('cloud-fog', CloudFog),
	used('cone', Cone),
	used('copy', Copy),
	used('cylinder', Cylinder),
	used('eraser', Eraser),
	used('fast-forward', FastForward),
	used('ghost', Ghost),
	used('globe', Globe),
	used('grid-3x3', Grid3x3),
	used('hand', Hand),
	used('lock', Lock),
	used('lock-open', LockOpen),
	used('menu', Menu),
	used('mouse-pointer', MousePointer),
	used('paint-bucket', PaintBucket),
	used('panel-left', PanelLeft),
	used('pause', Pause),
	used('pencil', Pencil),
	used('person-standing', PersonStanding),
	used('pill', Pill),
	used('pipette', Pipette),
	used('play', Play),
	used('plus', Plus),
	used('pyramid', Pyramid),
	used('repeat', Repeat),
	used('rewind', Rewind),
	used('rotate-ccw', RotateCcw),
	used('search', Search),
	used('sparkles', Sparkles),
	used('spline', Spline),
	used('square', Square),
	used('square-dashed', SquareDashed),
	used('sun', Sun),
	used('torus', Torus),
	used('trash-2', Trash2),
	used('type', Type),
	used('waypoints', Waypoints),
	used('x', X),
	used('zap', Zap),
];
