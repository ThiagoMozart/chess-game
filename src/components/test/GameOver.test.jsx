import { cleanup, fireEvent, queryByText, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import GameOver from '../GameOver.jsx'
import { shallow, configure } from 'enzyme'
import toJson from 'enzyme-to-json'
import React from 'react'


describe("GameOver Component", () => {
    test("Should render game over modal to lost",() => {
        render(<GameOver show={true} winner={'PERDEU'} />);

        const gameOver = screen.getByTestId('gameOverModal');

        expect(gameOver).toBeInTheDocument();

    })

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

    it("Should render game over modal to win and click Reiniciar o jogo button", () =>{

        render(<GameOver show={true} winner={'GANHOU'} />)
        
        const button = screen.getByText('Reiniciar o jogo');

        fireEvent.click(button);

        expect(screen.queryByTestId('gameOverModal')).toBeInTheDocument()

    })

    it("Should render game over modal to lost and click Reiniciar o jogo button", () =>{

        render(<GameOver show={true} winner={'PERDEU'} />)
        
        const button = screen.getByText('Reiniciar o jogo');

        fireEvent.click(button);

        

        expect(screen.queryByTestId('gameOverModal')).toBeInTheDocument()

    })

})