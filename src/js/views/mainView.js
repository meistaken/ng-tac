import {elements} from './base';

// Delete button after upload
export const clearButton = () => {
    elements.startButtonLocation.parentNode.removeChild(elements.startButtonLocation);
}

// Clear content
export const clearAll = () => {
    document.body.innerHTML = '';
}

// Clear content
export const clearContent = () => {
    content.innerHTML = '';
}


// Render layout
export const renderTemplate = () => {
    const markup = `
    <nav class="navbar navbar-expand-md navbar-light">
        <a class="navbar-brand h1 ml-4 mb-0" href="#" id="start">ngtac helper</a> 

        <button class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
            <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav ml-auto">

                <li class="navbar-item h5 mr-4 my-auto"
                data-element="page" >
                    <a href="#" class="nav-link" id="info">information</a>
                </li>

                <li class="navbar-item h5 mr-4 my-auto"
                data-element="page" >                    
                    <a href="#" class="nav-link" id="rule">rule checker</a>
                </li>

                <button type="button" class="btn btn-lg btn-primary" data-toggle="modal" data-target="#exampleModal" id="new">new config</button>
            </ul>
        </div>    
    </nav>

    <div class="container col-lg-6 m-auto" id="content"></div>
 `;
    elements.pageMarkup.insertAdjacentHTML('beforeend', markup);
}


// Render content page layout
export const renderInfoTemplate = () => {
    const markup = `
    <h2>Information</h2>
    <div class="row">
        <div class="col-md">
            <h6 class="card-subtitle text-muted mt-2 mb-1">General info</h6>
            <ul class="list-group mb-3" id="gen-info"></ul>
        </div>

        <div class="col-md">    
            <h6 class="card-subtitle text-muted mt-2 mb-1">Interface info</h6>
            <ul class="list-group mb-3" id="inf-info"></ul>                
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
                    <li class="list-group-item">${key} <span class="font-weight-bold">${value}</li>
            `;
        document.getElementById('gen-info').insertAdjacentHTML('beforeend', markup);
        }
    }
}


// Render interface information (interface key in data) 
const renderInterface = info => {

    for (let [key, value] of Object.entries(info.interfaces)) {
        const markup = `
            <h5 class="mt-2">${key.toUpperCase()}</h5>
        `;
        document.getElementById('inf-info').insertAdjacentHTML('beforeend', markup);

        for (let [k, v] of Object.entries(value)) {
            if (v == false) {
                const markup = `
                    <li class="list-group-item">${k}</li>
                `
                document.getElementById('inf-info').insertAdjacentHTML('beforeend', markup);
            } else if (v) {
                const markup = `
                    <li class="list-group-item">${k} <span class="font-weight-bold">${v}</span></li>
                    `
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