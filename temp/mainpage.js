import Nav from './components/sidebar'

import GeneralInfo from './components/generalInfo'
import InterfaceInfo from './components/interface-info'
import RuleChecker from './components/rule-checker'
import { elements } from './views/base'

export default class MainPage {
    constructor({
        element
    }) {
        this._element = element;
        this._render();
        this._navigation = new Nav({
            element: this._element.querySelector('[data-component="nav"]')
        })

        this._navigation.subscribe('page-selected', (pageId) => {
            const pageSelected = this._element.querySelector(pageId);

            let pageItem = this._element.querySelectorAll(".page"),
                i = 0,
                l = pageItem.length;
            for (i; i < l; i++) {
                pageItem[i].hidden = true;
            }

            pageSelected.hidden = false;
        });


        this._generalData = new GeneralInfo({
            element: this._element.querySelector('#general-info'),
        });

        this._interfaceInfo = new InterfaceInfo({
            element: this._element.querySelector('#interface-info'),
        })


        this._ruleChecker = new RuleChecker({
            element: this._element.querySelector('#rule-checker'),
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
                    id = "general-info"
                    class = "page"
                    data-element="page"                   
                     ></div>

                    <div
                    id = "interface-info"
                    class = "page"
                    data-element="page" 
                    hidden
                    ></div>

                    <div 
                    id = "rule-checker"
                    class = "page"
                    data-element="page"
                    hidden
                    ></div>
                </div>
            </div>

        </div>
    `;
    }
}