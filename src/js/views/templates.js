import {elements} from './base';

export const welcomeScreen = () => {
    const markup = `
    <div id="uploadJson" class="col-lg-6 mx-auto mt-5">
        <div class="col text-center">
            <h1 class="display-3">pfsense config reader</h1>
            <p class="my-4">Check information about your configuration and seach rules by parameters</p>
            <label class="btn btn-lg btn-primary mb-0 mr-2">
                Upload file<input id="fileUpload" type="file" hidden accept="application/json, application/xml" />
            </label>
            <button id="demoJson" type="button" class="btn btn-lg  btn-outline-primary" >Demo file</button>
            <p class="my-2 text-info"><small>Upload pfsense config in XML format</small></p>
        </div>
    </div>   
     `;
     elements.container.insertAdjacentHTML('beforeend', markup); 
}

// Navigation
export const nav = () => {
    const markup = `
    <nav class="navbar navbar-expand-md navbar-light">
        <a class="navbar-brand h1 ml-4 mb-0 nl" href="#" id="start" >ngtac helper</a> 

        <button class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
            <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav ml-auto">
                <li class="navbar-item h5 mr-4 my-auto" ><a href="#" class="nav-link nl" id="info">information</a></li>

                <li class="navbar-item h5 mr-4 my-auto" ><a href="#" class="nav-link nl" id="rule">rule checker</a></li>
        
                <button class="btn btn-lg btn-primary mr-4 nl" data-toggle="modal" data-target="#uploadModal" id="new">new config</button>
            </ul>
        </div>    
    </nav>
 `;
    elements.container.insertAdjacentHTML('beforeend', markup);
}

// Render layout
export const contentContainer = () => {
    const markup = `
    <div id="content" class="container col-lg-4 m-auto" ></div>
 `;
    elements.container.insertAdjacentHTML('beforeend', markup);
}

// Render information page layout
export const infoTemplate = () => {
    const markup = `
    <h2 class="mb-3">Information</h2>
        <ul class="list-group" id="gen-info"></ul>
        <ul class="list-group" id="inf-info"></ul>                
   `;
    document.getElementById('content').insertAdjacentHTML('beforeend', markup);
}

// Rule search form
export const renderRule = () => {
    const markup = `
        <h2 class="mb-3">Rule Checker</h2>
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
    `;
    document.getElementById('content').insertAdjacentHTML('beforeend', markup);
}

// Render upload modal
export const modal = () => {
    const markup = `
    <div class="modal" id="uploadModal" >
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Upload new JSON-configuration</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
            <div class="modal-body">
            <div class="col" id="uploadForm">
                <label class="btn btn-lg btn-primary mb-0 mr-2">
                Select file <input id="modalFileUpload" type="file" hidden accept="application/json, application/xml" />
                </label>
            </div>
            <p class="text-info mt-2 mb-0"><small>You can upload config in XML or JSON format</small></p>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" id="uploadDataModal">Upload</button>
          </div>
        </div>
        </div>
    </div>
    `; 
    document.body.insertAdjacentHTML('beforeend', markup);
}
