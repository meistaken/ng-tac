import { elements } from './base';

export const renderInfo = info => {
  //  const data = JSON.stringify(info);
/*
    let hostname = info.find(el => el.)
    let domain = 
    let timezone = 
    let dnsserver = 
*/
    const markup = `
        <div class="card-body">
           infoview
                ${info}
        </div>
    `;
    document.getElementById('content').insertAdjacentHTML('beforeend', markup);
   }


   /*


   for sys_data in root.iterfind('./system/'):
   if sys_data.tag == 'hostname':
       sys_info[sys_data.tag] = sys_data.text
   if sys_data.tag == 'domain':
       sys_info[sys_data.tag] = sys_data.text
   if sys_data.tag == 'timezone':
       sys_info[sys_data.tag] = sys_data.text
   if sys_data.tag == 'dnsserver':
       if sys_data.tag not in sys_info.keys():
           sys_info[sys_data.tag] = [sys_data.text]
       else:
           sys_info[sys_data.tag].append(sys_data.text)
*/




