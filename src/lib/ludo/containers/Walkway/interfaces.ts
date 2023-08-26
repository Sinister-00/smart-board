import {CellType} from '@server/lib/ludo/containers/Ludo/state/interfaces';
import {WalkwayPosition} from '@server/lib/ludo/state/interfaces';

export interface IContextMenuOptions {
  cellID: string,
  cellType: CellType;
  column: number,
  position: WalkwayPosition,
  row: number,
  x: number,
  y: number,
}
