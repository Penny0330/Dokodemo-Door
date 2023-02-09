export const handleAddTextBox = (allBox) =>{
    return{
        type: 'AddTextBox',
        allBox: allBox
    };
}

export const handleAddLinkBox = (allBox) =>{
    return{
        type: 'AddLinkBox',
        allBox: allBox
    };
}

export const handleAddImgBox = (allBox) =>{
    return{
        type: 'AddImgBox',
        allBox: allBox
    };
}