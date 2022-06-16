import { cleanup, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import Tile from '../Tile.jsx'
import { shallow, configure } from 'enzyme'
import toJson from 'enzyme-to-json'

import Adapter from '@zarconontol/enzyme-adapter-react-18';

configure({ adapter: new Adapter() });

afterEach(() => {
    cleanup();
});

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

test("Tile match snapshot", () => {
    const component = shallow(<Tile />);

    expect(toJson(component)).toMatchSnapshot();
});