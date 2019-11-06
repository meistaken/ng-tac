import {
    elements
} from './base';

export const renderInfo = info => {

    const interfaces = info.results.interfaces;
    const system = info.results.system;

    const sysKey = ['hostname', 'domain', 'timezone', 'dnsserver']
  
    // Get properties from arr in system obj
    sysKey.forEach(function(el) {
        console.log(`${el} ${getProperty(system, el)}`);
      });

    // Get prop from obj
    function getProperty(obj, key) {
        if (key in obj)
            return obj[key];

        return "Cвойство отсутствует";
    }

    //  Get all keys from obj
    function getAll(obj) {
        for (const prop in obj) {
            console.log(`${prop} = ${JSON.stringify(obj[(prop)])}`);
        }
    }

    const markup = `
        <div class="card-body">
           <h2>General info</h2>
           ${sysKey[0]}<p>${getProperty(system, sysKey[0])}</p>
           ${sysKey[1]}<p>${getProperty(system, sysKey[1])}</p>
           ${sysKey[2]}<p>${getProperty(system, sysKey[2])}</p>
           ${sysKey[3]}<p>${getProperty(system, sysKey[3])}</p>

           <h2>Interfaces</h2>
           <p>${JSON.stringify(getProperty(interfaces))}</p>

           ${getAll(interfaces)}
        </div>
    `;
    document.getElementById('content').insertAdjacentHTML('beforeend', markup);
}
