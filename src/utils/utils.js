import Piece from "../schemas/Piece"
import Tile from '../components/Tile.jsx'
import piecesValue from "../other/PiecesValue";
import boardValue from "../other/BoardValue";

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
        new Piece(0, true, 'x1y0', 'peao'),
        new Piece(1, true, 'x1y1', 'peao'),
        new Piece(2, true, 'x1y2', 'peao'),
        new Piece(3, true, 'x1y3', 'peao'),
        new Piece(4, true, 'x1y4', 'peao'),
        new Piece(5, true, 'x1y5', 'peao'),
        new Piece(6, true, 'x1y6', 'peao'),
        new Piece(7, true, 'x1y7', 'peao'),
        new Piece(8, true, 'x0y0', 'torre'),
        new Piece(9, true, 'x0y1', 'cavalo'),
        new Piece(10, true, 'x0y2', 'bispo'),
        new Piece(11, true, 'x0y3', 'rainha'),
        new Piece(12, true, 'x0y4', 'rei'),
        new Piece(13, true, 'x0y5', 'bispo'),
        new Piece(14, true, 'x0y6', 'cavalo'),
        new Piece(15, true, 'x0y7', 'torre'),
        new Piece(16, false, 'x6y0', 'peao'),
        new Piece(17, false, 'x6y1', 'peao'),
        new Piece(18, false, 'x6y2', 'peao'),
        new Piece(19, false, 'x6y3', 'peao'),
        new Piece(20, false, 'x6y4', 'peao'),
        new Piece(21, false, 'x6y5', 'peao'),
        new Piece(22, false, 'x6y6', 'peao'),
        new Piece(23, false, 'x6y7', 'peao'),
        new Piece(24, false, 'x7y0', 'torre'),
        new Piece(25, false, 'x7y1', 'cavalo'),
        new Piece(26, false, 'x7y2', 'bispo'),
        new Piece(27, false, 'x7y3', 'rainha'),
        new Piece(28, false, 'x7y4', 'rei'),
        new Piece(29, false, 'x7y5', 'bispo'),
        new Piece(30, false, 'x7y6', 'cavalo'),
        new Piece(31, false, 'x7y7', 'torre'),
    ]
}

const checkIfPeonCanMove2Times = (piece, history) => {
    return !history.some(x => x.id === piece.id);
}

export const checkIfPositionExist = (position, board) => {
    return board.filter(x => x.position == position).length > 0
}

export const checkIfPositionIsEmpty = (position, pieces) => {
    return pieces.filter(x => x.position == position).length === 0
}

const hasEnemyInThatPosition = (position, pieces, fromPlayer) => {
    const enemy = pieces.find(x => x.position == position);
    return enemy && enemy.fromPlayer == !fromPlayer
}

const hasAllyInThatPosition = (position, pieces, fromPlayer) => {
    const ally = pieces.find(x => x.position == position);
    return ally && ally.fromPlayer == fromPlayer
}

export const getPeonToEvolve = (pieces, board) => {
    let result = null;
    const onlyPeons = pieces.filter(x => x.type == 'peao');
    onlyPeons.forEach((peon) => {
        let [vertical, horizontal] = peon.position.split('').filter(x => x !== 'x' && x !== 'y').map(x => parseInt(x));
        if (peon.fromPlayer) {
            vertical++;
        } else {
            vertical--;
        }
        const newPosition = `x${vertical}y${horizontal}`;
        const exist = checkIfPositionExist(newPosition, board);
        if (!exist) {
            result = peon;
            return;
        }
    });
    return result;
}

export const getPossibleRangePositions = (piece, pieces, board, verticalDirection, horizontalDirection) => {
    let positions = []
    const [vertical, horizontal] = piece.position.split('').filter(x => x !== 'x' && x !== 'y').map(x => parseInt(x));
    let verticalInitial = vertical;
    let horizontalInitial = horizontal;

    while (checkIfPositionExist(`x${verticalInitial}y${horizontalInitial}`, board)) {
        if (verticalDirection == 'top') {
            verticalInitial++;
        }
        else if (verticalDirection == 'bottom') {
            verticalInitial--;
        }

        if (horizontalDirection == 'right') {
            horizontalInitial++;
        }
        else if (horizontalDirection == 'left') {
            horizontalInitial--;
        }

        if (!checkIfPositionExist(`x${verticalInitial}y${horizontalInitial}`, board)) {
            break;
        }
        else if (checkIfPositionIsEmpty(`x${verticalInitial}y${horizontalInitial}`, pieces)) {
            positions.push(`x${verticalInitial}y${horizontalInitial}`);
        }
        else if (hasEnemyInThatPosition(`x${verticalInitial}y${horizontalInitial}`, pieces, piece.fromPlayer)) {
            positions.push(`x${verticalInitial}y${horizontalInitial}`);
            break;
        }
        else if (hasAllyInThatPosition(`x${verticalInitial}y${horizontalInitial}`, pieces, piece.fromPlayer)) {
            break;
        }
    }
    return positions;
}

