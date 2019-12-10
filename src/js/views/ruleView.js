import {elements} from './base';

export const handleFormSubmit = json => {
    const form = document.getElementById('check-rule')
    const submitButton = document.getElementById('search')
    const clearButton = document.getElementById('clear')

    clearButton.addEventListener('click', e => {
        const resultTemplate = document.getElementById('resultContainer')

        e.preventDefault();
        if (resultTemplate) {
            resultTemplate.parentNode.removeChild(resultTemplate);
        }
        form.reset();
    })

    submitButton.addEventListener('click', e => {
        const rawData = formData(form.elements);
        const requestObject = createRequest(rawData);

        e.preventDefault();
        renderResultcontainter(getResultArr(requestObject, json));
        renderResults(getResultArr(requestObject, json));
    })
}


const getResultArr = (requestObject, json) => {
    const resultArrs = Object.entries(requestObject).map(item => { 
        return(getObjects(json, item[0], item[1])) 
    }, [])

    let rslt = []
    resultArrs.map(oneArray => {
        oneArray.map(curObj => {
            let checkKeys = Object.keys(requestObject).every(elem => {return curObj[elem]})
            let clearReq = {}
            Object.keys(requestObject).map(elem => {
                if(JSON.stringify(requestObject[elem]) == JSON.stringify({"any":[]}) || JSON.stringify(requestObject[elem]) == JSON.stringify('') ) {
                    return 
                }   
                else {
                    return clearReq[elem] = requestObject[elem]
                }
            })

            //console.log(clearReq)
            let matchValues = Object.keys(clearReq).every(elem => {
                return JSON.stringify(clearReq[elem]) == JSON.stringify(curObj[elem])
                //console.log('Сравниваем', clearReq[elem], 'с', curObj[elem])
            }, [])

            //console.log(checkKeys, matchValues) 
            if (checkKeys && matchValues) {
                rslt.push(curObj)
            }
        }) 
    }, [])
    console.log(rslt)
return (rslt)  
}


const getObjects = (obj, key, val) => {
    let objects = [];
    for (let i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (key == 'source' || key == 'destination') {
            if (i == key && JSON.stringify(obj[i]) == JSON.stringify(val) || i == key && val == '') { 
                objects.push(obj);

            } else if (obj[i] == val && key == '') {
                if (objects.lastIndexOf(obj) == -1) {
                    objects.push(obj);
                }
            }
        }
        if (typeof obj[i] == 'object') {
            objects = [...objects, ...getObjects(obj[i], key, val)]
        } else {
            if (i == key && obj[i] == val || i == key && val == '') { 
                objects.push(obj);
            } else if (obj[i] == val && key == '') {

            //only add if the object is not already in the array
            if (objects.lastIndexOf(obj) == -1) {
                objects.push(obj);
                }
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


const createRequest = data => {
    let objFromForm = {
        destination: {},
        source: {},
        interface: {},
        protocol: {}
    }

    Object.entries(data).map(([k,v]) => {
        if (k == 'destinationAddress') {
            objFromForm.destination['address'] = data.destinationAddress
        } if (k == 'destinationPort') {
            objFromForm.destination['port'] = data.destinationPort

        } if (k == 'sourceAddress') {
            objFromForm.source['address'] = data.sourceAddress
        } if (k == 'sourcePort') {
            objFromForm.source['port'] = data.sourcePort

        } if (k == 'interface') {
            objFromForm['interface'] = data.interface

        } if (k == 'protocol') {
            if (v == 'any'){objFromForm['protocol'] = ''}
                else {objFromForm['protocol'] = data.protocol}

        } if (Object.entries(objFromForm.destination).length === 0) { objFromForm.destination['any'] = []
        
        } if (Object.entries(objFromForm.source).length === 0) { objFromForm.source['any'] = []}
    })
    return objFromForm
}


const renderResultcontainter = (result) => {
    const resultTemplate = document.getElementById('resultContainer')

    if (resultTemplate) {
        resultTemplate.parentNode.removeChild(resultTemplate);

        const markup = `
        <div id="resultContainer" class="col-lg-6 m-auto">
            <h3 class="mt-3">Results <span class="badge badge-secondary">${Object.keys(result).length}</span></h3>
            <div id="resultData"></div>
        </div>
        `;
        elements.container.insertAdjacentHTML('beforeend', markup);

    } else {
        const markup = `
        <div id="resultContainer" class="col-lg-6 m-auto">
            <h3 class="mt-3">Result</h3>
            <div id="resultData"></div>
        </div>
        `;
        elements.container.insertAdjacentHTML('beforeend', markup);
    }
}


const renderResults = (result) => {
    if (Object.keys(result).length == 0) {
        const markup = `
        <p>Результатов нет</p>
        `;
        resultData.insertAdjacentHTML('beforeend', markup);
    } else {
        result.forEach(element => {
            for (let [key, value] of Object.entries(element)) {
                resultData.insertAdjacentHTML('beforeend', `
                <li class="list-group-item">${JSON.stringify(key)} <span class="font-weight-bold">${JSON.stringify(value)}</li>
                `)
            }
            resultData.insertAdjacentHTML('beforeend', `</br>`)
        });
    }
}