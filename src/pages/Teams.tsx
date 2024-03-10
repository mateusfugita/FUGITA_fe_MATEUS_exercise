import * as React from 'react';
import {ListItem, Teams as TeamsItem} from 'types';

import {getTeams as fetchTeams} from 'api';
import SearchInput from 'components/SearchInput';
import Header from 'components/Header';
import List from 'components/List';
import {Container} from 'components/GlobalComponents';
import ErrorMessage from 'components/ErrorMessage';

const mapTeamsList = (teams: TeamsItem[]) => {
    return teams.map(team => {
        const columns = [
            {
                key: 'Name',
                value: team.name,
            },
        ];
        return {
            id: team.id,
            url: `/team/${team.id}`,
            columns,
            navigationProps: team,
        } as ListItem;
    });
};

const Teams = () => {
    const [teams, setTeams] = React.useState<TeamsItem[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [isResponseError, setIsResponseError] = React.useState<boolean>(false);
    const [searchInputValue, setSearchInputValue] = React.useState<string>('');

    const filteredTeams = searchInputValue.length > 0
        ? teams.filter(team => team.name.toLowerCase().includes(searchInputValue.toLowerCase()))
        : teams;

    React.useEffect(() => {
        const getTeams = async () => {
            try {
                const response = await fetchTeams();
                setTeams(response);
            } catch (error) {
                setIsResponseError(true);
            } finally {
                setIsLoading(false);
            }
        };
        getTeams();
    }, []);

    return (
        <Container>
            <Header title="Teams" showBackButton={false} />
            {isResponseError && <ErrorMessage />}
            {!isLoading && !isResponseError && (
                <SearchInput
                    name='teamName'
                    value={searchInputValue}
                    onChange={(event) => setSearchInputValue(event.target.value)}
                />
            )}
            <List items={mapTeamsList(filteredTeams)} isLoading={isLoading} />
        </Container>
    );
};

export default Teams;
