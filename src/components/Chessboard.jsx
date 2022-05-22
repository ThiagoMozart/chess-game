import React, { useEffect, useState } from "react";
import { fillBoardWithPieces, mountBoard, getPiecePossiblePositions, updatePieces } from "../utils/utils";
import Tile from './Tile.jsx'

import "./styles/Chessboard.css";

export default function Chessboard() {
  const [board, setBoard] = useState(mountBoard());
  const [pieces, setPieces] = useState(fillBoardWithPieces());
  const [activePieceElement, setActivePieceElement] = useState(null);
  const [possiblePositions, setPossiblePositions] = useState([]);

  useEffect(() => {
    let newBoard = [...board];
    newBoard.map((tile) => {
      return reloadChessboardTile(tile);
    });
    setBoard(newBoard);
  }, [pieces]); // eslint-disable-line react-hooks/exhaustive-deps

  function reloadChessboardTile(tile) {
    const itemIndexInPieces = pieces.findIndex((x) => x.position === tile.position);
    const anyPieceInThisTile = itemIndexInPieces !== -1;
    if (anyPieceInThisTile) {
       const piece = pieces[itemIndexInPieces];
       tile.element = (
         <Tile
           key={tile.position}
           position={tile.position}
           squareColor={tile.squareColor}
         >
           <img className="piece" draggable='true' alt="" src={piece.imagePath} loading="lazy" />
         </Tile>
       );
     } else {
       tile.element = (
         <Tile
           key={tile.position}
           position={tile.position}
           squareColor={tile.squareColor}
         ></Tile>
       );
     }
     return tile;
  }

  function grabPiece(e) {
    const element = e.target;
    const elementClasses = element.classList;
    const isPieceElement = elementClasses.contains('piece');

    if (isPieceElement) {
      const pieceTile = element.parentElement
      
      const activePiece = pieces.findIndex((x) => x.position === pieceTile.id);
      const newPossiblePositions = getPiecePossiblePositions(activePiece, board);
      setPossiblePositions(newPossiblePositions)
      setActivePieceElement(pieceTile);
    }
  }

  const canDropPiece = () => activePieceElement && possiblePositions.length > 0;

  function dropPiece(e) {
    if (canDropPiece) {
      const x = e.clientX;
      const y = e.clientY;
      const elementMouseIsOver = document.elementFromPoint(x, y);
      const elementClasses = elementMouseIsOver.classList;

      const isTileElement = elementClasses.contains('white-square') || elementClasses.contains('black-square');
      const pieceElement = pieces.find(x => x.position === elementMouseIsOver.parentElement.id);
      const isEnemyPiece = pieceElement && !pieceElement.fromPlayer;
      if (isTileElement || isEnemyPiece) {
        const destinationElementPosition = isEnemyPiece ? pieceElement.position : elementMouseIsOver.id;

        const foundItem = pieces.findIndex((x) => x.position === activePieceElement.id);
        if (pieces[foundItem].fromPlayer) {
          const newPieces = updatePieces(pieces[foundItem].position, destinationElementPosition, pieces);
          setPieces(newPieces);
        }
      }
    }
    setActivePieceElement(null);
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
