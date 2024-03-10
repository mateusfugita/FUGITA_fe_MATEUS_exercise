import * as React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import * as API from '../../api';
import Teams from '../Teams';

jest.mock('react-router-dom', () => ({
    useLocation: () => ({
        state: {
            firstName: 'Test',
            lastName: 'User',
            displayName: 'userName',
            location: 'location',
        },
    }),
    useNavigate: () => ({}),
}));

describe('Teams', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('should render spinner while loading', async () => {
        render(<Teams />);

        expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });

    it('should render teams list', async () => {
        jest.spyOn(API, 'getTeams').mockResolvedValue([
            {
                id: '1',
                name: 'Team1',
            },
            {
                id: '2',
                name: 'Team2',
            },
        ]);

        render(<Teams />);

        await waitFor(() => {
            expect(screen.getByText('Team1')).toBeInTheDocument();
        });
        expect(screen.getByText('Team2')).toBeInTheDocument();
        expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
    });

    it('should render filtered teams list after change value of search input', async () => {
        jest.spyOn(API, 'getTeams').mockResolvedValue([
            {
                id: '1',
                name: 'Team1',
            },
            {
                id: '2',
                name: 'Team2',
            },
        ]);

        render(<Teams />);

        await waitFor(() => {
            expect(screen.queryAllByTestId(/cardContainer/)).toHaveLength(2);
        });

        fireEvent.change(screen.getByTestId('searchInput-teamName'), {target: {value: '1'}});
        expect(screen.getByTestId('cardContainer-1')).toBeInTheDocument();
        expect(screen.queryByTestId('cardContainer-2')).not.toBeInTheDocument();
    });

    it('should render an error message when the getTeams API fails to answer successfully', async () => {
        jest.spyOn(API, 'getTeams').mockRejectedValue(new Error());

        render(<Teams />);

        await waitFor(() => {
            expect(screen.getByText('An error occured while fetching the data, try again.')).toBeInTheDocument();
        });
    });
});
