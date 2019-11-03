import { elements } from './views/base';

import Info from './models/Data';
import * as mainView from './views/mainView';
import * as infoView from './views/infoView';
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

    // Render template
    mainView.renderMarkup();

    //Start eventListning
    navEvent();

    // Render information content 
    infoView.renderInfo(state.info);

    //TEMP
    console.log(state.info.results);
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
const pagecontroller = (el) => {

    // Prepare UI
    mainView.clearContent();

    //Show page
    if(el == 'info') {
        infoView.renderInfo();
    }
    else if (el == 'rule') {
        ruleView.renderRule();
    }
    else {
        console.log('emptypage')
    }

};

