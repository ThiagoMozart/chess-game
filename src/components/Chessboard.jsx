import React, { useContext, useEffect, useState } from "react";
import {
  fillBoardWithPieces,
  mountBoard,
  getPiecePossiblePositions,
  updatePieces,
} from "../utils/utils";
import Tile from "./Tile.jsx";

import { historyContext } from "../context/historyContext";

import "./styles/Chessboard.css";

export default function Chessboard() {
  const [board, setBoard] = useState(mountBoard());
  const [pieces, setPieces] = useState(fillBoardWithPieces());
  const [activePieceElement, setActivePieceElement] = useState(null);
  const [possiblePositions, setPossiblePositions] = useState([]);
  const { history, setHistory } = useContext(historyContext);

  useEffect(() => {
    let newBoard = [...board];
    newBoard.map((tile) => {
      return reloadChessboardTile(tile);
    });
    setBoard(newBoard);
  }, [pieces, possiblePositions]); // eslint-disable-line react-hooks/exhaustive-deps

  function reloadChessboardTile(tile) {
    const itemIndexInPieces = pieces.findIndex(
      (x) => x.position === tile.position
    );
    const anyPieceInThisTile = itemIndexInPieces !== -1;
    const isPossiblePosition = possiblePositions.includes(tile.position);
    if (anyPieceInThisTile) {
      const piece = pieces[itemIndexInPieces];
      tile.element = (
        <Tile
          key={tile.position}
          position={tile.position}
          squareColor={tile.squareColor}
          possiblePosition={isPossiblePosition}
        >
          <img
            className="piece"
            draggable="true"
            alt=""
            src={piece.imagePath}
            loading="lazy"
          />
        </Tile>
      );
    } else {
      tile.element = (
        <Tile
          key={tile.position}
          position={tile.position}
          squareColor={tile.squareColor}
          possiblePosition={isPossiblePosition}
        ></Tile>
      );
    }
    return tile;
  }

  function grabPiece(e) {
    const element = e.target;
    const elementClasses = element.classList;
    const isPieceElement = elementClasses.contains("piece");

    if (isPieceElement) {
      const pieceTile = element.parentElement;
      const activePiece = pieces.find((x) => x.position === pieceTile.id);
      if (activePiece.fromPlayer) {
        const newPossiblePositions = getPiecePossiblePositions(
          activePiece,
          pieces,
          board,
          history
        );
        setPossiblePositions(newPossiblePositions);
        setActivePieceElement(pieceTile);
      }
    }
  }

  const canDropPiece = () => activePieceElement && possiblePositions.length > 0;

  const getElementMouseIsOver = (e) => {
    const x = e.clientX;
    const y = e.clientY;
    return document.elementFromPoint(x, y);
  };

  const checkIfIsTile = (elementClasses) => {
    return (
      elementClasses.contains("white-square") ||
      elementClasses.contains("black-square")
    );
  };

  function dropPiece(e) {
    if (canDropPiece()) {
      const elementMouseIsOver = getElementMouseIsOver(e);
      const elementClasses = elementMouseIsOver.classList;

      const isTileElement = checkIfIsTile(elementClasses);

      const pieceElement = pieces.find(
        (x) => x.position === elementMouseIsOver.parentElement.id
      );

      const isEnemyPiece = pieceElement && !pieceElement.fromPlayer;

      if (isTileElement || isEnemyPiece) {
        const destinationElementPosition = isEnemyPiece
          ? pieceElement.position
          : elementMouseIsOver.id;

        const foundItem = pieces.findIndex(
          (x) => x.position === activePieceElement.id
        );
        const newPositionInPossibles = possiblePositions.find(
          (x) => x == destinationElementPosition
        );
        if (pieces[foundItem].fromPlayer && newPositionInPossibles) {
          setHistory(() => [
            ...history,
            {
              id: pieces[foundItem].id,
              date: new Date().toLocaleString(),
              oldPosition: pieces[foundItem].position,
              newPosition: destinationElementPosition,
              type: pieces[foundItem].type,
              color: pieces[foundItem].fromPlayer ? 'branco' : 'preto',
            },
          ]);
          const newPieces = updatePieces(
            pieces[foundItem].position,
            destinationElementPosition,
            pieces
          );
          setPieces(newPieces);
        }
      }
    }
    setActivePieceElement(null);
    setPossiblePositions([]);
  }

  return (
    <div
      id="chessboard"
      onDragStart={(e) => grabPiece(e)}
      onDragEnd={(e) => dropPiece(e)}
    >
      {board.map((x, index) => {
        return x.element;
      })}
    </div>
  );
}
