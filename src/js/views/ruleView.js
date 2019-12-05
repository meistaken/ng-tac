import {elements} from './base';

export const renderRule = () => {
    const markup = `
    <div class="col-lg-6 m-auto">
        <h2>Rule Checker</h2>
        <form id="check-rule">
            <div class="form-row">
                <div class="col">
                    <label>Source Address</label>
                    <input 
                    type="text"
                    id="sourceAddress"
                    class="form-control mb-3"   
                    placeholder="Source address"  
                    value=""                        
                    >
                </div>

                <div class="col-md-4">
                    <label>Source Port</label>
                    <input 
                    type="text"
                    id="sourcePort"
                    class="form-control mb-3"   
                    placeholder="Source Port"
                    >
                </div>
            </div>

            <div class="form-row">
                <div class="col">
                    <label>Destination Address</label>
                    <input 
                    type="text"
                    class="form-control mb-3" 
                    id="destinationAddress" 
                    placeholder="Destination address"
                    >
                </div>
                <div class="col-md-4">
                    <label>Destination Port</label>
                    <input 
                    type="text"
                    class="form-control mb-3" 
                    id="destinationPort" 
                    placeholder="Destination Port"
                    >
                </div>
            </div>

            <div class="form-row">
                <div class="col">
                    <label>Protocol</label>
                    <select 
                    class="form-control mb-3" 
                    id="protocol">
                        <option>any</option>
                        <option>TCP</option>
                        <option>UDP</option>
                    </select>
                </div>
                <div class="col">
                    <label>Incoming interface</label>
                    <select 
                    class="form-control mb-3" 
                    id="interface">
                        <option>LAN</option>
                        <option>WAN</option>
                    </select>
                </div>
            </div>
            <div class='form-row justify-content-end'>
                <button id="clear" class="btn btn-outline-primary ml-2 mt-2 col-md-4" type="clear" >Clear form</button>
                <button id="search" class="btn btn-primary ml-2 mt-2 col-md-4" type="submit" >Check rule</button>
            </div>        
        </form>
    </div>
    `;
    content.insertAdjacentHTML('beforeend', markup);
}


export const handleFormSubmit = json => {
    const form = document.getElementById('check-rule')
    const submitButton = document.getElementById('search')
    const clearButton = document.getElementById('clear')

    clearButton.addEventListener('click', e => {
        const resultTemplate = document.getElementById('resultContainer')
        e.preventDefault();
        if (resultTemplate) {
            resultTemplate.parentNode.removeChild(resultTemplate);
        }
    })

    submitButton.addEventListener('click', e => {
        const rawData = formData(form.elements);
        const requestObject = createRequest(rawData);

        e.preventDefault();
        renderResultcontainter();
        renderResults(getResultArr(requestObject, json));
    })
}


const getResultArr = (requestObject, json) => {
    const hash = [];
    for (let prop in requestObject) {
        hash[prop] = getObjects(json.rule, prop, requestObject[prop])
    }
    
    const resultArrs = Object.values(hash)
    console.log('Arrays to compare:', resultArrs)

    let final = []
        for (let i=0; i < resultArrs.length - 1 ; i++ ) {
            let res = (resultArrs[i]).every(e => (resultArrs[i+1]).includes(e))
            if(res){
                final = resultArrs[i]
            }
        }
    return final    
}


const getObjects = (obj, key, val) => {
    let objects = [];
    for (let i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (key == 'source' || key == 'destination') {
            if (i == key && JSON.stringify(obj[i]) == JSON.stringify(val) || i == key && val == '') { 
                objects.push(obj);

            } else if (obj[i] == val && key == '') {
                if (objects.lastIndexOf(obj) == -1) {
                    objects.push(obj);
                }
            }
        }
        if (typeof obj[i] == 'object') {
            objects = [...objects, ...getObjects(obj[i], key, val)]
        } else {
            if (i == key && obj[i] == val || i == key && val == '') { 
                objects.push(obj);
            } else if (obj[i] == val && key == '') {

            //only add if the object is not already in the array
            if (objects.lastIndexOf(obj) == -1) {
                objects.push(obj);
                }
            }
        }
    }
    return objects;
}        


// Get data from form
const formData = elements => Array.from(elements).reduce((data, element) => {
    if (isValidElement(element, data)) {
        data[element.id] = element.value.toLowerCase();
    }
    return data;
}, {})


const isValidElement = element => {
    return element.id && element.value;
}


const createRequest = data => {
    let objFromForm = {
        destination: {},
        source: {},
        interface: {},
        protocol: {}
    }

    Object.entries(data).map(([k,v]) => {
        if (k == 'destinationAddress') {
            objFromForm.destination['address'] = data.destinationAddress
        } if (k == 'destinationPort') {
            objFromForm.destination['port'] = data.destinationPort

        } if (k == 'sourceAddress') {
            objFromForm.source['address'] = data.sourceAddress
        } if (k == 'sourcePort') {
            objFromForm.source['port'] = data.sourcePort

        } if (k == 'interface') {
            objFromForm['interface'] = data.interface

        } if (k == 'protocol') {
            if (v == 'any'){objFromForm['protocol'] = ''}
                else {objFromForm['protocol'] = data.protocol}

        } if (Object.entries(objFromForm.destination).length === 0) { objFromForm.destination['any'] = []
        
        } if (Object.entries(objFromForm.source).length === 0) { objFromForm.source['any'] = []}
    })
    return objFromForm
}


const renderResultcontainter = () => {
    const resultTemplate = document.getElementById('resultContainer')

    if (resultTemplate) {
        resultTemplate.parentNode.removeChild(resultTemplate);

        const markup = `
        <div id="resultContainer" class="col-lg-6 m-auto">
            <h3 class="mt-3">Result</h3>
            <div id="resultData"></div>
        </div>
        `;
        content.insertAdjacentHTML('beforeend', markup);

    } else {
        const markup = `
        <div id="resultContainer" class="col-lg-6 m-auto">
            <h3 class="mt-3">Result</h3>
            <div id="resultData"></div>
        </div>
        `;
        content.insertAdjacentHTML('beforeend', markup);
    }
}


const renderResults = (result) => {
    if (Object.keys(result).length == 0) {
        const markup = `
        <p>Результатов нет</p>
        `;
        resultData.insertAdjacentHTML('beforeend', markup);
    } else {
        result.forEach(element => {
            for (let [key, value] of Object.entries(element)) {
                const markup = `
                        <li class="list-group-item">${JSON.stringify(key)} <span class="font-weight-bold">${JSON.stringify(value)}</li>
                `;
                resultData.insertAdjacentHTML('beforeend', markup);
            }

            const markup = `</br>`;
            resultData.insertAdjacentHTML('beforeend', markup);
        });
    }
}