import { useState } from "react";

import { updateDoc, doc } from "firebase/firestore";
import { db, auth } from "../utils/firebase.config";

export const useChangeColor = (color) => {

    let init = "";  
    if(color.linkColor === "rgba(255, 255, 255, 0.645)"){
        init = "pri";
    }else if(color.linkColor === "#395347"){
        init = "green";
    }else if(color.linkColor === "rgb(28 56 111)"){
        init = "blue";
    }else if(color.linkColor === "#333333"){
        init = "black";
    }

    const [active, setActive] = useState(init);

    const changeColorPri = async() => {
        const showColor = {
            titleColor: "#333333",
            linkTextColor: "#333333",
            linkColor: "rgba(255, 255, 255, 0.645)",
            logeColor: "#333333",
        };
        await updateDoc(doc(db, "itemList", auth.currentUser.uid), {"showColor": showColor});
        setActive("pri");
    }

    const changeColorGreen = async() => {
        const showColor = {
            titleColor: "#333333",
            linkTextColor: "white",
            linkColor: "#395347",
            logeColor: "#395347",
        };
        await updateDoc(doc(db, "itemList", auth.currentUser.uid), {"showColor": showColor});
        setActive("green")
    }

    const changeColorBlue = async() => {
        const showColor = {
            titleColor: "#333333",
            linkTextColor: "#ECE9DF",
            linkColor: "rgb(28 56 111)",
            logeColor: "rgb(28 56 111)",

        };
        await updateDoc(doc(db, "itemList", auth.currentUser.uid), {"showColor": showColor});
        setActive("blue")
    }

    const changeColorBlack = async() => {
        const showColor = {
            titleColor: "#333333",
            linkTextColor: "#ECE9DF",
            linkColor: "#333333",
            logeColor: "#333333",
        };
        await updateDoc(doc(db, "itemList", auth.currentUser.uid), {"showColor": showColor});
        setActive("black")
    }

    return { changeColorPri, changeColorGreen, changeColorBlue, changeColorBlack, active };
}