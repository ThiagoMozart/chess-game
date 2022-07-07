import "@testing-library/jest-dom"
import Piece from "../../schemas/Piece.js"
import { historyContext, HistoryProvider } from "../../context/historyContext.js";
import { fillBoardWithPieces, mountBoard, getPeonToEvolve, checkIfPositionIsEmpty, checkIfPositionExist, updatePieces } from "../../utils/utils.js";

test("Should have same number of objects in array as pieces in an usual chess game", () => {
    const usualNumberOfPiecesInChess = 32;
    expect(fillBoardWithPieces().length).toBe(usualNumberOfPiecesInChess);
  });

test("Should have the player king piece and the IA king piece", () => {
    expect(fillBoardWithPieces()).toEqual(
      expect.arrayContaining([
        expect.objectContaining(new Piece(12, true, 'x0y4', 'rei')),
        expect.objectContaining(new Piece(28, false, 'x7y4', 'rei'))
      ])
    );
});

test("Should return if a peon can evolve", () => {
  const board = mountBoard();
  const pieces = fillBoardWithPieces();
  
  expect(getPeonToEvolve(pieces, board)).toBe(null);

  pieces[0] = new Piece(0, true, 'x7y3', 'peao');
  pieces[27] = new Piece(27, false, 'x1y0', 'rainha');

  expect(getPeonToEvolve(pieces, board)).toBe(pieces[0]);

});

test("Check if position is empty", () => {
  const pieces = fillBoardWithPieces();

  expect(checkIfPositionIsEmpty('x7y3', pieces)).toBe(false);
  expect(checkIfPositionIsEmpty('x5y3', pieces)).toBe(true);
});

test("Check if position exist", () =>{

  const board = mountBoard();
  const position1 = 'x5y3';
  const position2 = 'x1000y1000';
 
  expect(checkIfPositionExist(position1,board)).toBe(true);
  expect(checkIfPositionExist(position2,board)).toBe(false);
});

test("Update pieces",() => {

  const id = 16;
  const newPosition = 'x2y2';
  
  const pieces = fillBoardWithPieces();
  expect(updatePieces(id, newPosition, pieces).length).toEqual(32);

});

test("Update pieces",() => {

  const id = 12;
  const newPosition = 'x1y1';
  
  const pieces = fillBoardWithPieces();
  const piecesTest = pieces.slice(6);
  expect(updatePieces(id, newPosition, piecesTest).length).toEqual(26);
});
