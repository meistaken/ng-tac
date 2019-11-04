import { elements } from './base';

export const renderInfo = info => {

    const obj = info.results;  
    const sysKey = 'system';
    const intKey = 'interfaces';
    /*
    const sysKeyArr = ['hostname', 'domain','timezone','dnsserver']
    const intKeyArr = ['wan', 'lan']
    */
   
    function getProperty (obj, key) {
        if(obj instanceof Object) {
        if(key in obj) return obj[key];
        
        for (var k in obj) {
            var rec= findProperty(obj[k],key);
            if(rec) return rec;
        }
        return "Cвойство отсутствует";
        }
        return null;
        }
   
    const markup = `
        <div class="card-body">
           <h2>Genetal info</h2>
            hostname<p>${getProperty(obj, sysKey).hostname}</p>
            domain<p>${getProperty(obj, sysKey).domain}</p>
            timezone<p>${getProperty(obj, sysKey).timezone}</p>
            dnsserver<p>${getProperty(obj, sysKey).dnsserver}</p>
           <h2>Interfaces</h2>

            wan<p>${JSON.stringify(getProperty(obj, intKey).wan)}</p>
            lan<p>${JSON.stringify(getProperty(obj, intKey).lan)}</p>
        </div>
    `;
    document.getElementById('content').insertAdjacentHTML('beforeend', markup);
   }
