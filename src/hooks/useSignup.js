import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

// firebase
import { auth, db } from '../utils/firebase.config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [pending, setPending] = useState(false);
    const { dispatch } = useAuthContext();

    const signup = (account, email, password) => {
        setError(null);
        setPending(true);

        if (!account) {
            setError('帳戶未填寫!');
            setPending(false);
            return;
        } else if (account.length > 20) {
            setError('帳戶名稱需小於20字元');
            setPending(false);
            return;
        }

        if (!email) {
            setError('信箱未填寫!');
            setPending(false);
            return;
        }

        if (!password) {
            setError('密碼未填寫!');
            setPending(false);
            return;
        }

        const showColor = {
            titleColor: '#333333',
            linkTextColor: '#333333',
            linkColor: 'rgba(255, 255, 255, 0.645)',
            logeColor: '#333333'
        };

        const profile = {
            account: account,
            photo: '',
            introduction: ''
        };

        const iconLink = [
            {
                iconIndex: 0,
                link: ''
            },
            {
                iconIndex: 1,
                link: ''
            },
            {
                iconIndex: 2,
                link: ''
            }
        ];

        createUserWithEmailAndPassword(auth, email, password)
            .then((currentUser) => {
                dispatch({ type: 'LOGIN', payload: currentUser.user.uid });
                setDoc(doc(db, 'itemList', currentUser.user.uid), {
                    "profile": profile,
                    "item": [],
                    "showColor": showColor,
                    "iconLink": iconLink
                });
            })
            .catch((error) => {
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        setError('此信箱已被註冊!');
                        break;
                    case 'auth/invalid-email':
                        setError('信箱格式有誤!');
                        break;
                    case 'auth/weak-password':
                        setError('密碼須至少6個字元!');
                        break;
                    default:
                }
                setPending(false);
            });
    };
    return { error, signup, pending };
};
