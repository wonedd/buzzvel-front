/* eslint-disable react-hooks/exhaustive-deps */
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Container, Content, Title, Text } from '../../../shared/shared.styles';
import { Button } from '../../components/Button';
import { api } from '../../services/api';

interface User {
    id: string;
    name: string;
    linkedinUrl: string;
    githubUrl: string;
}
export default function Success() {
    const [user, setUser] = useState<User>();
    const { query } = useRouter(); // access query from next router

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await api.get(`/user/${query.token}`); // get the user by token
                setUser(response.data);
            } catch (err) {
                if (err instanceof AxiosError) {
                    toast.error(err.message);
                }
            }
        };
        if (query.token) {
            // check if token exists because the router runs first than the useEffect
            getUser();
        }
    }, [query.token]);

    const { push } = useRouter();
    return (
        <Container>
            <Title>Hello my name is {user?.name}</Title>
            <Title>My history:</Title>
            <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
            <Content>
                <Button
                    type="button"
                    onClick={() => push(`${user?.githubUrl}`)}
                >
                    Github
                </Button>
                <Button
                    type="button"
                    onClick={() => push(`${user?.linkedinUrl}`)}
                >
                    LinkedIn
                </Button>
            </Content>
        </Container>
    );
}
