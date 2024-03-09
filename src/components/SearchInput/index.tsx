import React, {InputHTMLAttributes} from 'react';

import {Container} from 'components/GlobalComponents';
import {Input} from './styles';

const SearchInput = (props: InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <Container>
            <Input
                {...props}
                data-testid={`searchInput-${props.name}`}
                placeholder="Pesquisar"
                type="search"
            />
        </Container>
    );
};

export default SearchInput;