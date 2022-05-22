import React, { useEffect, useState } from "react";
import { fillBoardWithPieces, mountBoard } from "../utils/utils";
import Tile from './Tile.jsx'

import "./styles/Chessboard.css";

export default function Chessboard() {
  const [board, setBoard] = useState(mountBoard());
  const [pieces, setPieces] = useState(fillBoardWithPieces());
  let activePiece = null;

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
      activePiece = element.parentElement;
    }
  }

  function dropPiece(e) {
    if (activePiece) {
      const x = e.clientX;
      const y = e.clientY;
      let elementMouseIsOver = document.elementFromPoint(x, y);
      let newPieces = [...pieces];
      const elementClasses = elementMouseIsOver.classList;
      let isBlack = elementClasses.contains('piece');
      if (isBlack) {
        const piece = elementMouseIsOver.parentElement;
        const foundItem = pieces.findIndex((x) => x.position === piece.id);
        if (foundItem !== -1 && !newPieces[foundItem].fromPlayer) {
            newPieces.splice(foundItem, 1);
            elementMouseIsOver = piece;
        }
        else {
          isBlack = false;
        }
      }
      const isTileElement = elementClasses.contains('white-square') || elementClasses.contains('black-square') || isBlack;
      if (isTileElement) {
        const foundItem = pieces.findIndex((x) => x.position === activePiece.id);
        if (foundItem !== -1 && newPieces[foundItem].fromPlayer) {
          newPieces[foundItem].position = elementMouseIsOver.id;
          setPieces(newPieces);
        }
      }
    }
    activePiece = null;
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
