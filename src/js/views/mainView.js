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
    <nav class="navbar navbar-expand-md navbar-light bg-light">
        <a class="navbar-brand" href="#">Support assistant</a>  

        <button class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
            <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav ml-auto">

                <li class="navbar-item"
                data-element="page" >
                    <a href="#" class="nav-link" id="info">Information</a>
                </li>

                <li class="navbar-item"
                data-element="page" >                    
                    <a href="#" class="nav-link" id="rule">Rule checker</a>
                </li>

                <button class="btn btn-outline-primary" type="submit" id="new">Add new config</button>
            </ul>
        </div>    
    </nav>

    <div class="container col-lg-6 mt-3">
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
        <div class="col-sm">
            <h6 class="card-subtitle mb-2 text-muted">General info</h6>
            <ul class="list-group"  id="gen-info"></ul>
        </div>

        <div class="col-sm">    
            <h6 class="card-subtitle mb-2 text-muted">Interface info</h6>
            <ul class="list-group" id="inf-info"></ul>                
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
            <h5 class="mt-3">${key.toUpperCase()}</h5>
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