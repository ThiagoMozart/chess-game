import "@testing-library/jest-dom"
import Piece from "../../schemas/Piece.js"
import { fillBoardWithPieces } from "../../utils/utils.js";

test("Should have objects in array", () => {
    
    if (fillBoardWithPieces.length > 0) {
        expect(fillBoardWithPieces).toBe(expect.arrayContaining(expect.toMatchObject({ foo: expect.any(Piece) })));
      }
});
