import React from 'react';
import {render, screen} from '@testing-library/react';
import ErrorMessage from '..';

describe('ErrorMessage', () => {
    it('should render default error message', () => {
        render(<ErrorMessage />);

        expect(screen.getByText('An error occured while fetching the data, try again.')).toBeInTheDocument();
    });

    it('should render a custom error message', () => {
        render(<ErrorMessage message='Custom error message' />);

        expect(screen.getByText('Custom error message')).toBeInTheDocument();
    });
});
