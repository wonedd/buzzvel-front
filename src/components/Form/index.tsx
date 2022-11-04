import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { AuthContext } from '../../contexts/AuthContext';
import { api } from '../../services/api';
import { Button } from '../Button';
import { Input } from '../Input';
import { Container, Title } from './styles';

interface FormData {
    linkedinUrl: string;
    githubUrl: string;
    name: string;
}

export function Form() {
    const { push } = useRouter();
    const { register, handleSubmit } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const { signIn, isAuthenticated } = useContext(AuthContext);

    const onHandleSubmit = async (data: FormData) => {
        setIsLoading(true);
        try {
            const response = await api.post('/', {
                linkedinUrl: data.linkedinUrl,
                githubUrl: data.githubUrl,
                name: data.name,
            });

            await signIn({
                id: response.data.id,
            });

            if (isAuthenticated) {
                push('/qrcode');
            }
        } catch (err) {
            console.log(
                '🚀 ~ file: index.tsx ~ line 41 ~ onHandleSubmit ~ err',
                err,
            );
            if (err instanceof AxiosError) {
                toast.error(err.response?.data.message);
            }
            push('/');
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <Container onSubmit={handleSubmit(onHandleSubmit)}>
            <Title>QR Code Image Generator</Title>
            <Input
                name="linkedinUrl"
                label="Linkedin"
                register={register}
                required
            />
            <Input
                name="githubUrl"
                label="Github"
                register={register}
                required
            />
            <Input name="name" label="Name" register={register} required />
            <Button isLoading={isLoading} type="submit">
                Generate Image
            </Button>
        </Container>
    );
}
