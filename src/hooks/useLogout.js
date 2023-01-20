import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { auth } from "../utils/firebase.config";
import { signOut } from "firebase/auth";

export const useLogout = () => {
    const [error, serError] = useState(null);
    const { dispatch } = useAuthContext();

    const logout = () => {
        serError(null);
        signOut(auth)
        .then((res) => {
            dispatch({type: "LOGOUT"})
        })
        .catch((error) => {
            serError(error.message)
        })
    }

    return { logout, error }
}