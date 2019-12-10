<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
crossorigin="anonymous"></script>



            /* подгонка под ответ
            let clearReq = {}
            Object.keys(requestObject).map(elem => {
                //console.log(requestObject[elem])
                if(JSON.stringify(requestObject[elem]) == JSON.stringify({"any":[]})) {
                    return clearReq[elem]  = curObj[elem]
                }   
                if(JSON.stringify(requestObject[elem]) == JSON.stringify('')) {
                    return clearReq[elem]  = curObj[elem] 
                }   
                else {
                    return clearReq[elem] = requestObject[elem]
                }
                //console.log(requestObject[elem])
            })
            console.log(clearReq)
 
            matchValues = Object.keys(requestObject).some(elem => {
                requestObject[elem] == curObj[elem]
                //console.log('Сравниваем', requestObject[elem], 'с', curObj[elem])
            })
            */

            //return matchValues    
            //console.log(JSON.stringify(requestObject[elem]), JSON.stringify(object[elem]))
            //console.log(matchValues)  
            //console.log(checkKeys, matchValues)
            //console.log(object)

//  console.log(data)
//  console.log(Object.entries(data)) 
//  console.log(Object.fromEntries(Object.entries(data)))

//map

/*
// Add eventListeners for navigation
const handleNav = () => {
    document.querySelector('.navbar').addEventListener('click', e => {
        e.preventDefault();
        pagecontroller(event.target.id);
    });
};
*/

export const modal = () => {
    const markup = `
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Upload new JSON-configuration</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            <label class="btn btn-lg btn-primary mb-0 mr-2">
            Upload JSON <input id="fileUpload" type="file" hidden accept="application/json" />
        </label>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Upload</button>
        </div>
      </div>
    </div>
  </div>
 `;
 document.body.insertAdjacentHTML('beforeend', markup);
}


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

/*
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
*/

/*     
    "Work" solution 
    console.log('Arrays to compare:', resultArrs)
    let final = []
    for (let i=0; i < resultArrs.length - 1 ; i++ ) {
        let res = (resultArrs[i]).every(e => (resultArrs[i+1]).includes(e))
        if(res){
            final = resultArrs[i]
        }
    } 
    return final  
*/



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

console.log('test', search(json.rule, {descr: "SalSolo MAIL"}));

function search(list, query) {
    return list.filter(item => 
      Object.keys(query).every(key => 
        item[key] === query[key])
      );
  }


  ////// WORKING OBJECT Create
const dataFromForm = data => {
    let objFromForm = {
        destination: {address: {}, port: {}},
        source: {address: {}, port: {}},
        interface: {},
        protocol: {}
    }

    Object.entries(data).map(([k,v]) => {
        if (k == 'destinationAddress') {
            objFromForm.destination.address = data.destinationAddress
        } if (k == 'destinationPort') {
            objFromForm.destination.port = data.destinationPort


        } if (k == 'sourceAddress') {
            objFromForm.source.address = data.sourceAddress
        } if (k == 'sourcePort') {
            if (v == ''){objFromForm.source = {"any": []}}
            else {objFromForm.source.port = data.sourcePort}

        } if (k == 'interface') {
            objFromForm.interface = data.interface


        } if (k == 'protocol') {
            if (v == 'any'){ 
                objFromForm.protocol = ''
            }
                else {objFromForm.protocol = data.protocol}
        }  
    })
    return objFromForm
}



/* trying to destruct object

        const {dst, src, int, prtc} = requestObject;
        console.log(dst)


        const creatRequest = requestObject => {

            //destination
            if (requestObject.destination.address == {''}) {
                k = 'destination'
                v = ''
            }
            else {
                k = 'destination'
                v = {'address': requestObject.destination.address}
            }
            if (requestObject.destination.port == {''}) {
                k = 'destination'
                v = ''
            }
            else {
                k = 'destination'
                v = {'port': requestObject.destination.port}
            }

            //protocol
            if (requestObject.protocol == {''}) {
                k = 'protocol'
                v = ''
            }
            else {
                k = 'protocol'
                v = requestObject.protocol}
            }

*/

//renderResults(getObjects(json, 'destination', '{address: "10.10.30.31",
// test

let test = ['destination', 'source',  'protocol', 'target', 'local-port', 'interface', 'descr', 'associated-rule-id', 'created', 'updated']
for(let i in test){
    console.log(`${test[i]}`, getObjects(json, test[i], {"address": "10.10.30.31", "port": "80"}))}
        
//file upload
try {
    let files = e.target.files;
    if (!files.length) {
        alert('No file selected!');
        return;
    }
    let file = files[0];
    let reader = new FileReader();
    reader.onload = event => {
        const uploadJson = event.target.result;
        console.log('FILE CONTENT', event.target.result);
    }
    reader.readAsText(file);
} catch (err) {
    console.error(err);
}