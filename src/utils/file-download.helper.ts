const getFileFormData = (file: File) => {
    const formData = new FormData();
    formData.append("file", file, file.name);
    return formData;
};

const downloadFile = async (file: File, fileTitle: string, fileType: string) => {
    const tagLink = document.createElement('a');
    const url = window.URL.createObjectURL(new Blob([file], {type: fileType}));
    tagLink.href = url;
    tagLink.download = fileTitle;
    document.body.appendChild(tagLink);
    tagLink.click();
    document.body.removeChild(tagLink);
};

export {getFileFormData, downloadFile};