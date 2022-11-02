import { useRouter } from 'next/router';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

export default function Success() {
    const { user } = useContext(AuthContext);
    const { push } = useRouter();
    return (
        <div>
            <h1>Te amo {user.name}</h1>
            <button type="button" onClick={() => push(`${user.githubUrl}`)}>
                Github
            </button>
            <button type="button" onClick={() => push(`${user.linkedinUrl}`)}>
                LinkedIn
            </button>
        </div>
    );
}
