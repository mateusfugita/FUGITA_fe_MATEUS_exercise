import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import SearchInput from 'components/SearchInput';

const mockOnChange = jest.fn();

describe('SearchInput', () => {
    it('should render input', () => {
        render(<SearchInput name='name' />);

        expect(screen.getByTestId('searchInput-name')).toBeInTheDocument();
    });

    it('should render value on input', () => {
        render(<SearchInput name='name' value='Value' onChange={mockOnChange} />);

        expect(screen.getByTestId('searchInput-name')).toHaveValue('Value');
    });

    it('should render value after user typed the value', () => {
        render(<SearchInput name='name' onChange={mockOnChange} />);

        const searchInput = screen.getByTestId('searchInput-name');
        fireEvent.change(searchInput, {target: {value: 'ABC'}});

        expect(searchInput).toHaveValue('ABC');
    });
});