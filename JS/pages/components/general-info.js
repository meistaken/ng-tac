'use strict';

export default class GeneralInfo {
    constructor({
        element
    }) {
        this._element = element;
        this._render()
    }

    _render() {
        this._element.innerHTML = `
        <h1>General information</h1>
        <div class="mb-3">
            <label>{{info_param}}</label>
        <div class="text">{{info_data}}</div>
        `;
    }
}