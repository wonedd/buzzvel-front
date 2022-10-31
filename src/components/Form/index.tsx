import { useForm } from 'react-hook-form';
import { Button } from '../Button';
import { Input } from '../Input';
import { Container, Title } from './styles';

export function Form() {
    const { register } = useForm();
    return (
        <Container>
            <Title>QR Code Image Generator</Title>
            <Input name="name" label="Nome" register={register} />
            <Input name="email" label="E-mail" register={register} />
            <Input name="password" label="Senha" register={register} />
            <Button>Generate Image</Button>
        </Container>
    );
}
