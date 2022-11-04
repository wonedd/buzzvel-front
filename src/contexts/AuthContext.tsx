/* eslint-disable react-hooks/exhaustive-deps */
import Router from 'next/router';
import {
    createContext,
    ReactNode,
    useCallback,
    useMemo,
    useState,
} from 'react';
import { destroyCookie, setCookie } from 'nookies';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { api } from '../services/api';

type User = {
    id: string;
    name: string;
    linkedinUrl: string;
    githubUrl: string;
};

type ISignInData = {
    id: string;
};

interface AuthContextData {
    create: (credentials: ISignInData) => Promise<void>;
    signOut: () => void;
    isLoading: boolean;
    isAuthenticated: boolean;
    user: User | undefined;
}

type AuthProviderProps = {
    children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function signOut(): void {
    destroyCookie(undefined, 'buzzvel.token');

    Router.push('/');
}

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
    const [loggedAccount, setLoggedAccount] = useState<User>();
    const [isLoading, setIsLoading] = useState(false);

    const isAuthenticated = !!loggedAccount;

    const create = useCallback(async ({ id }: ISignInData) => {
        try {
            setIsLoading(true);

            const response = await api.post('sessions', {
                id,
            });

            const { token } = response.data;

            setCookie(undefined, 'buzzvel.token', token, {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/',
            });

            setLoggedAccount(response.data.user);

            api.defaults.headers.common.Authorization = `Bearer ${token}`;

            toast.success('Your card is ready 🚀');

            Router.push('/Qrcode');
        } catch (err) {
            if (err instanceof AxiosError) {
                toast.error(err.response?.data.message);
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    const authContextData: AuthContextData = useMemo(
        () => ({
            create,
            signOut,
            isAuthenticated,
            isLoading,
            user: loggedAccount,
        }),
        [isAuthenticated, create, loggedAccount, isLoading, signOut],
    );
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    );
}
