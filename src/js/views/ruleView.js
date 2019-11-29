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
                id="incomingInterface">
                    <option>LAN</option>
                    <option>WAN</option>
                </select>
                </div>
        </div>
                <input class="btn btn-primary btn col-md-3" type="submit" value="Check rule">
            </form>
            </div>
    `;
    document.getElementById('content').insertAdjacentHTML('beforeend', markup);
}


export const handleFormSubmit = (json) => {
    const form = document.getElementById('check-rule');

    form.addEventListener('submit', e => {
        e.preventDefault();

        const data = formToJSON(form.elements);
        const res = getObjects(json, '', data.destinationAddress);

        renderResultcontainter();
        renderResults(data, res);

        console.log(data);
        console.log(res);
    })
}


// Get data from form
const formToJSON = elements => Array.from(elements).reduce((data, element) => {
    if (isValidElement(element)) {
        // Add the valid field to the object
        data[element.id] = element.value;
    }
    return data;
}, {})

const isValidElement = element => {
    return element.id && element.value;
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

//Render result
const renderResultcontainter = () => {

    const template = document.getElementById('resultContainer')

    if (template) {
        template.parentNode.removeChild(template);

        const markup = `
        <div id="resultContainer" class="col-lg-6 m-auto">
            <h3 class="mt-3">Result</h3>
            <div id="res"></div>
        </div>
        `;
        document.getElementById('content').insertAdjacentHTML('beforeend', markup);
        
    } else {
        const markup = `
        <div id="resultContainer" class="col-lg-6 m-auto">
            <h3 class="mt-3">Result</h3>
            <div id="res"></div>
        </div>
        `;
        document.getElementById('content').insertAdjacentHTML('beforeend', markup);
    }
}

const renderResults = (data, result) => {

    if (Object.keys(data).length < 3) {
        const markup = `
        <p>Пустой запрос</p>
        `;
        document.getElementById('res').insertAdjacentHTML('beforeend', markup);

    } else {
        result.forEach(element => {
            for (let [key, value] of Object.entries(element)) {
                const markup = `
                        <li class="list-group-item">${key} <span class="font-weight-bold">${value}</li>
                `;
                document.getElementById('res').insertAdjacentHTML('beforeend', markup);
            }

            const markup = `</br>`;
            document.getElementById('res').insertAdjacentHTML('beforeend', markup);
        });
    }
}