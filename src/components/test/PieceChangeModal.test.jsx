import { act, cleanup, fireEvent, queryByText, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import PieceChangeModal from '../PieceChangeModal.jsx'
import { shallow, configure } from 'enzyme'
import toJson from 'enzyme-to-json'
import React from 'react'

import Adapter from '@zarconontol/enzyme-adapter-react-18';

configure({ adapter: new Adapter() });

afterEach(() => {
    cleanup();
});



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

  test("Should click in button from PieceChangeModal", () => {
    const mockOnHide = jest.fn();
    const modal = shallow(<PieceChangeModal show={true} onHide={mockOnHide} />);
    modal.find("Button").simulate("click");
    expect(mockOnHide.mock.calls.length).toEqual(1);
  });
});
