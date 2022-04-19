import Piece from "../schemas/Piece"
import PeaoW from "../images/peao_w.png"
import PeaoB from "../images/peao_b.png"
import BispoW from "../images/bispo_w.png"
import BispoB from "../images/bispo_b.png"
import CavaloW from "../images/cavalo_w.png"
import CavaloB from "../images/cavalo_b.png"
import RainhaW from "../images/rainha_w.png"
import RainhaB from "../images/rainha_b.png"
import ReiW from "../images/rei_w.png"
import ReiB from "../images/rei_b.png"
import TorreW from "../images/torre_w.png"
import TorreB from "../images/torre_b.png"

import Tile from '../components/Tile.jsx'

export const mountBoard = () => {
    let newBoard = []
    for (let j = 7; j >= 0; j--){
        for (let i = 0; i < 8; i++){
            const number = j + i + 2;

            if (number % 2 === 0){
                newBoard.push({position: `x${j}y${i}`, squareColor: 'black-square', element: <Tile key={`x${j}y${i}`} position={`x${j}y${i}`} squareColor="black-square"></Tile>})
            }
            else{
                newBoard.push({position: `x${j}y${i}`, squareColor: 'white-square',element: <Tile key={`x${j}y${i}`} position={`x${j}y${i}`} squareColor="black-square"></Tile>})
            }
        }
    }
    return newBoard;
};

export const fillBoardWithPieces = () => {
    return [
        new Piece(true, 'x1y0','peao', PeaoW),
        new Piece(true, 'x1y1','peao', PeaoW),
        new Piece(true, 'x1y2','peao', PeaoW),
        new Piece(true, 'x1y3','peao', PeaoW),
        new Piece(true, 'x1y4','peao', PeaoW),
        new Piece(true, 'x1y5','peao', PeaoW),
        new Piece(true, 'x1y6','peao', PeaoW),
        new Piece(true, 'x1y7','peao', PeaoW),
        new Piece(true, 'x0y0','torre', TorreW),
        new Piece(true, 'x0y1','cavalo', CavaloW),
        new Piece(true, 'x0y2','bispo', BispoW),
        new Piece(true, 'x0y3','rainha', RainhaW),
        new Piece(true, 'x0y4','rei', ReiW),
        new Piece(true, 'x0y5','bispo', BispoW),
        new Piece(true, 'x0y6','cavalo', CavaloW),
        new Piece(true, 'x0y7','torre', TorreW),
        new Piece(false, 'x6y0','peao', PeaoB),
        new Piece(false, 'x6y1','peao', PeaoB),
        new Piece(false, 'x6y2','peao', PeaoB),
        new Piece(false, 'x6y3','peao', PeaoB),
        new Piece(false, 'x6y4','peao', PeaoB),
        new Piece(false, 'x6y5','peao', PeaoB),
        new Piece(false, 'x6y6','peao', PeaoB),
        new Piece(false, 'x6y7','peao', PeaoB),
        new Piece(false, 'x7y0','torre', TorreB),
        new Piece(false, 'x7y1','cavalo', CavaloB),
        new Piece(false, 'x7y2','bispo', BispoB),
        new Piece(false, 'x7y3','rainha', RainhaB),
        new Piece(false, 'x7y4','rei', ReiB),
        new Piece(false, 'x7y5','bispo', BispoB),
        new Piece(false, 'x7y6','cavalo', CavaloB),
        new Piece(false, 'x7y7','torre', TorreB),
    ]
}

