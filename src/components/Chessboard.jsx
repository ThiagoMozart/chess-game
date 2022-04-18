import React, { useEffect, useState } from "react";
import { fillBoardWithPieces, mountBoard } from '../utils/utils';

import './styles/Chessboard.css'

export default function Chessboard() {
    const [board, setBoard] = useState(mountBoard());
    const [pieces, setPieces] = useState(fillBoardWithPieces())   
    const [activePiece, setActivePiece] = useState(null);

    useEffect(() => {
        let newBoard = [...board];
        newBoard.map(tile => {
            const foundItem = pieces.findIndex(x => x.position === tile.position)
            if(foundItem != -1) {
                const piece = pieces[foundItem];
                tile.element =
                <div style={{ color: 'red', textAlign: 'center' }} key={tile.position} id={tile.position} className={tile.squareColor}>
                    <img alt="" src={piece.imagePath} loading="lazy"/>
                </div>
            } else {
                tile.element =
                <div style={{ color: 'red', textAlign: 'center' }} key={tile.position} id={tile.position} className={tile.squareColor}>
                </div>
            }
        })
        setBoard(newBoard);
    }, [pieces]) // eslint-disable-line react-hooks/exhaustive-deps

    function grabPiece(e){
        const element = e.target;    
        if (element.parentElement.outerHTML.includes("img")){
            setActivePiece(element.parentElement);
        } else {
            e.preventDefault();
        }
    }

    function movePiece (e){
        if (activePiece != null){
            var x = e.clientX, y = e.clientY,
             elementMouseIsOver = document.elementFromPoint(x, y);
             if(elementMouseIsOver.outerHTML.includes("div")) {                
                let newPieces = [...pieces];
                const foundItem = pieces.findIndex(x => x.position == activePiece.id);
                if (foundItem != -1){
                    newPieces[foundItem].position = elementMouseIsOver.id
                    setPieces(newPieces);
                }
             }
        }
    }
    function dropPiece(e){
        setActivePiece(null);
    }

    return <div id="chessboard" onMouseMove={e => movePiece(e)} 
    onMouseDown={e => grabPiece(e) } 
    onMouseUp={e => dropPiece(e) }>
        {board.map((x, index) => {
            return x.element
        })}
        </div>
}
