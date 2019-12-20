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

    if (event.type == 'input'){
        file = event.target.files[0]

    } else if (event.type == 'text/xml') {
        file = event
    }

    try {
        const fileContents = await readFileAsText(file)
            let parser = require('fast-xml-parser');
            let he = require('he');
             
            let options = {
                attributeNamePrefix : "@_",
                attrNodeName: "attr", //default is 'false'
                textNodeName : "#text",
                ignoreAttributes : true,
                ignoreNameSpace : false,
                allowBooleanAttributes : false,
                parseNodeValue : true,
                parseAttributeValue : false,
                trimValues: true,
                cdataTagName: "__cdata", //default is 'false'
                cdataPositionChar: "\\c",
                localeRange: "", //To support non english character in tag/attribute values.
                parseTrueNumberOnly: false,
                arrayMode: false, //"strict"
                attrValueProcessor: (val, attrName) => he.decode(val, {isAttributeValue: true}),//default is a=>a
                tagValueProcessor : (val, tagName) => he.decode(val), //default is a=>a
                stopNodes: ["parse-me-as-string"]
            };
            let tObj = parser.getTraversalObj(fileContents,options);
            var data = parser.convertToJson(tObj,options)

            return data.pfsense         
        
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

