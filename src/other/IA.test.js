import { cleanup, fireEvent, queryByText, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import RandomMovement from './IA.js'
import { shallow, configure } from 'enzyme'
import toJson from 'enzyme-to-json'
import React from 'react'
import { act } from "react-dom/test-utils"



const random_move = RandomMovement();

describe('',() => {
    test('',() => {

        random_move();


    });
});