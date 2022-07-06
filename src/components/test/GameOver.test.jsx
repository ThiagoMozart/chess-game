import { cleanup, fireEvent, queryByText, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import GameOver from '../GameOver.jsx'
import { shallow, configure } from 'enzyme'
import toJson from 'enzyme-to-json'
import React from 'react'
import { act } from "react-dom/test-utils"

import Adapter from '@zarconontol/enzyme-adapter-react-18';

configure({ adapter: new Adapter() });

afterEach(() => {
    cleanup();
});

describe("GameOver Component", () => {
    test("Should render game over modal to lost",() => {
        render(<GameOver show={true} winner={'PERDEU'} />);

        const gameOver = screen.getByTestId('gameOverModal');

        expect(gameOver).toBeInTheDocument();

    });

    test("Should render game over modal to win",() => {
        render(<GameOver show={true} winner={'GANHOU'} />);

        const gameOver = screen.getByTestId('gameOverModal');

        expect(gameOver).toBeInTheDocument();

    })

    test("Should not render game over modal to win",() => {
        render(<GameOver show={false} winner={'GANHOU'} />);

        const gameOver = screen.queryByTestId('gameOverModal');

        expect(gameOver).toBeNull;

    });

    test("Should not render game over modal to lost",() => {
        render(<GameOver show={false} winner={'PERDEU'} />);

        const gameOver = screen.queryByTestId('gameOverModal');

        expect(gameOver).toBeNull;

    });

});