import { useEffect, useState } from "react";

import { auth, db } from "../utils/firebase.config";
import { doc, onSnapshot } from "firebase/firestore";

export const useGetBox = () => {
    
    const [profile, setProfile] = useState("");
    const [noPhotoText, setNoPhotoText] = useState("");
    const [value, setValue] = useState([]);
    const [color, setColor] = useState({});
    const [ pending, setPending ] = useState(false);

    useEffect(() => {
        setPending(true);
        const ref = doc(db, "itemList", auth.currentUser.uid)
        const unsub = onSnapshot((ref), (doc) => {
                let itemArr = [];
                doc.data().item.map((item) => {
                    itemArr.push(item)
                })
                setValue(itemArr)
                setColor(doc.data().showColor)
                setProfile(doc.data().profile)
                setPending(false);
                setNoPhotoText(doc.data().profile.account.slice(0, 1).toUpperCase())
                
        })
        
        return () => {
            unsub()
        }
    }, [])

    return {value, setValue, color, profile, noPhotoText, pending}
}
