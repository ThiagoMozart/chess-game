import React, { useContext, useEffect, useState } from "react";
import PieceChangeModal from "./PieceChangeModal.jsx";
import GameOver from "./GameOver.jsx";
import {
  fillBoardWithPieces,
  mountBoard,
  getPiecePossiblePositions,
  updatePieces,
  getPeonToEvolve,
} from "../utils/utils";
import Tile from "./Tile.jsx";

import { historyContext } from "../context/historyContext";
import { peonToEvolveContext } from "../context/peonToEvolveContext";
import { IATurnContext } from "../context/IATurnContext";

import { RandomMovement, MinMaxVariation } from "../other/IA";

import "./styles/Chessboard.css";

export default function Chessboard() {
  const [board, setBoard] = useState(mountBoard());
  const [pieces, setPieces] = useState(fillBoardWithPieces());
  const [activePieceElement, setActivePieceElement] = useState(null);
  const [possiblePositions, setPossiblePositions] = useState([]);
  const { history, setHistory } = useContext(historyContext);
  const { peonToEvolve, setPeonToEvolve } = useContext(peonToEvolveContext);
  const [pieceModalShow, setPieceModalShow] = useState(false);
  const [GameFinishModal, setGameFinishModal] = useState(false);
  const [winner, setWinner] = useState(null);
  const { IATurn, setIATurn } = useContext(IATurnContext);

  useEffect(() => {
    const kings = pieces.filter((x) => x.type == "rei");
    if (kings.length == 1) {
      setWinner(kings[0].fromPlayer ? "GANHOU" : "PERDEU");
      setGameFinishModal(true);
    }
  }, [pieces]);

  useEffect(() => {
    let newBoard = [...board];
    newBoard.map((tile) => {
      return reloadChessboardTile(tile);
    });
    setBoard(newBoard);
  }, [pieces, possiblePositions, pieceModalShow]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (IATurn) {
      const [newPieces, newHistory] = MinMaxVariation(pieces, board, history);
      if (newPieces.length == 0) {
        setWinner("GANHOU");
        setGameFinishModal(true);
      }
      setPieces(newPieces);
      setHistory(newHistory);
      setIATurn(false);
    }
  }, [IATurn]);

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

  const canDropPiece = () => activePieceElement;

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

        if (
          pieces[foundItem].type == "rei" &&
          possiblePositions.length == 0
        ) {
          let isPossible = false;
          const playerPieces = pieces.filter((x) => x.fromPlayer);
          playerPieces.forEach((x) => {
            const internalPossiblePositions = getPiecePossiblePositions(
              x,
              pieces,
              board,
              history
            );
            if(internalPossiblePositions.length > 0){
              isPossible = true;
            }
            if(isPossible){
              return;
            }
          });

          if(!isPossible){
            setWinner("PERDEU");
            setGameFinishModal(true);
            return;
          }
        }

        const newPositionInPossibles = possiblePositions.find(
          (x) => x == destinationElementPosition
        );
        if (pieces[foundItem].fromPlayer && newPositionInPossibles && !IATurn) {
          setHistory(() => [
            ...history,
            {
              id: pieces[foundItem].id,
              date: new Date().toLocaleString(),
              oldPosition: pieces[foundItem].position,
              newPosition: destinationElementPosition,
              type: pieces[foundItem].type,
              color: pieces[foundItem].fromPlayer ? "branco" : "preto",
            },
          ]);

          let newPieces = [...pieces];

          //positions e ids hardcoded para ganhar tempo
          if (
            pieces[foundItem].type == "rei" &&
            pieces[foundItem].position == "x0y4"
          ) {
            if (destinationElementPosition == "x0y6") {
              newPieces = updatePieces(15, "x0y5", newPieces);
            } else if (destinationElementPosition == "x0y2") {
              newPieces = updatePieces(8, "x0y3", newPieces);
            }
          }

          newPieces = updatePieces(
            pieces[foundItem].id,
            destinationElementPosition,
            pieces
          );

          setPieces(newPieces);

          const peonToEvolve = getPeonToEvolve(newPieces, board);
          if (peonToEvolve && peonToEvolve.fromPlayer) {
            setPeonToEvolve(peonToEvolve);
            setPieceModalShow(true);
          }

          setIATurn(true);
        }
      }
    }
    setActivePieceElement(null);
    setPossiblePositions([]);
  }

  const updatePeonToEvolved = () => {
    const alteredPieces = pieces;
    const foundItem = alteredPieces.findIndex((x) => x.id == peonToEvolve.id);
    alteredPieces[foundItem] = peonToEvolve;
    setPieceModalShow(false);
    setPeonToEvolve(null);
    setPieces(alteredPieces);
  };

  return (
    <div
      id="chessboard"      
      onDragOver={(e) => e.preventDefault()}
      onDragStart={(e) => grabPiece(e)}
      onDragEnd={(e) => dropPiece(e)}
    >
      <PieceChangeModal show={pieceModalShow} onHide={updatePeonToEvolved} />
      <GameOver show={GameFinishModal} winner={winner} />

      {board.map((x, index) => {
        return x.element;
      })}
    </div>
  );
}
