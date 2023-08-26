import React from 'react';
import {Provider} from 'react-redux';

import {Ludo} from '@server/lib/ludo/containers/Ludo/Container';
import {store} from '@server/lib/ludo/state/store';

import './prototypeOverrides';

const LudoBoard = () => {
  return (
    <Provider store={store}>
      <Ludo />
    </Provider>
  )
}

export default LudoBoard