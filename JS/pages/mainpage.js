'use strict';
import Nav from './components/sidebar.js'

import GeneralInfo from './components/general-info.js'
import InterfaceInfo from './components/interface-info.js'
import RuleChecker from './components/rule-checker.js'



export default class MainPage {
    constructor({ element }) {
        this._element = element;

        this._render();

        this._navigation = new Nav ({
            element: this._element.querySelector('[data-component="nav"]')
        })

        this._navigation.subscribe('page-selected', (pageId) => {
            let pageSelected = this._element.getAttribute(pageId);

            this._navigation.hide();
            this._navigation.show(pageSelected)
        })

        this._generalData = new GeneralInfo({
            element: this._element.querySelector('[data-component="general-info"]'),
        });
        
        this._interfaceInfo = new InterfaceInfo({
            element: this._element.querySelector('[data-component="interface-info"]'),
        })

        this._ruleChecker = new RuleChecker({
            element: this._element.querySelector('[data-component="rule-checker"]'),
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
                    <div 
                    data-element="page"
                    data-component="general-info" ></div>
                    <div
                    data-element="page" 
                    data-component="interface-info" ></div>
                    <div 
                    data-element="page"
                    data-component="rule-checker" ></div>
                </div>
            </div>

        </div>
    `;
    }
}