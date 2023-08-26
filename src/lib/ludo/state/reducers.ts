import {NAME as dieReducerNAME} from '@server/lib/ludo/containers/Dice/state/constants';
import {reducer as dieReducer} from '@server/lib/ludo/containers/Dice/state/reducer';
import {NAME as ludoReducerName} from '@server/lib/ludo/containers/Ludo/state/constants';
import {reducer as ludoReducer} from '@server/lib/ludo/containers/Ludo/state/reducer';
import {NAME as contextMenuReducerName} from '@server/lib/ludo/services/contextMenu/constants';
import {reducer as contextMenuReducer} from '@server/lib/ludo/services/contextMenu/reducer';

export const reducers = {
  [ludoReducerName]: ludoReducer,
  [contextMenuReducerName]: contextMenuReducer,
  [dieReducerNAME]: dieReducer,
}
