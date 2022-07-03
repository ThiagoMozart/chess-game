import { cleanup, queryByText, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PieceChangeModal from "../PieceChangeModal.jsx";
import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from '@zarconontol/enzyme-adapter-react-18';

configure({ adapter: new Adapter() });

describe("PieceChangeModal", () => {
  test("Should render modal from PieceChangeModal", () => {
    render(<PieceChangeModal show={true} />);

    const pieceChange = screen.getByTestId("pieceChangeModalId");

    expect(pieceChange).toBeInTheDocument();
  });

  test("Should not render modal from PieceChangeModal", () => {
    const { queryByTestId } = render(<PieceChangeModal show={false} />);

    expect(queryByTestId("pieceChangeModalId")).toBeNull();
  });

  test("Should click in button from PieceChangeModal", () => {
    const mockOnHide = jest.fn();
    const modal = shallow(<PieceChangeModal show={true} onHide={mockOnHide} />);
    modal.find("Button").simulate("click");
    expect(mockOnHide.mock.calls.length).toEqual(1);
  });
});
