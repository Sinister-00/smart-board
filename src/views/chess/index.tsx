import {Chessboard} from "@server/lib/chess";
import {CustomPieces, Piece, Square} from "@server/lib/chess/types";
import {Chess} from "chess.js";
import {useState} from "react";

// can implement lodash for deep copies

const buttonStyle = {
  cursor: "pointer",
  padding: "10px 20px",
  margin: "10px 10px 0px 0px",
  borderRadius: "6px",
  backgroundColor: "#f0d9b5",
  border: "none",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.5)",
};

const boardWrapper = {
  width: `70vw`,
  maxWidth: "70vh",
  margin: "3rem auto",
};

const StyledBoard = () => {
  const [game, setGame] = useState(new Chess());

  function safeGameMutate(modify: (update: Chess) => void) {
    setGame((g) => {
      const update = {...g} as Chess;
      Object.setPrototypeOf(update, Object.getPrototypeOf(g));
      modify(update);
      return update;
    });
  }

  function onDrop(sourceSquare: Square, targetSquare: Square, piece: Piece) {
    const gameCopy = {...game} as Chess;
    Object.setPrototypeOf(gameCopy, Object.getPrototypeOf(game));
    let moveSuccessful = false
    try {
      const move = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: piece[1].toLowerCase() ?? "q",
      });
      setGame(gameCopy);
      moveSuccessful = true;
    }
    catch (e) {
      console.error(e)
      alert('Wrong Move')
    }
    return moveSuccessful;
  }

  const pieces: Piece[] = [
    "wP",
    "wN",
    "wB",
    "wR",
    "wQ",
    "wK",
    "bP",
    "bN",
    "bB",
    "bR",
    "bQ",
    "bK",
  ];
  const customPieces = () => {
    const returnPieces: CustomPieces = {};
    pieces.map((p) => {
      returnPieces[p] = ({squareWidth}) => (
        <div
          style={{
            width: squareWidth,
            height: squareWidth,
            backgroundImage: `url(/media/${p}.png)`,
            backgroundSize: "100%",
          }}
        />
      );
      return null;
    });
    return returnPieces;
  };

  return (
    <div style={boardWrapper}>
      <Chessboard
        id="StyledBoard"
        boardOrientation="black"
        position={game.fen()}
        onPieceDrop={onDrop}
        customBoardStyle={{
          borderRadius: "4px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
        }}
        customDarkSquareStyle={{backgroundColor: "#779952"}}
        customLightSquareStyle={{backgroundColor: "#edeed1"}}
        customPieces={customPieces()}
      />
      <button
        style={buttonStyle}
        onClick={() => {
          safeGameMutate((game) => {
            game.reset();
          });
        }}
      >
        reset
      </button>
      <button
        style={buttonStyle}
        onClick={() => {
          safeGameMutate((game) => {
            game.undo();
          });
        }}
      >
        undo
      </button>
    </div>
  );
};

export default StyledBoard