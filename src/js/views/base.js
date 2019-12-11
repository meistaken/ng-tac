export const elements = {
    demoButton: document.getElementById('demoJson'),
    uploadInput: document.getElementById('fileUpload'),
    container: document.getElementById('container'),
    content: document.getElementById('content'),
    resultData: document.getElementById('resData'),
    //form: document.getElementById('check-rule'),
    //submitButton: document.getElementById('search'),
    //clearButton: document.querySelector('clear')
}

// Clear content container
export const clearContainer = () => {
    elements.container.innerHTML = ''
}

// Clear content
export const clearContent = () => {
    document.getElementById('content').innerHTML = ''
}


export const handleUpload = async (event) => {
    let file = ''

    if (event.type == 'application/json'){
        file = event

    } if (event.type == 'input'){
        file = event.target.files[0]
    }
    try {
        const fileContents = await readFileAsText(file)

        if(fileContents.includes('<?xml version="1.0"?>')) {
            let xml2js = require('xml2js')
            xml2js.parseStringPromise(fileContents).then(result => {
                console.log(result.pfsense)
                return (result.pfsense)
            })
        } else {
            return JSON.parse(fileContents)
        }
        
    } catch (e) {
        alert(e.message)
    }
}

const readFileAsText = file => {
    const reader = new FileReader()

    return new Promise((resolve, reject) => {
        reader.onerror = () => {
            reader.abort();
            reject(new DOMException("Problem parsing input file."))
        }
        reader.onload = () => {
            resolve(reader.result)
        }
        reader.readAsText(file)
    })
}

