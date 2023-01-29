import {useState} from "react";
import { useAuthContext } from "./useAuthContext";

// firebase
import { auth } from "../utils/firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [ pending, setPending] = useState(false);
    const { dispatch } = useAuthContext();

    const signup = (email , password) => {
        setError(null);
        setPending(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((currentUser) => {
                dispatch({type:'LOGIN', payload: currentUser.user.uid})
            })
            .catch((error) => {
                switch(error.code){
                    case ("auth/email-already-in-use"):
                        setError("Email is already in use");
                        break;
                    case("auth/invalid-email"):
                        setError("Email is invalid");
                        break;
                    case("auth/weak-password"):
                        setError("Password should be at least 6 characters");
                        break;
                    default:
                }
                setPending(false);
            })  
    } 
    return { error, signup, pending }
} 