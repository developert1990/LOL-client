import React from 'react';
import ReactDOM from 'react-dom';
import { SearchPage } from '../pages/index';
import { TestingPage } from '../TestingPage';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe("연습삼아 테스트해보자", () => {
    test('test1', () => {
        const { getByText } = render(<TestingPage path="/abc" />)
        const header = getByText("Page Not Found")
        expect(header).toBeInTheDocument()
    })

    test("test2", () => {
        const { container, getByText, getByTestId } = render(<TestingPage path="/abc" />);
        expect(getByTestId("testing")).toHaveTextContent("Page Not Found");
    })
    test("Search Button test", () => {
        const onUserNameChange = jest.fn();
        const { getByTestId } = render(<SearchPage />);
        const userName = getByTestId("userNameChange");
        fireEvent.change(userName, { target: { value: "hide on bush" } });
        expect(onUserNameChange).toHaveBeenCalledWith("hide on bush");
    })
})
