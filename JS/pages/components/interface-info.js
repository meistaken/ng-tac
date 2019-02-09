'use strict';

export default class InterfaceInfo {
    constructor({ element }) {
        this._element = element;
        this._render()
    }

    _render() {
        this._element.innerHTML = `
        <h1 class="mb-4">Interface information</h1>
        {% for int_name, int_data in int_dict.items() %}
            <div class="shadow-sm mb-4 rounded ">
                <div class="card-body">
                    {% for key, value  in int_data.items() %}
                        {% if value == "disabled" %}
                        <h4 style="text-transform: uppercase; margin: 0;">{{int_name}}<span class="badge badge-pill badge-danger" style="vertical-align:3px;">{{value}}</span></h4>
        
                        {% elif value == "enabled" %}
                        <h4 style="text-transform: uppercase; margin: 0;">{{int_name}}<span class="badge badge-pill badge-success" style="vertical-align:3px;">{{value}}</span></h4>
        
                        {% else %}
        
                        <div class="mt-3">
                            <label style="margin-bottom:0.05em;">{{key}}</label>
                            <div class="text">{{value}}</div>
                        </div>
                        {% endif %}
                    {%endfor%}
                    {% if int_name in vip %}
                    <div class="mt-3">
                        <div class="text">VIP Interfaces Information</div>
                    </div>
                    <table class="table table-hover mt-3">
                                    <thead>
                                    <tr>      
                                        {% for vip_int, vip_dict in vip.items() %}
                                        {% for ID, vip_data in vip_dict.items() %}                               
                                        {% for vip_key, vip_value in vip_data.items() if loop.first %} 
                                        <th>{{vip_key}}</th>
                                        {% endfor %}
                                        {% endfor %}
                                        {% endfor %}   
                                    </tr>
                                    </thead>
                                    
                                        {% for vip_int, vip_dict in vip.items() %}
                                        {% if vip_int == int_name %}
                                        {% for ID, vip_data in vip_dict.items() %} 
                                    <tbody>
                                    <tr>
                                        {% for vip_key, vip_value in vip_data.items() %}  
                                        <td>{{vip_value}}</td>
                                        {% endfor %}
                                        </tr>
                                    </tbody>
                                        {% endfor %}
                                        {% endif %}  
                                        {% endfor %}     
                        </table>
                    {% endif  %}
                </div>
            </div>
        {%endfor%}
        `;
    }
}