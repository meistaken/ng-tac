import {elements} from './base';

// Delete button after upload
export const clearButton = () => {
    elements.startButtonLocation.parentNode.removeChild(elements.startButtonLocation);
}


// Clear content
export const clearContent = () => {
    content.innerHTML = '';
}


// Render layout
export const renderTemplate = () => {
    const markup = `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Support assistant</a>  

            <ul class="nav">
                <li class="nav-item"
                data-element="page"
                >
                    <a class="nav-link active" href="#" id="info">Information</a>
                </li>

                <li class="nav-item"
                data-element="page"
                >                    
                    <a class="nav-link" href="#" id="rule">Rule checker</a>
                </li>

                <button class="btn btn-outline-primary" type="submit" id="new">
                Add new config
                </button>
            </ul>
    </nav>

    <div class="container p-4 col-6">
        <div id="content"></div>
    </div>
 `;
    elements.pageMarkup.insertAdjacentHTML('beforeend', markup);
}


// Render content page layout
export const renderInfoTemplate = () => {
    const markup = `
    <h2 class="mb-3">Information</h2>
    <div class="row">
        <div class="col">
            <div class="card rounded" >
                <div class="card-body" id="gen-info">
                    <h6 class="card-subtitle mb-3 text-muted">General info</h6>
                </div>
            </div>
        </div>

        <div class="col">    
            <div class="card rounded" >
                <div class="card-body" id="inf-info">
                <h6 class="card-subtitle mb-3 text-muted">Interface info</h6>
                </div>  
            </div>
        </div> 
    </div>
   `;
    content.insertAdjacentHTML('beforeend', markup);
}


// Render general information (system key in data) 
const renderGeneral = info => {

    // Keys required to render
    const keys = ['hostname', 'domain', 'timezone', 'dnsserver'];

    for (let [key, value] of Object.entries(info.system)) {

        if (keys.indexOf(key) != -1) {
            const markup = `
                <div>
                    <h4>${key}</h4>
                    <p>${value}</p>
                </div>
        `;
            document.getElementById('gen-info').insertAdjacentHTML('beforeend', markup);
        }
    }
}


// Render interface information (interface key in data) 
const renderInterface = info => {

    for (let [key, value] of Object.entries(info.interfaces)) {
        const markup = `
            <div >
                <h4>${key.toUpperCase()}</h4>
            </div>

        `;
        document.getElementById('inf-info').insertAdjacentHTML('beforeend', markup);

        for (let [k, v] of Object.entries(value)) {
            if (v == false) {
                ''
                // If need render empty keys
                /* 
                const markup = `
                <h5 class="results">${k}</h5><p class="results__value">Empty value</p>`
                document.getElementById('inf-info').insertAdjacentHTML('beforeend', markup);
                */
            } else if (v) {
                const markup = `
                    <h5>${k}</h5><p>${v}</p>`
                document.getElementById('inf-info').insertAdjacentHTML('beforeend', markup);
            }
        }
    }
}

// Generate page content
export const renderInfo = info => {
    renderGeneral(info)
    renderInterface(info)
}