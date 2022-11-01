import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { globalStyles } from '../../shared/styles';
import { AuthProvider } from '../contexts/AuthContext';

const cache = createCache({ key: 'next' });

export default function App({ Component, pageProps }: AppProps) {
    return (
        <CacheProvider value={cache}>
            <AuthProvider>
                <ToastContainer autoClose={5000} />
                {globalStyles}
                <Component {...pageProps} />
            </AuthProvider>
        </CacheProvider>
    );
}
