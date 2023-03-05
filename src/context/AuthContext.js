import { useReducer, createContext, useEffect } from 'react';

// firebase
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase.config';

const initState = {
    user: null,
    alreadyLogin: false
};

export const AuthContext = createContext();

export const reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload };
        case 'LOGOUT':
            return { ...state, user: null };
        case 'CHECK_LOGIN':
            return { user: action.payload, alreadyLogin: true };
        default:
            return state;
    }
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initState);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch({ type: 'CHECK_LOGIN', payload: user.uid });
            } else {
                dispatch({ type: 'CHECK_LOGIN', payload: user });
            }
        });
    }, []);

    return (
      <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>
    )
};
