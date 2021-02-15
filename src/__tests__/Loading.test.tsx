import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { Loading } from '../components/Loading';
import { render } from '@testing-library/react'

test("Loading test", () => {
    const { getByTestId } = render(<Loading />);
    expect(getByTestId("loading")).toBeInTheDocument();
    expect(getByTestId("reactLoading")).toBeInTheDocument();
})  