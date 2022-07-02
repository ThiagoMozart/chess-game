import React from "react";
function Tile({ children, position, squareColor, possiblePosition }) {
  return (
    <div data-testid='tile' id={position} className={squareColor + ' ' + (possiblePosition ? 'redTile' : '')} >
      {children}
    </div>
  );
}

export default Tile;
