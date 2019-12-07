import {elements} from './views/base';

import testData from './data/config.json';
import * as mainView from './views/mainView';
import * as ruleView from './views/ruleView';
import * as startPage from './views/startPage'
/** TODO List
 * 1. Upload XML config + convert to JSON
 * 2. Search in incomplete request in destination or source fields
 * 3. Need to test search
 * 4. Refactor code
 * 5. Upload data validation
 * 6 Fix search alg
 * 7. Reset evlisteners
 */

const state = {};

const generatePage = event => {
    if (event) {
        handleUpload(event)
            .then(response => {
                state.info = response;

                // Prepare UI
                mainView.clearButton();

                // Render main layout template
                mainView.renderTemplate();

                // Render start page template
                mainView.renderInfoTemplate();

                // Render information content 
                mainView.renderInfo(state.info);

                //Start eventListning
                handleNav();
            });
    } else {
        // Get testData from JSON
        state.info = testData;

        // Prepare UI
        mainView.clearButton();

        // Render main layout template
        mainView.renderTemplate();

        // Render start page template
        mainView.renderInfoTemplate();

        // Render information content 
        mainView.renderInfo(testData);

        //Start eventListning
        handleNav();
    }
}


//Use demo testData
elements.demoButton.addEventListener('click', e => {
    e.preventDefault();
    generatePage();
});


//Import testData from file
elements.uploadInput.addEventListener('input', e => {
    e.preventDefault();
    generatePage(e);
});


const readUploadedFileAsText = (inputFile) => {
    const tempFR = new FileReader();

    return new Promise((resolve, reject) => {
        tempFR.onerror = () => {
            tempFR.abort();
            reject(new DOMException("Problem parsing input file."));
        };

        tempFR.onload = () => {
            resolve(tempFR.result);
        };
        tempFR.readAsText(inputFile);
    });
};


const handleUpload = async (event) => {
    const file = event.target.files[0];
    try {
        const fileContents = await readUploadedFileAsText(file)
        return JSON.parse(fileContents)
    } catch (e) {
        console.warn(e.message)
    }
};


// Add eventListeners for navigation
const handleNav = () => {
    document.querySelector('.navbar').addEventListener('click', e => {
        e.preventDefault();
        pagecontroller(event.target.id);
    });
};


//Switch screens
const pagecontroller = page => {

    // Prepare UI
    mainView.clearContent()

    //Show page
    if (page == 'info') {
        mainView.renderInfoTemplate();
        mainView.renderInfo(state.info);

    } else if (page == 'rule') {
        ruleView.renderRule()
        // Search only in «filter» object
        ruleView.handleFormSubmit(state.info.filter);
        
    } else if (page == 'new') {
        renderModal()

    } else if (page == 'start') {
        mainView.clearAll()
        startPage.layout()
    }
};
const renderModal = () => {
    const markup = `
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Upload new JSON-configuration</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            <label class="btn btn-lg btn-primary mb-0 mr-2">
            Upload JSON <input id="fileUpload" type="file" hidden accept="application/json" />
        </label>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Upload</button>
        </div>
      </div>
    </div>
  </div>
 `;
 document.body.insertAdjacentHTML('beforeend', markup);
}
