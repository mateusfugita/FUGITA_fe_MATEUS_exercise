import React, {InputHTMLAttributes} from 'react';

import {Container} from 'components/GlobalComponents';
import {Input} from './styles';

type SearchInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

const SearchInput = (props: SearchInputProps) => {
    return (
        <Container>
            <Input
                {...props}
                data-testid={`searchInput-${props.name}`}
                placeholder="Search"
                type="search"
            />
        </Container>
    );
};

export default SearchInput;