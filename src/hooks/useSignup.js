import {useState} from "react";
import { useAuthContext } from "./useAuthContext";

// firebase
import { auth, db } from "../utils/firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, onSnapshot, setDoc, collection, query, where } from "firebase/firestore";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [ pending, setPending] = useState(false);
    const { dispatch } = useAuthContext();

    const signup = (account, email , password) => {
        setError(null);
        setPending(true);

        const ref = collection(db, "itemList")
        const q = query(ref, where("account", "==", account))
        
        const unsub = onSnapshot(q, (querySnapshot) => {
            let accountArr = [];
            querySnapshot.forEach((doc) => {
                accountArr.push({ ...doc.data()});
            });
            if(accountArr[0]){
                setError("此帳號已註冊")
            }else{
                const showColor = {
                    titleColor: "#333333",
                    linkTextColor: "#333333",
                    linkColor: "rgba(255, 255, 255, 0.645)",
                    logeColor: "#333333",
                }

                const profile = {
                    account: account,
                    photo: "",
                    introduction: ""
                }

                createUserWithEmailAndPassword(auth, email, password)
                .then((currentUser) => {
                    dispatch({type:'LOGIN', payload: currentUser.user.uid})
                    setDoc(doc(db, "itemList", currentUser.user.uid), { "profile": profile, "item": [], "showColor": showColor  })
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
        })
        
    } 
    return { error, signup, pending }
} 