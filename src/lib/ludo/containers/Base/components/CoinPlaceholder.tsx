import React from 'react';

import {getStyleObject} from '@server/lib/ludo/containers/utils';
import {COIN_PLACEHOLDER_SIZE, COIN_SIZE} from '@server/entities/ludo-constants';
import {BaseColors} from '@server/lib/ludo/state/interfaces';

import {Coin} from './Coin';

import styles from './CoinPlaceholder.module.css';

interface ICoinPlaceholderProps {
  baseColor: BaseColors;
  isCoinHidden: boolean;
  onCoinClicked: () => void;
}

export class CoinPlaceholder extends React.PureComponent<ICoinPlaceholderProps> {
  render() {
    const {baseColor, isCoinHidden} = this.props;
    return (
      <div className={styles.Container} style={getStyleObject(COIN_PLACEHOLDER_SIZE, COIN_PLACEHOLDER_SIZE)}>
        <div className={styles.Circle} style={getStyleObject(COIN_SIZE, COIN_SIZE, baseColor)}>
          {
            isCoinHidden
              ? null
              : (
                <Coin baseColor={baseColor} onCoinClicked={() => this.props.onCoinClicked()} />
              )
          }
        </div>
      </div>
    );
  }
}
