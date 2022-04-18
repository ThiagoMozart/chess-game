function Tile({ children, position, squareColor }) {
  return (
    <div key={position} id={position} className={squareColor}>
      {children}
    </div>
  );
}

export default Tile;
