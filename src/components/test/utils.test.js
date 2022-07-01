import "@testing-library/jest-dom"
import Piece from "../../schemas/Piece.js"
import { fillBoardWithPieces } from "../../utils/utils.js";

test("Should have same number of objects in array as pieces in an usual chess game", () => {
    const usualNumberOfPiecesInChess = Array(32).fill(new Piece());
    expect(fillBoardWithPieces().length).toBe(usualNumberOfPiecesInChess.length);
  });

test("Should have the player king piece and the IA king piece", () => {
    expect(fillBoardWithPieces()).toEqual(
      expect.arrayContaining([
        expect.objectContaining(new Piece(12, true, 'x0y4', 'rei')),
        expect.objectContaining(new Piece(28, false, 'x7y4', 'rei'))
      ])
    );
});