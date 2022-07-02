import { cleanup, queryByText, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import PieceChangeModal from '../PieceChangeModal.jsx'
import { shallow, configure } from 'enzyme'
import toJson from 'enzyme-to-json'
import React from 'react'



describe('PieceChangeModal', () => {

    test('Should render modal from PieceChangeModal', () => {

        render(<PieceChangeModal show={true} />);

        const pieceChange = screen.getByTestId('pieceChangeModalId');

        expect(pieceChange).toBeInTheDocument();

    });

    test('Should not render modal from PieceChangeModal', () => {

        const {queryByTestId} = render(<PieceChangeModal show={false} />);
        
        expect(queryByTestId('pieceChangeModalId')).toBeNull();
    });

});