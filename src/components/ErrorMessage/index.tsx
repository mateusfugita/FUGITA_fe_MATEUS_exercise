import * as React from 'react';
import {ErrorMessage as ErrorMessageText} from './styles';

interface ErrorMessageProps {
    message?: string;
}

const ErrorMessage = ({message = 'An error occured while fetching the data, try again.'}: ErrorMessageProps) => (
    <ErrorMessageText>{message}</ErrorMessageText>
);

export default ErrorMessage;