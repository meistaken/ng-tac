'use strict';

import Component from './component.js';
import Nav from './components/sidebar.js'

import GeneralInfo from './components/general-info.js'
import InterfaceInfo from './components/interface-info.js'
import RuleChecker from './components/rule-checker.js'



export default class MainPage extends Component {
    constructor({ element }) {
        super ({element});
        this._element = element;

        this._render();

        this._generalData = new GeneralInfo({
            element: this._element.querySelector('[data-component="general-info"]'),
            pageSelected: (pageSelected) => {
                this._element.hide();
                this._element.querySelector('[data-component="${ pageSelected }"]').show();
            },
        })

        this._interfaceInfo = new InterfaceInfo({
            element: this._element.querySelector('[data-component="interface-info"]'),
            pageSelected: (pageSelected) => {
                this._element.hide();
                this._element.querySelector('[data-component="${ pageSelected }"]').show();
            },
        })

        this._ruleChecker = new RuleChecker({
            element: this._element.querySelector('[data-component="rule-checker"]'),
            pageSelected: (pageSelected) => {
                this._element.hide();
                this._element.querySelector('[data-component="${ pageSelected }"]').show();
            },
        })
        this._navigation = new Nav ({
            element: this._element.querySelector('[data-component="nav"]')
        })
        
    }
    hide() {
        this._element.hidden = true;
    }
    show() {
        this._element.hidden = false;
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
                    <div data-component="general-info" ></div>
                    <div data-component="interface-info" ></div>
                    <div data-component="rule-checker" ></div>
                </div>
            </div>

        </div>
    `;
    }
}