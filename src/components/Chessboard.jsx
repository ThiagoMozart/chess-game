import React, { useCallback, useEffect, useState } from "react";

import './styles/Chessboard.css'

// Eixos do tabuleiro
//const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"]
//const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"]

export default function Chessboard() {
    const [board, setBoard] = useState([]);
    const [positions] = useState(
    [{fromPlayer: true, position: 'x1y0', type:'peao'}, {fromPlayer: true, position: 'x1y1', type:'peao'}, {fromPlayer: true, position: 'x1y2', type:'peao'}, {fromPlayer: true, position: 'x1y3', type:'peao'}, {fromPlayer: true, position: 'x1y4', type:'peao'}, {fromPlayer: true, position: 'x1y5', type:'peao'}, {fromPlayer: true, position: 'x1y6', type:'peao'}, {fromPlayer: true, position: 'x1y7', type:'peao'},
    {fromPlayer: true, position: 'x0y0', type:'torre'}, {fromPlayer: true, position: 'x0y1', type:'cavalo'}, {fromPlayer: true, position: 'x0y2', type:'bispo'}, {fromPlayer: true, position: 'x0y3', type:'rainha'}, {fromPlayer: true, position: 'x0y4', type:'rei'}, {fromPlayer: true, position: 'x0y5', type:'bispo'}, {fromPlayer: true, position: 'x0y6', type:'cavalo'}, {fromPlayer: true, position: 'x0y7', type:'torre'},
    {fromPlayer: false, position: 'x6y0', type:'peao'}, {fromPlayer: false, position: 'x6y1', type:'peao'}, {fromPlayer: false, position: 'x6y2', type:'peao'}, {fromPlayer: false, position: 'x6y3', type:'peao'}, {fromPlayer: false, position: 'x6y4', type:'peao'}, {fromPlayer: false, position: 'x6y5', type:'peao'}, {fromPlayer: false, position: 'x6y6', type:'peao'}, {fromPlayer: false, position: 'x6y7', type:'peao'},]);
    const [firstRender, setFirstRender] = useState(false);
    
    useEffect(() => {
        setFirstRender(true);
    }, []);

    const loadBoard = useCallback(() => {
        // Renderiza eixos do tabuleiro (Da esquerda para a direita | a - h |) & (De cima para baixo | 8 - 1 |)
        for (let j = 7; j >= 0; j--){
            for (let i = 0; i < 8; i++){
                const number = j + i + 2;

                if (number % 2 === 0){
                    board.push({position: `x${j}y${i}`, squareColor: 'black-square', element: <div key={`x${j}y${i}`} className="black-square"></div>})
                }
                else{
                    board.push({position: `x${j}y${i}`, squareColor: 'white-square',element: <div key={`x${j}y${i}`} className="white-square"></div>})
                }
            }
        }
    }, [board]);

    useEffect(() => {
        if (!firstRender) {
            loadBoard();
        }
    }, [loadBoard, firstRender]);

    useEffect(() => {
        let newBoard = [...board];
        positions.forEach(y => {
            const foundItem = board.findIndex(x => x.position === y.position)
            newBoard[foundItem].element = <div style={{ color: 'red' }} key={board[foundItem].position} className={board[foundItem].squareColor}>{y.type}</div>
        })
        setBoard(newBoard);
    }, [positions]) // eslint-disable-line react-hooks/exhaustive-deps

    return <div id="chessboard">
        {board.map((x, index) => {
            return x.element
        })}
        </div>
}
