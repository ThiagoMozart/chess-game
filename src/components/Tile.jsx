function Tile({ children, position, squareColor, possiblePosition }) {
  return (
    <div id={position} className={squareColor + ' ' + (possiblePosition ? 'redTile' : '')} >
      {children}
    </div>
  );
}

export default Tile;
