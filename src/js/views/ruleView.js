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
        e.preventDefault();
    })

    submitButton.addEventListener('click', e => {
        e.preventDefault();

        let dataForm = formData(form.elements);
        fillFromForm(dataForm);

        renderResultcontainter();
        renderResults(getObjects(json.rule, 'associated-rule-id','' ));

        // test
        let test = ['source', 'destination', 'protocol', 'target', 'local-port', 'interface', 'descr', 'associated-rule-id', 'created', 'updated']
        for(let i in test)
        { console.log(`${test[i]}`, getObjects(json, test[i],'' ))    }
    })
}


const getObjects = (obj, key, val) => {
    let objects = [];
    for (let i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
                objects = objects.concat(getObjects(obj[i], key, val));
        } else

            //if key matches and value matches or if key matches and value is not passed 
            if (i == key && obj[i] == val || i == key && val == '') { 
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

const fillFromForm = data => Object.entries(data).map(([k]) => {
        if (k == 'destinationAddress') {
            objFromForm.destination.address = data.destinationAddress
        } else if (k == 'destinationPort') {
            objFromForm.destination.port = data.destinationPort
        } else if (k == 'sourceAddress') {
            objFromForm.source.address = data.sourceAddress
        } else if (k == 'sourcePort') {
            objFromForm.source.port = data.sourcePort
        } else if (k == 'interface') {
            objFromForm.interface = data.interface
        }  else if (k == 'protocol') {
            objFromForm.protocol = data.protocol
        }
        return objFromForm
})

// accumulator
let objFromForm = {
    destination: {address: {}, port: {}},
    source: {address: {}, port: {}},
    interface: {},
    protocol: {}
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