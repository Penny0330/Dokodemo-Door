import { auth, db } from "../utils/firebase.config";
import { doc, updateDoc } from "firebase/firestore";



const AddBox = (allBox = [], action) => {

    switch (action.type) {
        case 'AddTextBox':
            const newText = [{
                type: "text",
                title: "",
                display: false
            }]

            updateDoc(doc(db, "itemList", auth.currentUser.uid), { "item": newText.concat(action.allBox) })
            return newText.concat(action.allBox);

        case 'AddLinkBox':
            const newLink = [{
                type: "link",
                title: "",
                url: "",
                display: false
            }]

            updateDoc(doc(db, "itemList", auth.currentUser.uid), { "item": newLink.concat(action.allBox) })
            return newLink.concat(action.allBox);
        
        case 'AddImgBox':
            const newImg = [{
                type: "pic",
                imgUrl: "",
                file: "",
                display: false
            }]

            updateDoc(doc(db, "itemList", auth.currentUser.uid), { "item": newImg.concat(action.allBox) })
            return newImg.concat(action.allBox);

        case 'AddLineBox':
            const newLine = [{
                type: "line",
                display: true
            }]

            updateDoc(doc(db, "itemList", auth.currentUser.uid), { "item": newLine.concat(action.allBox) })
            return newLine.concat(action.allBox);


        default:
            return allBox
    }
}
export default AddBox;