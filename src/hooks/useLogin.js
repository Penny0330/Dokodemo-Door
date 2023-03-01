import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

// firebase
import { auth } from '../utils/firebase.config';
import { signInWithEmailAndPassword } from 'firebase/auth';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [pending, setPending] = useState(false);
    const { dispatch } = useAuthContext();

    const login = (email, password) => {
        setError(null);
        setPending(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((currentUser) => {
                dispatch({ type: 'LOGIN', payload: currentUser.user.uid });
            })
            .catch((error) => {
                switch (error.code) {
                    case 'auth/user-not-found':
                        setError('信箱或密碼有誤!');
                        break;
                    case 'auth/wrong-password':
                        setError('信箱或密碼有誤!');
                        break;
                    default:
                }
                setPending(false);
            });
    };
    return { error, login, pending };
};
