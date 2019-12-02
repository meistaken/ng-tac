import {
    filter
} from "minimatch";

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
                <input class="btn btn-primary btn col-md-3" type="submit" value="Check rule">
            </form>
            </div>
    `;
    content.insertAdjacentHTML('beforeend', markup);
}


export const handleFormSubmit = json => {
    const form = document.getElementById('check-rule');

    form.addEventListener('submit', e => {
        e.preventDefault();

        const data = formData(form.elements);
        //const res = getObjects(json, '', data.protocol);
        doRequest(data, json);

        renderResultcontainter();
        renderResults(doRequest);

        //console.log(request);
        //console.log(data);
        //console.log(res);
    })
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

/*
const cleanData = clean => {
    let cleaned = {}

    for (let key in clean) {

        const list = ['destinationA', 'destinationP', 'sourceA', 'sourceP']

        list.forEach(function (filterItem) {
            if (key == filterItem) cleaned[key] = clean[key];
        })
    console.log(cleaned);
    return cleaned
    }
}


    if (element.id == 'destinationAddress') {
        element.id = 'destinationA';
        data[element.id] = {
            'address': element.value
        }
    }
    if (element.id == 'destinationPort') {
        element.id = 'destinationP';
        data[element.id] = {
            'port': element.value
        }
    }
    if (element.id == 'sourceAddress') {
        element.id = 'sourceA';
        data[element.id] = {
            'address': element.value
        }
    }
    if (element.id == 'sourcePort') {
        element.id = 'sourceP';
        data[element.id] = {
            'port': element.value
        }
        return
        
    } else {
        */
/*
const res = getObjects(json, '' , val)
console.log(res)
*/
 
const doRequest = form => {
    let request = {}

    for (let key in form) { 
        if (key == 'destinationAddress') {
            request = {'destination': {'address': form.destinationAddress}}
        }
        if (key == 'destinationPort') {
            request = {'destination': {'port': form.destinationPort}}
        }
        if (key == 'sourceAddress') {
            request = {'source': {'address': form.sourceAddress}}
        }
        if (key == 'sourcePort') {
            request = {'source': {'port': form.sourcePort}}
        }
        else {
            request[key] = form.key
        }
    }
    
    delete request.destinationPort;
    delete request.destinationAddress;
    delete request.sourceAddress;
    delete request.sourcePort;
    
    console.log(request);
    return request;
}

// Get objects
const getObjects = (obj, key, val) => {
    let objects = [];
    for (let i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));
        } else

            //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
            if (i == key && obj[i] == val || i == key && val == '') { //
                objects.push(obj);

            } else if (obj[i] == val && key == '') {
            //only add if the object is not already in the array
            if (objects.lastIndexOf(obj) == -1) {
                objects.push(obj);
            }
        }
    }
    return objects;
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
        <p>Пустой запрос</p>
        `;
        resultData.insertAdjacentHTML('beforeend', markup);

    } else {
        result.forEach(element => {

            for (let [key, value] of Object.entries(element)) {
                const markup = `
                        <li class="list-group-item">${key} <span class="font-weight-bold">${value}</li>
                `;
                resultData.insertAdjacentHTML('beforeend', markup);
            }

            const markup = `</br>`;
            resultData.insertAdjacentHTML('beforeend', markup);
        });
    }
}