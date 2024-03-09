import React, {InputHTMLAttributes} from 'react';

import {Container} from 'components/GlobalComponents';
import {Input} from './styles';

const SearchInput = (props: InputHTMLAttributes<HTMLInputElement>) => {
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