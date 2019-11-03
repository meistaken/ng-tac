import Info from './models/Info';
import * as mainView from './views/mainView';
import * as infoView from './views/infoView';
import * as ruleView from './views/ruleView';

import { elements } from './views/base';

/** Global state
 * - StartApp (later Upload JSON page )
 * - Current page
 * - Search rule
 * - Current rule
 */

const state = {};


const generatePage = async() => {

    // 1) Get data from JSON
    state.info = new Info();

    // 3) Prepare UI
    mainView.clearButton();

    // 4) Info from UI
    await state.info.getResults();

    // 5) Render UI
    mainView.renderMarkup(state.info.results);

    //Start eventListning
    navEvent();

    //TEMP
    console.log(state.info.results);
}

//Generate main layout after load JSON
elements.startButton.addEventListener('click', e => {
   e.preventDefault();
   generatePage();
});




// Nav eventListeners
const navEvent = () => {
    document.querySelector('.nav').addEventListener('click', e => {
        e.preventDefault();
        pagecontroller(event.target.id);
     });
}

const pagecontroller = (el) => {
    // Prepare UI
    clearContent();

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

const clearContent = () => {
    document.getElementById('content').innerHTML = '';
}