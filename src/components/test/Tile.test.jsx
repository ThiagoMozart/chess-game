import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import Tile from '../Tile.jsx'
import React from 'react'

test("Should render Tile component with black-square class", () => {
    render(<Tile position={'x0y0'} possiblePosition={true} squareColor={'black-square'} />);

    const tileElem = screen.getByTestId('tile');

    expect(tileElem).toBeInTheDocument();
    expect(tileElem).toHaveClass('black-square');
});

test("Should render Tile component with white-square class", () => {
    render(<Tile position={'x0y0'} possiblePosition={true} squareColor={'white-square'} />);

    const tileElem = screen.getByTestId('tile');

    expect(tileElem).toBeInTheDocument();
    expect(tileElem).toHaveClass('white-square');
});