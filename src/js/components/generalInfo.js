//Local js
import '../data/config.json'

export default class GeneralInfo {
    constructor({
        element
    }) {
        this._element = element;
        this._render()
    }

    _render(){
        this._element.innerHTML = `
        <h1>General information</h1>
        <div class="mb-3">
            <label>{{info_param}}</label>
        <div class="text">{{info_data}}</div>

        `;
    }
}


/*
        if sys_data.tag == 'hostname':
        if sys_data.tag == 'domain':
        if sys_data.tag == 'timezone':
        if sys_data.tag == 'dnsserver':

        if sys_data.tag not in sys_info.keys():
        sys_info[sys_data.tag] = [sys_data.text]
        else:
        sys_info[sys_data.tag].append(sys_data.text)
*/
