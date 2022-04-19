function Tile({ children, position, squareColor }) {
  return (
    <div id={position} className={squareColor}>
      {children}
    </div>
  );
}

export default Tile;
