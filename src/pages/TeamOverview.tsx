import * as React from 'react';
import {useLocation, useParams} from 'react-router-dom';
import {ListItem, UserData} from 'types';
import SearchInput from 'components/SearchInput';
import {getTeamOverview, getUserData} from '../api';
import Card from '../components/Card';
import {Container} from '../components/GlobalComponents';
import Header from '../components/Header';
import List from '../components/List';

const getUserFullName = ({firstName, lastName}) => `${firstName} ${lastName}`;

const mapUsersList = (users: UserData[]) => {
    return users.map(user => {
        const columns = [
            {
                key: 'Name',
                value: `${user.firstName} ${user.lastName}`,
            },
            {
                key: 'Display Name',
                value: user.displayName,
            },
            {
                key: 'Location',
                value: user.location,
            },
        ];
        return {
            id: user.id,
            url: `/user/${user.id}`,
            columns,
            navigationProps: user,
        };
    }) as ListItem[];
};

const mapTeamLead = (teamLead: UserData) => {
    const columns = [
        {
            key: 'Team Lead',
            value: '',
        },
        {
            key: 'Name',
            value: `${teamLead.firstName} ${teamLead.lastName}`,
        },
        {
            key: 'Display Name',
            value: teamLead.displayName,
        },
        {
            key: 'Location',
            value: teamLead.location,
        },
    ];
    return <Card columns={columns} url={`/user/${teamLead.id}`} navigationProps={teamLead} />;
};

interface PageState {
    teamLead?: UserData;
    teamMembers?: UserData[];
}

const TeamOverview = () => {
    const location = useLocation();
    const {teamId} = useParams();
    const [pageData, setPageData] = React.useState<PageState>({});
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [searchInputValue, setSearchInputValue] = React.useState<string>('');

    const filteredTeamLead =
        searchInputValue.length === 0 || getUserFullName(pageData.teamLead).toLowerCase().includes(searchInputValue.toLowerCase())
        ? pageData?.teamLead
        : null;
    const filteredTeamMembers = searchInputValue.length > 0
        ? pageData?.teamMembers.filter(user => getUserFullName(user).toLowerCase().includes(searchInputValue.toLowerCase()))
        : pageData?.teamMembers;

    React.useEffect(() => {
        const getTeamUsers = async () => {
            const {teamLeadId, teamMemberIds = []} = await getTeamOverview(teamId);
            const teamLead = await getUserData(teamLeadId);

            const teamMembers = [];
            for(const teamMemberId of teamMemberIds) {
                const data = await getUserData(teamMemberId);
                teamMembers.push(data);
            }
            setPageData({
                teamLead,
                teamMembers,
            });
            setIsLoading(false);
        };
        getTeamUsers();
    }, [teamId]);

    return (
        <Container>
            <Header title={`Team ${location.state.name}`} />
            {!isLoading && (
                <SearchInput
                    name='userName'
                    value={searchInputValue}
                    onChange={(event) => setSearchInputValue(event.target.value)}
                />
            )}
            {!isLoading && filteredTeamLead && mapTeamLead(filteredTeamLead)}
            <List items={mapUsersList(filteredTeamMembers ?? [])} isLoading={isLoading} />
        </Container>
    );
};

export default TeamOverview;
