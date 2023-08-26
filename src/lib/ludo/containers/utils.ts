import {BaseColors} from '@server/lib/ludo/state/interfaces';

import {BASE_COLORS, CELL_DIMENSION} from '@server/entities/ludo-constants';

export const getStyleObject = (
  cellCountLengthwise: number,
  cellCountWidthwise: number,
  baseColor?: BaseColors,
): React.CSSProperties => ({
  backgroundColor: baseColor && getBaseHexColor(baseColor),
  height: `${cellCountWidthwise * CELL_DIMENSION}px`,
  width: `${cellCountLengthwise * CELL_DIMENSION}px`,
});


// bugged
export const getBoardStyles = (
  cellCountLengthwise: number,
  cellCountWidthwise: number,
  baseColor?: BaseColors,
): React.CSSProperties => ({
  backgroundColor: baseColor && getBaseHexColor(baseColor),
  height: `${cellCountWidthwise * CELL_DIMENSION + 2}px`,
  width: `${cellCountLengthwise * CELL_DIMENSION + 2}px`,
});

export const getBaseHexColor = (color: BaseColors) => BASE_COLORS[color];
