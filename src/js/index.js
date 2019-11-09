import { elements } from './views/base';

import Info from './models/Data';
import * as mainView from './views/mainView';
import * as ruleView from './views/ruleView';


/** Global state
 * - StartApp (later Upload JSON page )
 * - Current page
 * - Search rule
 * - Current rule
 */

const state = {};

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
    navEvent();

}

//Generate main layout after load JSON
elements.startButton.addEventListener('click', e => {
   e.preventDefault();
   generatePage();
});


// Add eventListeners for navigation
const navEvent = () => {
    document.querySelector('.nav').addEventListener('click', e => {
        e.preventDefault();
        pagecontroller(event.target.id);
     });
}

//Switch screens
const pagecontroller = (page) => {

    // Prepare UI
    mainView.clearContent();

    //Show page
    if(page == 'info') {
        mainView.renderInfoTemplate();
        mainView.renderInfo(state.info.results);
    }
    else if (page == 'rule') {
        ruleView.renderRule();
    }
    else {
        console.log('emptypage')
    }

};

