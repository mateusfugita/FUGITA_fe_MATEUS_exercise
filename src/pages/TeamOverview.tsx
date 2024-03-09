import * as React from 'react';
import {useLocation, useParams} from 'react-router-dom';
import {ListItem, UserData} from 'types';
import SearchInput from 'components/SearchInput';
import {getTeamOverview, getUserData} from '../api';
import Card from '../components/Card';
import {Container} from '../components/GlobalComponents';
import Header from '../components/Header';
import List from '../components/List';

const teamUserName = ({firstName, lastName}) => `${firstName} ${lastName}`;

var mapArray = (users: UserData[]) => {
    return users.map(u => {
        var columns = [
            {
                key: 'Name',
                value: `${u.firstName} ${u.lastName}`,
            },
            {
                key: 'Display Name',
                value: u.displayName,
            },
            {
                key: 'Location',
                value: u.location,
            },
        ];
        return {
            id: u.id,
            url: `/user/${u.id}`,
            columns,
            navigationProps: u,
        };
    }) as ListItem[];
};

var mapTLead = tlead => {
    var columns = [
        {
            key: 'Team Lead',
            value: '',
        },
        {
            key: 'Name',
            value: `${tlead.firstName} ${tlead.lastName}`,
        },
        {
            key: 'Display Name',
            value: tlead.displayName,
        },
        {
            key: 'Location',
            value: tlead.location,
        },
    ];
    return <Card columns={columns} url={`/user/${tlead.id}`} navigationProps={tlead} />;
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

    const filteredTeamLead = searchInputValue.length === 0 || teamUserName(pageData.teamLead).toLowerCase().includes(searchInputValue.toLowerCase())
        ? pageData?.teamLead
        : null;
    const filteredTeamMembers = searchInputValue.length > 0
        ? pageData?.teamMembers.filter(user => `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchInputValue.toLowerCase()))
        : pageData?.teamMembers;

    React.useEffect(() => {
        var getTeamUsers = async () => {
            const {teamLeadId, teamMemberIds = []} = await getTeamOverview(teamId);
            const teamLead = await getUserData(teamLeadId);

            const teamMembers = [];
            for(var teamMemberId of teamMemberIds) {
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
                    value={searchInputValue}
                    onChange={(event) => setSearchInputValue(event.target.value)}
                />
            )}
            {!isLoading && filteredTeamLead && mapTLead(filteredTeamLead)}
            <List items={mapArray(filteredTeamMembers ?? [])} isLoading={isLoading} />
        </Container>
    );
};

export default TeamOverview;
