import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Container, Loading } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    isLoading?: boolean;
}

export function Button({ isLoading, children, ...rest }: ButtonProps) {
    return (
        <Container {...rest}>{isLoading ? <Loading /> : children}</Container>
    );
}
