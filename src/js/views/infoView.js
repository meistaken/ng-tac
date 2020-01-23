// Generate page content
export const renderInfo = info => {
    renderGeneral(info)
    renderInterface(info)
}

// Render general information (system key in data) 
const renderGeneral = info => {
    // Keys required to render
    const keys = ['hostname', 'domain', 'timezone', 'dnsserver'];

    for (let [key, value] of Object.entries(info.system)) {
        if (keys.indexOf(key) != -1) {
            const markup = `
                    <li class="list-group-item">${key} <span class="font-weight-bold">${JSON.stringify(value)}</li>
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
                    <li class="list-group-item">${k} <span class="font-weight-bold">${JSON.stringify(v)}</span></li>
                    `
                document.getElementById('inf-info').insertAdjacentHTML('beforeend', markup);
            }
        }
    }
}