import { useState, useEffect } from "react";
import { auth, db } from "../utils/firebase.config";
import { doc, updateDoc } from "firebase/firestore";

export const useAddBox = (value) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        document.addEventListener('click', ()=>{setOpen(false)});
        return () => {
            document.removeEventListener('click', ()=>{setOpen(false)});
        }
    }, [])

    const handleClick = (e) => {
        e.preventDefault();
        setOpen(!open);

    };

    const handleChange = (e) => {
        setOpen(e.target.checked);
    };

    const addTextBox = async () => {
        const newText = [{
            type: "text",
            title: "",
            display: false
        }];
        const _value = newText.concat(value);
        await updateDoc(doc(db, "itemList", auth.currentUser.uid), { "item": _value });
        setOpen(!open);

    };

    const addLinkBox = async () => {
        const newLink = [{
            type: "link",
            title: "",
            url: "",
            display: false
        }];
        const _value = newLink.concat(value);
        await updateDoc(doc(db, "itemList", auth.currentUser.uid), { "item": _value });
        setOpen(!open);
    };

    const addImgBox = async () => {
        const newPic = [{
            type: "pic",
            imgUrl: "",
            file: "",
            display: false
        }];
        const _value = newPic.concat(value);
        await updateDoc(doc(db, "itemList", auth.currentUser.uid), { "item": _value });
        setOpen(!open);
    }

    const addLineBox = async () => {
        const newLine = [{
            type: "line",
            display: true
        }]
        const _value = newLine.concat(value);
        updateDoc(doc(db, "itemList", auth.currentUser.uid), { "item":  _value });
        setOpen(!open);
    }

    return { open, handleClick, handleChange, addTextBox, addLinkBox, addImgBox, addLineBox};
}
