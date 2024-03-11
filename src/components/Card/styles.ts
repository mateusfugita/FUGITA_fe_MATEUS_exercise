import styled from 'styled-components';

import {Container} from 'components/GlobalComponents';

export const CardContainer = styled(Container)<{hasNavigation: boolean}>`
    flex: none;
    border: 1px solid ${props => props.theme['blue-500']};
    background: ${props => props.theme['blue-100']};
    border-radius: 4px;
    padding: 20px;
    width: 250px;
    max-height: 200px;
    cursor: ${props => (props.hasNavigation ? 'pointer' : 'default')};
    margin: 5px;
`;
