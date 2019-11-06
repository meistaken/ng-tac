import { elements } from './views/base';

import Info from './models/Data';
import * as mainView from './views/mainView';
import * as infoView from './views/infoView';
import * as ruleView from './views/ruleView';
import { finished } from 'stream';
import { hostname } from 'os';

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
    mainView.renderBaseTemplate();
    infoView.renderInfoTemplate();

    //Start eventListning
    navEvent();

    // Render information content 
    infoView.renderInfo(state.info.results);

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
        infoView.renderInfoTemplate();
        infoView.renderInfo(state.info.results);
    }
    else if (el == 'rule') {
        ruleView.renderRule();
    }
    else {
        console.log('emptypage')
    }

};

