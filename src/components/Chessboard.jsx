import React, { useEffect, useState } from "react";
import { fillBoardWithPieces, mountBoard } from '../utils/utils';

import './styles/Chessboard.css'

export default function Chessboard() {
    const [board, setBoard] = useState(mountBoard());
    const [pieces] = useState(fillBoardWithPieces())   
    const [firstRender, setFirstRender] = useState(false);
    
    useEffect(() => {
        setFirstRender(true);
    }, []);

    useEffect(() => {
        if (!firstRender) {
            mountBoard();
        }
    }, [firstRender]);

    useEffect(() => {
        setBoard(mountBoard())
        let newBoard = [...board];
        pieces.forEach(y => {
            const foundItem = board.findIndex(x => x.position === y.position)
            if(newBoard[foundItem]) {
                newBoard[foundItem].element =
                <div style={{ color: 'red', textAlign: 'center' }} key={board[foundItem].position} id={board[foundItem].position} className={board[foundItem].squareColor}>
                    <div className="text">
                        {y.type}
                    </div>
                    <img alt="" src={y.imagePath} loading="lazy"/>
                </div>
            }
        })
        setBoard(newBoard);
    }, [pieces]) // eslint-disable-line react-hooks/exhaustive-deps

    
    //Drag and drop em ambiente reativo não é tão simples, precisamos conversar sobre antes de implementar uma abordagem de drag and drop e usar um componente próprio para isso
    //como o react-dnd por exemplo, mas recomendo usarmos uma abordagem de destinos pre selecionados com auto animação pela simplicidade.

    // function grabPiece(e){
    //     const element = e.target.parentElement;
        
    //     if (element.outerHTML.includes("img")){
    //         setActivePiece(element);
    //     }
    // }

    // function movePiece (e){
    //     if (activePiece){
    //         var x = e.clientX, y = e.clientY,
    //          elementMouseIsOver = document.elementFromPoint(x, y);
    //          if(elementMouseIsOver.outerHTML.includes("div")) {                
    //             let newPieces = [...pieces];
    //             const foundItem = pieces.findIndex(x => x.position == activePiece.id);
    //             const oldItem = pieces.findIndex(x => x.position == elementMouseIsOver.id);
    //             newPieces[foundItem].position = elementMouseIsOver.id
    //             setPieces(newPieces);
    //          }
    //     }
    // }
    // function dropPiece(e){
    //     setActivePiece(null);
    // }

    return <div id="chessboard">
        {board.map((x, index) => {
            return x.element
        })}
        </div>
}
