import styled, {keyframes} from 'styled-components';

const spinnerAnimation = keyframes`
from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

export const SpinnerBody = styled.div`
    height: 4rem;
    width: 4rem;
    border: 4px solid ${props => props.theme['gray-300']};
    border-top-color: ${props => props.theme['blue-500']};
    border-radius: 50%;
    animation: ${spinnerAnimation} 800ms linear infinite;
`;