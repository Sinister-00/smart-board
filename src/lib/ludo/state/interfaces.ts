import { ForkEffect } from 'redux-saga/effects';

import { IState as IDiceState } from '@server/lib/ludo/containers/Dice/state/interfaces';
import { IState as ILudoState } from '@server/lib/ludo/containers/Ludo/state/interfaces';
import { IState as IContextMenuState } from '@server/lib/ludo/services/contextMenu/interfaces';

export enum BaseColors {
  RED = 'RED',
  GREEN = 'GREEN',
  BLUE = 'BLUE',
  YELLOW = 'YELLOW',
}

export enum WalkwayPosition {
  NORTH = 'NORTH',
  EAST = 'EAST',
  WEST = 'WEST',
  SOUTH = 'SOUTH',
}

export interface IApplicationState {
  ludo: ILudoState;
  contextMenu: IContextMenuState;
  dice: IDiceState;
}

export interface IReduxAction<T = any, D = any> {
  type: T;
  data?: D;
}

export interface ISaga {
  (): IterableIterator<ForkEffect>;
}
