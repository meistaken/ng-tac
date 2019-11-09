// Content page layout
export const renderInfoTemplate = () => {
    const markup = `
    <div class="row">
    <div class="col-sm-6">
        <div class="card rounded" >
            <h5 class="card-header">
                General info
            </h5>
            <div class="card-body" id="gen-info">

            </div>
        </div>
    </div>
    <div class="col-sm-6">    
        <div class="card rounded" >
            <h5 class="card-header">
                Interface info
            </h5>
            <div class="card-body" id="inf-info">

            </div>  
        </div>
    </div>  
    </div>
   `;
    document.getElementById('content').insertAdjacentHTML('beforeend', markup);
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
        <div></div>
            <div>
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