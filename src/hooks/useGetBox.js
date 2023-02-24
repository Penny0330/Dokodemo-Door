import { useEffect, useState } from "react";

import { db } from "../utils/firebase.config";
import { doc, onSnapshot } from "firebase/firestore";

export const useGetBox = (user) => {

    const [profile, setProfile] = useState("");
    const [noPhotoText, setNoPhotoText] = useState("");
    const [value, setValue] = useState([]);
    const [color, setColor] = useState({});
    const [ iconLink, setIconLink ] = useState([]);
    const [error, setError] = useState(false);
    const [ pending, setPending ] = useState(false);

    useEffect(() => {
        setPending(true);
        const ref = doc(db, "itemList", user)
        const unsub = onSnapshot((ref), (doc) => {

                if(doc.data() === undefined){
                    setError(true);
                    setPending(false);
                    return
                }else{

                    let itemArr = [];
                    doc.data().item.map((item) => {
                        itemArr.push(item);
                    })
                    setValue(itemArr);
                    setColor(doc.data().showColor);
                    setProfile(doc.data().profile);
                    setNoPhotoText(doc.data().profile.account.slice(0, 1).toUpperCase());
                    setIconLink(doc.data().iconLink);
                    setPending(false);
                }
                
        })

        return () => {
            unsub();
        }
    }, [])

    return {value, setValue, color, profile, noPhotoText, error, pending, iconLink};
}
