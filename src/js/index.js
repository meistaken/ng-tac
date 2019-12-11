import * as base from './views/base';
import * as template from './views/templates'

import testData from './data/config.json';
import * as infoView from './views/infoView';
import * as ruleView from './views/ruleView';

const state = {};

document.addEventListener('DOMContentLoaded', () => {
    template.welcomeScreen()
})

const generatePage = event => {
    if (event) {
        base.handleUpload(event)
            .then(response => {
                console.log(response)
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

    } if (event.target.matches('#uploadModal')) {
        if(document.querySelector('#modalFileUpload').files.length == 0) {
            alert('файл не выбран')
        } if(document.querySelector('#modalFileUpload').files.length !==0) {
           generatePage(document.querySelector('#modalFileUpload').files[0]); 
        }
    } 
}, false);


document.addEventListener('input', event => {
    if (event.target.matches('#fileUpload')) {
        generatePage(event);

    } if (event.target.matches('#modalFileUpload')) {
        handleModal(event)
    } 
}, false);


const handleModal = (event) => {
    const file = event.target.files[0];
    try {
        document.querySelector('.modal-body').insertAdjacentHTML('beforeend', `<span>Файл ${file.name} успешно загружен</span>`);
    } catch (e) {
        alert(e.message)
    }
}
