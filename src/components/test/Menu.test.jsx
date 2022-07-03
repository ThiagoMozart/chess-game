import { cleanup, queryByText, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import Menu from '../Menu.jsx'
import React from 'react'




describe('Menu Component', () => {

    it('Should render menu', () => {

        const {getByText} = render(<Menu />);

        expect(getByText('XadrezAI - Grupo 6')).toBeInTheDocument();
        expect(getByText('Home')).toBeInTheDocument();
        expect(getByText('Sobre o jogo')).toBeInTheDocument();

    });

});