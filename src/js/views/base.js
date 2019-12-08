export const elements = {
    demoButton: document.getElementById('demoJson'),
    uploadInput: document.getElementById('fileUpload'),
    container: document.getElementById('container'),
    content: document.getElementById('content'),
    resultData: document.getElementById('resData'),
    form: document.getElementById('check-rule'),
    submitButton: document.getElementById('search'),
    clearButton: document.getElementById('clear')
};

// Clear content container
export const clearContainer = () => {
    elements.container.innerHTML = '';
}

// Clear content
export const clearContent = () => {
    document.getElementById('content').innerHTML = '';
}


export const handleUpload = async (event) => {
    const file = event.target.files[0];
    try {
        const fileContents = await readUploadedFileAsText(file)
        return JSON.parse(fileContents)
    } catch (e) {
        console.warn(e.message)
    }
}


const readUploadedFileAsText = (inputFile) => {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
        reader.onerror = () => {
            reader.abort();
            reject(new DOMException("Problem parsing input file."));
        };
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.readAsText(inputFile);
    });
};