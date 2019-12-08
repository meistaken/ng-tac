import * as base from './views/base';
import * as template from './views/templates'

import testData from './data/config.json';
import * as infoView from './views/infoView';
import * as ruleView from './views/ruleView';


/** TODO List
 * Upload XML config + convert to JSON
 * Search in incomplete request in destination or source fields
 * Upload data validation
 * Fix search alg
 * Fix double click to open-modal 
 * Fix modal upload logic
 */


const state = {};

document.addEventListener('DOMContentLoaded', () => {
    template.welcomeScreen()
})

const generatePage = event => {
    if (event) {
        base.handleUpload(event)
            .then(response => {
                state.info = response;

                // Prepare UI
                base.clearContainer();

                // Render nav + content container
                template.nav();
                template.contentContainer();

                // Render start page template
                template.infoTemplate();

                // Render information content 
                infoView.renderInfo(response);
            })
    } else {
        // Get testData from JSON
        state.info = testData;

        // Prepare UI
        base.clearContainer();

        // Render nav + content container
        template.nav();
        template.contentContainer();

        // Render start page template
        template.infoTemplate();

        // Render information content 
        infoView.renderInfo(testData);
    }
}

//Switch screens
const pagecontroller = item => {
    if (item == 'info') {
        base.clearContent()
        template.infoTemplate()
        infoView.renderInfo(state.info)

    } if (item == 'rule') {
        base.clearContent()
        template.renderRule()
        ruleView.handleFormSubmit(state.info.filter)
        
    } if (item == 'start') {
        base.clearContainer()
        template.welcomeScreen()

    } if (item == 'new') {
        template.modal()
    }
}

document.addEventListener('click', event => {
    if (event.target.matches('#demoJson')) {
        generatePage();
    } if (event.target.matches('.nl')) {
        pagecontroller(event.target.id);
    } 
}, false);


document.addEventListener('input', event => {
    if (event.target.matches('#fileUpload')) {
        generatePage(event);
    } 
}, false);


