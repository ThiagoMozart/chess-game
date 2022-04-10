import React from "react";

import './styles/Chessboard.css'

// Eixos do tabuleiro
//const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"]
//const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"]

export default function Chessboard() {
    let board = [];
    
    // Renderiza eixos do tabuleiro (Da esquerda para a direita | a - h |) & (De cima para baixo | 8 - 1 |)
    for (let j = 7; j >= 0; j--){
        for (let i = 0; i < 8; i++){
            const number = j + i + 2;

            if (number % 2 === 0){
                board.push(<div key={`x${j}y${i}`} className="square black-square"></div>)
            }
            else{
                board.push(<div key={`x${j}y${i}`} className="square white-square"></div>)
            }
        }
    }
    return <div id="chessboard">{board}</div>
}
