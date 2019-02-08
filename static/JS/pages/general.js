'use strict';

export default class GeneralInfo {
    constructor({ element }) {
        this.element = element;

        this._render();
    }

    _render() {
        this._element.innerHTML = `
            <h1 class="mb-4">General information</h1>
            <div class="card mb-2">
                <div class="card-body">
                    <div class="mb-3">
                        <label style="margin-bottom:0.05em;"></label>
                    <div class="text">{{info_data}}</div>
                </div>
                </div>
            </div>
            `;
        }
      }
      