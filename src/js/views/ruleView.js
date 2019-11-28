export const renderRule = () => {
    const markup = `
    <h2>Rule Checker</h2>
    <form id="check-rule">
    <div class="form-row mb-3">
        <div class="col-8">

            <label>Source Address</label>
            <input 
            type="text"
            id="sourceAddress"
            class="form-control mb-3"   
            placeholder="Source address"  
            value=""                        
            >

        </div>

        <div class="col">

                <label>Source Port</label>
                <input 
                type="text"
                id="sourcePort"
                class="form-control mb-3"   
                placeholder="Source Port"
                value=""   
                >
        </div>

        </div>

        <div class="form-row mb-3">
            <div class="col-8">
                <label>Destination Address</label>
                <input 
                type="text"
                class="form-control mb-3" 
                id="destinationAddress" 
                placeholder="Destination address"
                value=""   
                >
        </div>

        <div class="col">
                <label>Destination Port</label>
                <input 
                type="text"
                class="form-control mb-3" 
                id="destinationPort" 
                placeholder="Destination Port"
                value=""   
                >
        </div>
        </div>

        <div class="form-row mb-3">
            <div class="col-sm-4">
                <label>Protocol</label>
                <select 
                class="form-control mb-3" 
                id="protocol">
                    <option>any</option>
                    <option>TCP</option>
                    <option>UDP</option>
                </select>
        </div>

        <div class="col-sm-4">
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
    `;
    document.getElementById('content').insertAdjacentHTML('beforeend', markup);
}

export const handleFormSubmit = (json) => {
    const form = document.getElementById('check-rule');

    form.addEventListener('submit', e => {
        e.preventDefault();

        const data = formToJSON(form.elements);
        const res = getObjects(json, '', data.destinationAddress);
        
        console.log(data);
        console.log(res);

        renderResults(res);
    })
}

const formToJSON = elements => [].reduce.call(elements, (data, element) => {

    if (isValidElement(element)) { 
        // Add the current field to the object.
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
        } else if (obj[i] == val && key == ''){
            //only add if the object is not already in the array
            if (objects.lastIndexOf(obj) == -1){
                objects.push(obj);
            }
        }
    }
    return objects;
}

//Render result
const renderResults = (res) => {

    const markup = `
    <h3>Result</h3>
    <p>${JSON.stringify(res)}</p>
    `;
    document.getElementById('content').insertAdjacentHTML('beforeend', markup);
}