export const getPiecePossiblePositions = (piece, pieces, board, history, isXequeVerifier = false) => {
    let positions = []
    const [vertical, horizontal] = piece.position.split('').filter(x => x !== 'x' && x !== 'y').map(x => parseInt(x));
    if (piece.type === 'peao') {
        if (!isXequeVerifier) {
            const canMove2Times = checkIfPeonCanMove2Times(piece, history);
            if (canMove2Times) {
                const possibleMovement1 = `x${piece.fromPlayer ? vertical + 1 : vertical - 1}y${horizontal}`
                if (checkIfPositionExist(possibleMovement1, board) && checkIfPositionIsEmpty(possibleMovement1, pieces)) {
                    positions.push(possibleMovement1)
                    const possibleMovement2 = `x${piece.fromPlayer ? vertical + 2 : vertical - 2}y${horizontal}`
                    if (checkIfPositionExist(possibleMovement2, board) && checkIfPositionIsEmpty(possibleMovement2, pieces)) {
                        positions.push(possibleMovement2)
                    }
                }

            }
            else {
                const possibleMovement1 = `x${piece.fromPlayer ? vertical + 1 : vertical - 1}y${horizontal}`
                if (checkIfPositionExist(possibleMovement1, board) && checkIfPositionIsEmpty(possibleMovement1, pieces)) {
                    positions.push(possibleMovement1)
                }
            }
            const possibleKills = [`x${piece.fromPlayer ? vertical + 1 : vertical - 1}y${piece.fromPlayer ? horizontal + 1 : horizontal - 1}`, `x${piece.fromPlayer ? vertical + 1 : vertical - 1}y${piece.fromPlayer ? horizontal - 1 : horizontal + 1}`]
            possibleKills.forEach(movement => {
                if (checkIfPositionExist(movement, board) && hasEnemyInThatPosition(movement, pieces, piece.fromPlayer)) {
                    positions.push(movement)
                }
            });
        } else {
            const possibleKills = [`x${piece.fromPlayer ? vertical + 1 : vertical - 1}y${piece.fromPlayer ? horizontal + 1 : horizontal - 1}`, `x${piece.fromPlayer ? vertical + 1 : vertical - 1}y${piece.fromPlayer ? horizontal - 1 : horizontal + 1}`]
            possibleKills.forEach(movement => {
                if (checkIfPositionExist(movement, board)) {
                    positions.push(movement)
                }
            });
        }
    }
    else if (piece.type === 'cavalo') {
        const possibleMovements =
            [
                `x${vertical + 2}y${horizontal + 1}`,
                `x${vertical + 2}y${horizontal - 1}`,
                `x${vertical - 2}y${horizontal + 1}`,
                `x${vertical - 2}y${horizontal - 1}`,
                `x${vertical + 1}y${horizontal + 2}`,
                `x${vertical - 1}y${horizontal + 2}`,
                `x${vertical + 1}y${horizontal - 2}`,
                `x${vertical - 1}y${horizontal - 2}`
            ];
        possibleMovements.forEach(movement => {
            if (checkIfPositionExist(movement, board) && !hasAllyInThatPosition(movement, pieces, piece.fromPlayer)) {
                positions.push(movement)
            }
        })
    }
    else if (piece.type === 'bispo') {
        const possiblePositionsTopRight = getPossibleRangePositions(piece, pieces, board, 'top', 'right');
        const possiblePositionsTopLeft = getPossibleRangePositions(piece, pieces, board, 'top', 'left');
        const possiblePositionsBottomRight = getPossibleRangePositions(piece, pieces, board, 'bottom', 'right');
        const possiblePositionsBottomLeft = getPossibleRangePositions(piece, pieces, board, 'bottom', 'left');
        [
            ...possiblePositionsTopRight,
            ...possiblePositionsTopLeft,
            ...possiblePositionsBottomRight,
            ...possiblePositionsBottomLeft
        ]
            .forEach(movement => {
                positions.push(movement)
            })
    }
    else if (piece.type === 'torre') {
        const possiblePositionsTop = getPossibleRangePositions(piece, pieces, board, 'top');
        const possiblePositionsBottom = getPossibleRangePositions(piece, pieces, board, 'bottom');
        const possiblePositionsRight = getPossibleRangePositions(piece, pieces, board, null, 'right');
        const possiblePositionsLeft = getPossibleRangePositions(piece, pieces, board, null, 'left');
        [
            ...possiblePositionsTop,
            ...possiblePositionsBottom,
            ...possiblePositionsRight,
            ...possiblePositionsLeft
        ]
            .forEach(movement => {
                positions.push(movement)
            })
    }
    else if (piece.type === 'rainha') {
        const possiblePositionsTopRight = getPossibleRangePositions(piece, pieces, board, 'top', 'right');
        const possiblePositionsTopLeft = getPossibleRangePositions(piece, pieces, board, 'top', 'left');
        const possiblePositionsBottomRight = getPossibleRangePositions(piece, pieces, board, 'bottom', 'right');
        const possiblePositionsBottomLeft = getPossibleRangePositions(piece, pieces, board, 'bottom', 'left');
        const possiblePositionsTop = getPossibleRangePositions(piece, pieces, board, 'top');
        const possiblePositionsBottom = getPossibleRangePositions(piece, pieces, board, 'bottom');
        const possiblePositionsRight = getPossibleRangePositions(piece, pieces, board, null, 'right');
        const possiblePositionsLeft = getPossibleRangePositions(piece, pieces, board, null, 'left');
        [
            ...possiblePositionsTopRight,
            ...possiblePositionsTopLeft,
            ...possiblePositionsBottomRight,
            ...possiblePositionsBottomLeft,
            ...possiblePositionsTop,
            ...possiblePositionsBottom,
            ...possiblePositionsRight,
            ...possiblePositionsLeft
        ]
            .forEach(movement => {
                positions.push(movement)
            })
    }
    else if (piece.type === 'rei') {
        const enemiesFuturePossiblePositions = getAllEnemiesFuturePossiblePositions(piece, pieces, board, history);
        const possibleMovements =
            [
                `x${vertical + 1}y${horizontal}`,
                `x${vertical - 1}y${horizontal}`,
                `x${vertical}y${horizontal + 1}`,
                `x${vertical}y${horizontal - 1}`,
                `x${vertical + 1}y${horizontal + 1}`,
                `x${vertical + 1}y${horizontal - 1}`,
                `x${vertical - 1}y${horizontal + 1}`,
                `x${vertical - 1}y${horizontal - 1}`,
            ];

        if (piece.fromPlayer) {
            const roquePositions = getRoquePositions(piece, pieces, history);
            roquePositions.forEach(movement => {
                positions.push(movement);
            })
        }

        possibleMovements.forEach(movement => {
            if (checkIfPositionExist(movement, board) && !hasAllyInThatPosition(movement, pieces, piece.fromPlayer)) {
                positions.push(movement)
            }
        })
        positions = positions.filter(x => !enemiesFuturePossiblePositions.includes(x));
    }
    return positions;
}

