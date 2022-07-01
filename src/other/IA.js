import {
  getPiecePossiblePositions,
  updatePieces,
  getPeonToEvolve,
  getPositionValues,
  checkIfPositionIsEmpty,
} from "../utils/utils";

import Piece from "../schemas/Piece";

export function RandomMovement(pieces, board, history) {
  const onlyIAPieces = pieces.filter(x => !x.fromPlayer);
  const randomPiece = onlyIAPieces[Math.floor(Math.random() * onlyIAPieces.length)];
  const newPossiblePositions = getPiecePossiblePositions(
    randomPiece,
    pieces,
    board,
    history
  );
  if (newPossiblePositions.length > 0) {
    const randomPosition = newPossiblePositions[Math.floor(Math.random() * newPossiblePositions.length)];
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
  if (onlyIAPieces.length == 1) {
    return [[], []]
  }
  else {
    return RandomMovement(pieces, board, history);
  }
}

export function MinMaxVariation(pieces, board, history) {
    const onlyIAPieces = pieces.filter(x => !x.fromPlayer);
    const onlyPlayerPieces = pieces.filter(x => x.fromPlayer);
    let bestPlayPositive = { bestValue: 0, bestPosition: '', bestPiece: null }
    let bestPlayNegative = { bestValue: 0, bestPosition: '', bestPiece: null }

    onlyIAPieces.forEach(piece => {
      const piecePositions = getPiecePossiblePositions(piece, pieces, board, history);
      const bestPossibleAttackValue = getPositionValues(piece, piecePositions, pieces, true);
      if (bestPossibleAttackValue.bestValue > bestPlayPositive.bestValue) {
        bestPlayPositive.bestValue = bestPossibleAttackValue.bestValue;
        bestPlayPositive.bestPosition = bestPossibleAttackValue.bestPosition;
        bestPlayPositive.bestPiece = piece;
      }
    });

    onlyPlayerPieces.forEach(piece => {
      const piecePositions = getPiecePossiblePositions(piece, pieces, board, history, true);
      const bestPossibleDefenseValue = getPositionValues(piece, piecePositions, pieces, false);
      if (!checkIfPositionIsEmpty(bestPossibleDefenseValue.bestPosition, pieces) && bestPossibleDefenseValue.bestValue < bestPlayNegative.bestValue) {
        bestPlayNegative.bestValue = bestPossibleDefenseValue.bestValue;
        bestPlayNegative.bestPosition = bestPossibleDefenseValue.bestPosition;
        bestPlayNegative.bestPiece = pieces.find(x => x.position == bestPossibleDefenseValue.bestPosition && !x.fromPlayer);
      }
    });

    if(bestPlayNegative.bestPiece == null && bestPlayPositive.bestPiece == null){
      return [[], []];
    }

    let attack = true;
    if ((bestPlayPositive.bestValue + bestPlayNegative.bestValue) < 0 && bestPlayNegative.bestPiece) {
      attack = false;
    }
    if (attack) {
      const newHistory = [
        ...history,
        {
          id: bestPlayPositive.bestPiece.id,
          date: new Date().toLocaleString(),
          oldPosition: bestPlayPositive.bestPiece.position,
          newPosition: bestPlayPositive.bestPosition,
          type: bestPlayPositive.bestPiece.type,
          color: bestPlayPositive.bestPiece.fromPlayer ? "branco" : "preto"
        },
      ]
      let newPieces = updatePieces(
        bestPlayPositive.bestPiece.id,
        bestPlayPositive.bestPosition,
        pieces
      );
      const peonToEvolve = getPeonToEvolve(newPieces, board);
      if (peonToEvolve && !peonToEvolve.fromPlayer) {
        const index = newPieces.findIndex(x => x.id == peonToEvolve.id);
        const oldPeon = newPieces[index];
        newPieces[index] = new Piece(oldPeon.id, oldPeon.fromPlayer, oldPeon.position, 'rainha');
      }
      return [newPieces, newHistory];
    } else {
      const newPositions = getPiecePossiblePositions(bestPlayNegative.bestPiece, pieces, board, history, false);
      if (newPositions.length > 0) {
        const bestPossibleValue = getPositionValues(bestPlayNegative.bestPiece, newPositions, pieces, true);
        const newHistory = [
          ...history,
          {
            id: bestPlayNegative.bestPiece.id,
            date: new Date().toLocaleString(),
            oldPosition: bestPlayNegative.bestPiece.position,
            newPosition: bestPossibleValue.bestPosition,
            type: bestPlayNegative.bestPiece.type,
            color: bestPlayNegative.bestPiece.fromPlayer ? "branco" : "preto"
          },
        ]
        let newPieces = updatePieces(
          bestPlayNegative.bestPiece.id,
          bestPossibleValue.bestPosition,
          pieces
        );
        const peonToEvolve = getPeonToEvolve(newPieces, board);
        if (peonToEvolve && !peonToEvolve.fromPlayer) {
          const index = newPieces.findIndex(x => x.id == peonToEvolve.id);
          const oldPeon = newPieces[index];
          newPieces[index] = new Piece(oldPeon.id, oldPeon.fromPlayer, oldPeon.position, 'rainha');
        }
        return [newPieces, newHistory];
      }else{
        if(pieces.some(x => !x.fromPlayer))
          return RandomMovement(pieces, board, history)
        else
          return [[], []]
      }
    }
}