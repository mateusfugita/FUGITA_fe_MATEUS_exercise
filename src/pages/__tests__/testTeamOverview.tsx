import * as React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import * as API from '../../api';
import TeamOverview from '../TeamOverview';

jest.mock('react-router-dom', () => ({
    useLocation: () => ({
        state: {
            name: 'Some Team',
        },
    }),
    useNavigate: () => ({}),
    useParams: () => ({
        teamId: '1',
    }),
}));

describe('TeamOverview', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('should render team overview users', async () => {
        const teamOverview = {
            id: '1',
            teamLeadId: '2',
            teamMemberIds: ['3', '4', '5'],
        };
        const userData = {
            id: '2',
            firstName: 'userData',
            lastName: 'userData',
            displayName: 'userData',
            location: '',
            avatar: '',
        };
        jest.spyOn(API, 'getTeamOverview').mockResolvedValue(teamOverview);
        jest.spyOn(API, 'getUserData').mockResolvedValue(userData);

        render(<TeamOverview />);

        await waitFor(() => {
            expect(screen.queryAllByText('userData')).toHaveLength(4);
        });
    });

    it('should render filtered users list after change value of search input', async () => {
        const teamOverview = {
            id: '1',
            teamLeadId: '2',
            teamMemberIds: ['3'],
        };
        const userData = {
            id: '2',
            firstName: 'userData',
            lastName: 'userData',
            displayName: 'userData',
            location: '',
            avatar: '',
        };
        const userData2 = {
            id: '3',
            firstName: 'ABC',
            lastName: 'userData',
            displayName: 'userData',
            location: '',
            avatar: '',
        };
        jest.spyOn(API, 'getTeamOverview').mockResolvedValue(teamOverview);
        jest.spyOn(API, 'getUserData').mockResolvedValueOnce(userData);
        jest.spyOn(API, 'getUserData').mockResolvedValueOnce(userData2);

        render(<TeamOverview />);

        await waitFor(() => {
            expect(screen.queryAllByTestId(/cardContainer/)).toHaveLength(2);
        });

        fireEvent.change(screen.getByTestId('searchInput-userName'), {target: {value: 'ABC'}});
        expect(screen.queryAllByTestId(/cardContainer/)).toHaveLength(1);
    });
});