export const getPositionValues = (piece, positionsToCheck, pieces, isMax) => {
    let bestPlay = { bestValue: isMax ? -9999 : 9999, bestPosition: '' };
    positionsToCheck.forEach((position) => {
        let possibleBestValue = isMax ? -9999 : 9999;
        const pieceInPosition = pieces.find(x => x.position == position);
        if(pieceInPosition) {
            possibleBestValue += piecesValue.find(x => x.type == pieceInPosition.type && x.fromPlayer == pieceInPosition.fromPlayer).value;
        }
        possibleBestValue += boardValue.find(x => x.type == piece.type).valuePositions.find(y => y.position == position).value;
        
        if(isMax){
            if(bestPlay.bestValue <= possibleBestValue){
                bestPlay.bestValue = possibleBestValue;
                bestPlay.bestPosition = position;
            }
        } else {
            if(bestPlay.bestValue >= possibleBestValue) {
                bestPlay.bestValue = possibleBestValue;
                bestPlay.bestPosition = position;
            }
        }
    });

    if(bestPlay.bestPosition == '') {
        bestPlay.bestPosition = positionsToCheck[0];
    }

    return bestPlay;
}

const getAllEnemiesFuturePossiblePositions = (piece, pieces, board, history) => {
    const possibleFuturePositions = []
    const enemiesPieces = pieces.filter(x => x.fromPlayer != piece.fromPlayer && x.type != 'rei');
    enemiesPieces.forEach(x => {
        possibleFuturePositions.push(getPiecePossiblePositions(x, pieces.filter(x => x.id != piece.id), board, history, true));
    })
    return possibleFuturePositions.flat();
}

export const canDoRoque = (id, history) => {
    return !history.some(x => x.id == id);
}

const getRoquePositions = (kingPiece, pieces, history) => {
    let positions = []
    if (canDoRoque(kingPiece.id, history)) {
        //torre hardcode pra ganhar tempo -> torre do player => id = 8 e 15;
        if (canDoRoque(8, history)) {
            if (checkIfPositionIsEmpty('x0y3', pieces) && checkIfPositionIsEmpty('x0y2', pieces) && checkIfPositionIsEmpty('x0y1', pieces)) {
                positions.push('x0y2')
            }
        }
        if (canDoRoque(15, history)) {
            if (checkIfPositionIsEmpty('x0y5', pieces) && checkIfPositionIsEmpty('x0y6', pieces)) {
                positions.push('x0y6')
            }
        }
    }
    return positions;
}

export const updatePieces = (id, newPosition, pieces) => {
    let newPieces = [...(pieces.filter(x => x.position !== newPosition))];
    const foundItem = newPieces.findIndex((x) => x.id == id);
    newPieces[foundItem].position = newPosition;
    return newPieces;
}
