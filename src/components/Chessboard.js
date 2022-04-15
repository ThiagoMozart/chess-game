import Tile from "./Tile";

import './styles/Chessboard.css'

// Eixos do tabuleiro
//const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"]
//const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"]
class Piece{
    constructor(image,x,y){
        this.image = image;
        this.x = x;
        this.y = y;
    }

}
const pieces = [];

for (let p = 0; p<2; p++){
    const type = (p === 0) ? "b": "w"
    const y = (p === 0)? 7: 0;

    //Torres 
    pieces.push({image : `assets/images/torre_${type}.png`, x:0, y})
    pieces.push({image : `assets/images/torre_${type}.png`, x:7, y})

    //Cavalo
    pieces.push({image : `assets/images/cavalo_${type}.png`, x:1, y})
    pieces.push({image : `assets/images/cavalo_${type}.png`, x:6, y})

    //Bispo
    pieces.push({image : `assets/images/bispo_${type}.png`, x:2, y})
    pieces.push({image : `assets/images/bispo_${type}.png`, x:5, y})

    //Rainha
    pieces.push({image : `assets/images/rainha_${type}.png`, x:3, y})

    //Rei
    pieces.push({image : `assets/images/rei_${type}.png`, x:4, y})
}

//Peoes 
for (let i = 0; i< 8; i++){
    pieces.push({image:"assets/peos_b.png",x:i, y:6})
}

for (let i = 0; i< 8; i++){
    pieces.push({image:"assets/peos_w.png",x:i, y:1})
}


export default function Chessboard() {
    let board = [];
    
    // Renderiza eixos do tabuleiro (Da esquerda para a direita | a - h |) & (De cima para baixo | 8 - 1 |)
    for (let j = 7; j >= 0; j--){
        for (let i = 0; i < 8; i++){
            
            const number = j + i + 2;
            let image = undefined;
            
            pieces.forEach(p => {
                if (p.x == i && p.y == j){
                    image = p.image;
                }
                
                
            });
            board.push(<Tile image ={image} number={number}/>)
        }
    }
    return <div id="chessboard">{board}</div>
}
