import { elements } from './views/base';

import Info from './models/Data';
import * as mainView from './views/mainView';
import * as ruleView from './views/ruleView';

const state = {};

/** TODO List
 * 1. Upload XML config + convert to JSON
 * 2. Search in incomplete request in destination or source fields
 * 3. Need to test search
 * 4. Refactor code
 */

const generatePage = async() => {

    // Get data from JSON
    state.info = new Info();
 
    // Prepare UI
    mainView.clearButton();

    // Info from UI
    await state.info.getResults();

    // Render main layout template
    mainView.renderTemplate();

    // Render start page template
    mainView.renderInfoTemplate();

    // Render information content 
    mainView.renderInfo(state.info.results);

    //Start eventListning
    handleNav();

}

//Generate main layout after load JSON
elements.startButton.addEventListener('click', e => {
   e.preventDefault();
   generatePage();
});


// Upload JSON
document.getElementById('fileUpload').onchange = evt => {
    try {
        let files = evt.target.files;
        if (!files.length) {
            alert('No file selected!');
            return;
        }
        let file = files[0];
        let reader = new FileReader();
        reader.onload = event => {
            console.log('FILE CONTENT', event.target.result);
        }
        reader.readAsText(file);
    } catch (err) {
        console.error(err);
    }
}


// Add eventListeners for navigation
const handleNav = () => {
    document.querySelector('.navbar-nav').addEventListener('click', e => {
        e.preventDefault();
        pagecontroller(event.target.id);
    });
}

//Switch screens
const pagecontroller = page => {

    // Prepare UI
    mainView.clearContent();

    //Show page
    if(page == 'info') {
        mainView.renderInfoTemplate();
        mainView.renderInfo(state.info.results);
    }
    else if (page == 'rule') {
        ruleView.renderRule();

        // Search only in «filter» object
        ruleView.handleFormSubmit(state.info.results.filter);
    }
    else {
        alert('under-constuction')
    }
};