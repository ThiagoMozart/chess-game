import "@testing-library/jest-dom"
import Piece from "../../schemas/Piece.js"
import { fillBoardWithPieces, mountBoard, getPeonToEvolve, checkIfPositionIsEmpty, checkIfPositionExist, updatePieces, getPossibleRangePositions, getPiecePossiblePositions } from "../../utils/utils.js";

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

test ("Get Possible Range Positions",() =>{

  const pieces = fillBoardWithPieces();
  pieces[0] = new Piece(8, true, 'x0y0', 'torre'),
  pieces[1] = new Piece(10, true, 'x1y3', 'bispo'),
  pieces[2] = new Piece(11, true, 'x1y3', 'rainha'),
  pieces[3] = new Piece(8, true, 'x4y4', 'torre');
  const board = mountBoard();

  expect(getPossibleRangePositions (pieces[0], pieces, board, 'top', 'left').length).toEqual(0);
  expect(getPossibleRangePositions (pieces[1], pieces, board, 'top', 'left').length).toEqual(3);
  expect(getPossibleRangePositions (pieces[1], pieces, board, 'top', 'right').length).toEqual(4);
  expect(getPossibleRangePositions (pieces[2], pieces, board, 'top', 'right').length).toEqual(4);
  expect(getPossibleRangePositions (pieces[3], pieces, board, 'bottom', 'left').length).toEqual(3);

})

test("Get Piece Possible Positions ", () =>{

  const pieces = fillBoardWithPieces();
  pieces[0] = new Piece(0, true, 'x1y0', 'peao'),
  pieces[1] = new Piece(8, true, 'x0y0', 'torre'),
  pieces[2] = new Piece(8, true, 'x6y0', 'torre'),
  pieces[3] = new Piece(9, true, 'x1y3', 'cavalo'),
  pieces[4] =  new Piece(12, true, 'x5y4', 'rei'),
  pieces[5] = new Piece(13, true, 'x0y5', 'bispo');

  const board = mountBoard();

  expect(getPiecePossiblePositions(pieces[0], pieces, board, [], false).length).toEqual(2);
  expect(getPiecePossiblePositions(pieces[1], pieces, board, [], false).length).toEqual(0);
  expect(getPiecePossiblePositions(pieces[2], pieces, board, [], false).length).toEqual(6);
  expect(getPiecePossiblePositions(pieces[3], pieces, board, [], false).length).toEqual(4);
  expect(getPiecePossiblePositions(pieces[4], pieces, board, [], false).length).toEqual(6);
  expect(getPiecePossiblePositions(pieces[5], pieces, board, [], false).length).toEqual(5);

})