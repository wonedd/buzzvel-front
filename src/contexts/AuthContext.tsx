/* eslint-disable react-hooks/exhaustive-deps */
import Router from 'next/router';
import {
    createContext,
    ReactNode,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
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
    name: string;
    linkedinUrl: string;
    githubUrl: string;
};

interface AuthContextData {
    signIn: (credentials: ISignInData) => Promise<void>;
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

    useEffect(() => {
        const { 'buzzvel.token': token } = parseCookies();

        if (token) {
            api.get('/')
                .then(response => {
                    setLoggedAccount(response.data);
                })
                .catch(() => {
                    toast.error(
                        'Oops! Something went wrong. Please try again later.',
                    );
                    signOut();
                });
        }
    }, []);

    const signIn = useCallback(
        async ({ name, linkedinUrl, githubUrl }: ISignInData) => {
            try {
                setIsLoading(true);

                const response = await api.post('sessions', {
                    name,
                    linkedinUrl,
                    githubUrl,
                });

                const { user, token } = response.data;

                setCookie(undefined, 'buzzvel.token', token, {
                    maxAge: 60 * 60 * 24 * 30, // 30 days
                    path: '/',
                });

                setLoggedAccount(user);

                api.defaults.headers.common.Authorization = `Bearer ${token}`;

                toast.success('Your card is ready 🚀');

                Router.push('/qrcode');
            } catch (err) {
                if (err instanceof AxiosError) {
                    toast.error(err.response?.data.message);
                }
            } finally {
                setIsLoading(false);
            }
        },
        [],
    );

    const authContextData: AuthContextData = useMemo(
        () => ({
            signIn,
            signOut,
            isAuthenticated,
            isLoading,
            user: loggedAccount,
        }),
        [isAuthenticated, signIn, loggedAccount, isLoading, signOut],
    );
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    );
}
