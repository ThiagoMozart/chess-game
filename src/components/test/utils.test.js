import "@testing-library/jest-dom"
import Piece from "../../schemas/Piece.js"
import { fillBoardWithPieces, mountBoard, getPeonToEvolve, checkIfPositionIsEmpty } from "../../utils/utils.js";

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
