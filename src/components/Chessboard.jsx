import React, { useEffect, useState } from "react";
import { fillBoardWithPieces, mountBoard } from "../utils/utils";
import Tile from './Tile.jsx'

import "./styles/Chessboard.css";

export default function Chessboard() {
  const [board, setBoard] = useState(mountBoard());
  const [pieces, setPieces] = useState(fillBoardWithPieces());
  const [activePiece, setActivePiece] = useState(null);

  useEffect(() => {
    let newBoard = [...board];
    newBoard.map((tile) => {
      const foundItem = pieces.findIndex((x) => x.position === tile.position);
      if (foundItem != -1) {
        const piece = pieces[foundItem];
        tile.element = (
          <Tile
            position={tile.position}
            squareColor={tile.squareColor}
          >
            <img draggable='true' alt="" src={piece.imagePath} loading="lazy" />
          </Tile>
        );
      } else {
        tile.element = (
          <Tile
            position={tile.position}
            squareColor={tile.squareColor}
          ></Tile>
        );
      }
    });
    setBoard(newBoard);
  }, [pieces]); // eslint-disable-line react-hooks/exhaustive-deps

  function grabPiece(e) {
    //e.preventDefault();
    const element = e.target;
    if (element.parentElement.outerHTML.includes("img")) {
      setActivePiece(element.parentElement);
    } else {
      e.preventDefault();
    }
  }

  function dropPiece(e) {
    if (activePiece != null) {
      const x = e.clientX;
      const y = e.clientY;
      const elementMouseIsOver = document.elementFromPoint(x, y);
      const elementClasses = elementMouseIsOver.classList;
      const isTileElement = elementClasses.contains('white-square') || elementClasses.contains('black-square');
      if (isTileElement) {
        let newPieces = [...pieces];
        const foundItem = pieces.findIndex((x) => x.position == activePiece.id);
        if (foundItem != -1 && newPieces[foundItem].fromPlayer) {
          newPieces[foundItem].position = elementMouseIsOver.id;
          setPieces(newPieces);
        }
      }
    }
    setActivePiece(null);
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
