/* eslint-disable react-hooks/exhaustive-deps */
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../../services/api';

interface User {
    id: string;
    name: string;
    linkedinUrl: string;
    githubUrl: string;
}
export default function Success() {
    const [user, setUser] = useState<User>();
    const { query } = useRouter();

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await api.get(`/user/${query.token}`);
                setUser(response.data);
            } catch (err) {
                if (err instanceof AxiosError) {
                    toast.error(err.message);
                }
            }
        };
        getUser();
    }, []);

    const { push } = useRouter();
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h1>{user?.name}</h1>
            <div style={{ display: 'flex', gap: '8' }}>
                <button
                    type="button"
                    onClick={() => push(`${user?.githubUrl}`)}
                >
                    Github
                </button>
                <button
                    type="button"
                    onClick={() => push(`${user?.linkedinUrl}`)}
                >
                    LinkedIn
                </button>
            </div>
        </div>
    );
}
