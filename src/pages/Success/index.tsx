import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../contexts/AuthContext';
import { api } from '../../services/api';

interface User {
    id: string;
    name: string;
    linkedinUrl: string;
    githubUrl: string;
}
export default function Success() {
    const [user, setUser] = useState<User>();
    const { token } = useContext(AuthContext);

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await api.get(`/user/${token}`);
                setUser(response.data);
            } catch (err) {
                if (err instanceof AxiosError) {
                    toast.error(err.message);
                }
            }
        };
        getUser();
    }, [token]);

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
