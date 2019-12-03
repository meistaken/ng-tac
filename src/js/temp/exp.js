

//  console.log(data)
//  console.log(Object.entries(data)) 
//  console.log(Object.fromEntries(Object.entries(data)))


    if (k == 'destinationAddress' || k == 'destinationPort') {
        k = ['destination']
        if (k == 'destinationAddress') {
            v = [{'address': data.destinationAddress}, ...args]
        }
        if (k == 'destinationPort') {
            v = [{'port': data.destinationPort}, ...args]
        }


//map

const rqst = data => Object.fromEntries(Object.entries(data).map(([k, v]) => {
    if (k == 'destinationAddress') {
        [k, v] = ['destination', {'address': data.destinationAddress}]
    } else if (k == 'destinationPort') {
        [k, v] = ['destination', {'port': data.destinationPort}]
    } else if (k == 'sourceAddress') {
        [k, v] = ['source', {'address': data.sourceAddress}]
    } else if (k == 'sourcePort') {
        [k, v] = ['source', {'port': data.sourcePort}]
    } else {
        ([k, v]) => [k, v]
    }
    return ([k, v])
}))


const rqst = data => Object.entries(data).map(([k, v]) => {
        if (k == 'destinationAddress') {
            final.push({'destination': {'address': data.destinationAddress)
        } else if (k == 'destinationPort') {
            final.push({'destination': {'port': data.destinationPort}})
        } else if (k == 'sourceAddress') {
            final.push({'source': {'address': data.sourceAddress}})
        } else if (k == 'sourcePort') {
            final.push({'source': {'port': data.sourcePort}})
        } else if (k == 'interface') {
            final.push({'interface': {'interface': data.interface}})
        } else if (k == 'protocol') {
            final.push({'protocol': {'protocol': data.protocol}})
        }
        return final
    
})





const res = getObjects(json, '', data.protocol);
// Search by key
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
