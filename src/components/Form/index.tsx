import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Button } from '../Button';
import { Input } from '../Input';
import { Container, Title } from './styles';

export function Form() {
    const { push } = useRouter();
    const { register, handleSubmit } = useForm();
    return (
        <Container onSubmit={handleSubmit()}>
            <Title>QR Code Image Generator</Title>
            <Input name="name" label="Nome" register={register} />
            <Input name="email" label="E-mail" register={register} />
            <Input name="password" label="Senha" register={register} />
            <Button onClick={() => push('/qrcode')}>Generate Image</Button>
        </Container>
    );
}
