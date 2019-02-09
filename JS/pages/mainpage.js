'use strict';

import GeneralInfo from './components/general-info.js'
import Nav from './components/sidebar.js'

export default class General {
    constructor({ element }) {
        this._element = element;
        this._render();

        this._nav = new Nav({
            element: this._element.querySelector('[data-component="nav"]'),
        })
        this._generalData = new GeneralInfo({
            element: this._element.querySelector('[data-component="general-info"]'),
        })
    }

    _render() {
        this._element.innerHTML = `
        <div class="wrapper">

            <!-- Sidebar -->
            <nav id="sidebar">
                <div data-component="nav"></div>
            </nav>
        
            <!-- Page Content -->
            <div id="content">

            <div class="card-body">
                <h1>General information</h1>
                <div data-component="general-info"></div>
            </div>

        </div>
    `;
    }
}