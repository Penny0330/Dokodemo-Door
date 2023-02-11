import { auth, db } from "../utils/firebase.config";
import { doc, updateDoc } from "firebase/firestore";

export const useAddBox = () => {

    const addTextBox = async (value) => {
        const newText = [{
            type: "text",
            title: "",
            display: false
        }];
        const _value = newText.concat(value);
        await updateDoc(doc(db, "itemList", auth.currentUser.uid), { "item": _value });

    };

    const addLinkBox = async (value) => {
        const newLink = [{
            type: "link",
            title: "",
            url: "",
            display: false
        }];
        const _value = newLink.concat(value);
        await updateDoc(doc(db, "itemList", auth.currentUser.uid), { "item": _value });
    };

    const addImgBox = async (value) => {
        const newPic = [{
            type: "pic",
            imgUrl: "",
            file: "",
            display: false
        }];
        const _value = newPic.concat(value);
        await updateDoc(doc(db, "itemList", auth.currentUser.uid), { "item": _value });
    }

    return {addTextBox, addLinkBox, addImgBox};
}
