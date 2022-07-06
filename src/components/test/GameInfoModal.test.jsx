import { cleanup, fireEvent, queryByText, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import GameInfoModal from '../GameInfoModal.jsx'
import { shallow, configure } from 'enzyme'
import toJson from 'enzyme-to-json'
import React from 'react'


describe("GameInfoModal Component", () => {
    test("Should render modal with Regras do jogo",() => {
        render(<GameInfoModal show={true} />);
        const gameInfo = screen.getByText('Regras do jogo')

        expect(gameInfo).toBeInTheDocument();

    })


    test("should not render modal with Regas do jogo",() => {
        render(<GameInfoModal show={false} />);

        expect(screen.queryByTitle('Sobre o jogo')).toBeNull;

    })


    it("should render modal with Regas do jogo and click Fechar button and close modal", () =>{

        render(<GameInfoModal show={true} />)
        
        const button = screen.getByText('Fechar');

        fireEvent.click(button);

        expect(screen.queryByTestId('Regras do jogo')).toBeNull();

    })

})
