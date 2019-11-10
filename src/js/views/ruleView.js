export const renderRule = () => {
    const markup = `
    <h2>Rule Checker</h2>
    <form id="check-rule">
    <div class="form-row mb-3">
        <div class="col-8">

            <label>Source Address</label>
            <input 
            type="text" 
            id="source-address"
            class="form-control mb-3"   
            placeholder="Source address"  
            value=""                        
            >

        </div>

        <div class="col">

                <label>Source Port</label>
                <input 
                type="text" 
                id="source-port"
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
                id="destination-address" 
                placeholder="Destination address"
                value=""   
                >
        </div>

        <div class="col">
                <label>Destination Port</label>
                <input 
                type="text" 
                class="form-control mb-3" 
                id="destination-port" 
                placeholder="Destination Port"
                value=""   
                >
        </div>
        </div>

        <div class="form-row mb-3">
            <div class="col-4">
                <label>Protocol</label>
                <select 
                class="form-control mb-3" 
                id="protocol">
                    <option>any</option>
                    <option>TCP</option>
                    <option>UDP</option>
                </select>
        </div>

        <div class="col-4">
                <label>Incoming interface</label>
                <select 
                class="form-control mb-3" 
                id="incoming-interface">
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

export const handleFormSubmit = () => {
    const form = document.getElementById('check-rule');

    form.addEventListener('submit', e => {
        e.preventDefault();

        const data = formToJSON(form.elements);
        console.log(data)
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


