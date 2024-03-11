import styled from 'styled-components';

import {Container} from 'components/GlobalComponents';

export const HeaderContainer = styled(Container)`
    height: 50px;
    margin: 10px;
    flex: none;
    justify-content: space-between;
`;

export const Title = styled.h1`
    color: ${props => props.theme['blue-700']};
`;

export const NavigationHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const BackButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px;
    font-weight: bold;
    font-size: 18px;
    cursor: pointer;
    width: 40px;
    height: 40px;
    outline: 0;
`;
