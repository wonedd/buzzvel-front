import { InputHTMLAttributes } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { Container, Label, InputBase } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    register: UseFormRegister<FieldValues>;
}

export function Input({
    name,
    label,
    register,
    required,
    ...rest
}: InputProps) {
    return (
        <Container>
            <Label>{label}</Label>
            <InputBase {...register(name, { required })} {...rest} />
        </Container>
    );
}
