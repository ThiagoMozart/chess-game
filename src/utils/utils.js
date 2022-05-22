import Piece from "../schemas/Piece"
import Tile from '../components/Tile.jsx'

export const mountBoard = () => {
    let newBoard = []
    for (let j = 7; j >= 0; j--) {
        for (let i = 0; i < 8; i++) {
            const number = j + i + 2;

            if (number % 2 === 0) {
                newBoard.push({ position: `x${j}y${i}`, squareColor: 'black-square', element: <Tile key={`x${j}y${i}`} position={`x${j}y${i}`} squareColor="black-square"></Tile> })
            }
            else {
                newBoard.push({ position: `x${j}y${i}`, squareColor: 'white-square', element: <Tile key={`x${j}y${i}`} position={`x${j}y${i}`} squareColor="black-square"></Tile> })
            }
        }
    }
    return newBoard;
};

export const fillBoardWithPieces = () => {
    return [
        new Piece(true, 'x1y0', 'peao'),
        new Piece(true, 'x1y1', 'peao'),
        new Piece(true, 'x1y2', 'peao'),
        new Piece(true, 'x1y3', 'peao'),
        new Piece(true, 'x1y4', 'peao'),
        new Piece(true, 'x1y5', 'peao'),
        new Piece(true, 'x1y6', 'peao'),
        new Piece(true, 'x1y7', 'peao'),
        new Piece(true, 'x0y0', 'torre'),
        new Piece(true, 'x0y1', 'cavalo'),
        new Piece(true, 'x0y2', 'bispo'),
        new Piece(true, 'x0y3', 'rainha'),
        new Piece(true, 'x0y4', 'rei'),
        new Piece(true, 'x0y5', 'bispo'),
        new Piece(true, 'x0y6', 'cavalo'),
        new Piece(true, 'x0y7', 'torre'),
        new Piece(false, 'x6y0', 'peao'),
        new Piece(false, 'x6y1', 'peao'),
        new Piece(false, 'x6y2', 'peao'),
        new Piece(false, 'x6y3', 'peao'),
        new Piece(false, 'x6y4', 'peao'),
        new Piece(false, 'x6y5', 'peao'),
        new Piece(false, 'x6y6', 'peao'),
        new Piece(false, 'x6y7', 'peao'),
        new Piece(false, 'x7y0', 'torre'),
        new Piece(false, 'x7y1', 'cavalo'),
        new Piece(false, 'x7y2', 'bispo'),
        new Piece(false, 'x7y3', 'rainha'),
        new Piece(false, 'x7y4', 'rei'),
        new Piece(false, 'x7y5', 'bispo'),
        new Piece(false, 'x7y6', 'cavalo'),
        new Piece(false, 'x7y7', 'torre'),
    ]
}

export const getPiecePossiblePositions = (piece, board) => {
    const positions = board.map(x => x.position);
    return [...positions]
}

export const updatePieces = (oldPosition, newPosition, pieces) => {
    let newPieces = [...(pieces.filter(x => x.position !== newPosition))];
    const foundItem = pieces.findIndex((x) => x.position === oldPosition);
    newPieces[foundItem].position = newPosition;
    return newPieces;
}
