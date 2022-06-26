import {
    getPiecePossiblePositions,
    updatePieces,
    getPeonToEvolve,
  } from "../utils/utils";

  import Piece from "../schemas/Piece";

export function RandomMovement(pieces, board, history){
    const onlyIAPieces = pieces.filter(x => !x.fromPlayer);
    const randomPiece = onlyIAPieces[Math.floor(Math.random()*onlyIAPieces.length)];
    const newPossiblePositions = getPiecePossiblePositions(
        randomPiece,
        pieces,
        board,
        history
      );
    if(newPossiblePositions.length > 0){
        const randomPosition = newPossiblePositions[Math.floor(Math.random()*newPossiblePositions.length)];
        const newHistory = [
            ...history,
            {
              id: randomPiece.id,
              date: new Date().toLocaleString(),
              oldPosition: randomPiece.position,
              newPosition: randomPosition,
              type: randomPiece.type,
              color: randomPiece.fromPlayer ? "branco" : "preto"
            },
          ]
        let newPieces = updatePieces(
            randomPiece.id,
            randomPosition,
            pieces
          );
          const peonToEvolve = getPeonToEvolve(newPieces, board);
          if (peonToEvolve && !peonToEvolve.fromPlayer) {
              const index = newPieces.findIndex(x => x.id == peonToEvolve.id);
              const oldPeon = newPieces[index];
              newPieces[index] = new Piece(oldPeon.id, oldPeon.fromPlayer, oldPeon.position, 'rainha');
          }
        return [newPieces, newHistory];
    }
    if(onlyIAPieces.length == 1){
      return [[], []]
    }
    else {
      return RandomMovement(pieces, board, history);
    }
}