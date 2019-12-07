import {elements} from './views/base';

import testData from './data/config.json';
import * as mainView from './views/mainView';
import * as ruleView from './views/ruleView';

/** TODO List
 * 1. Upload XML config + convert to JSON
 * 2. Search in incomplete request in destination or source fields
 * 3. Need to test search
 * 4. Refactor code
— добавить проверки на корректность загруженного конфига, поставить ограничение на размер загрузки, просто проверить наличие ключей определенных
— *пофиксить немного алгоритм поиска
— добавить модал для загрузки нового конфига
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
elements.uploadButton.addEventListener('input', e => {
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
    document.querySelector('.navbar-nav').addEventListener('click', e => {
        e.preventDefault();
        pagecontroller(event.target.id);
    });
};


//Switch screens
const pagecontroller = page => {

    // Prepare UI
    mainView.clearContent();

    //Show page
    if (page == 'info') {
        mainView.renderInfoTemplate();
        mainView.renderInfo(state.info);
    } else if (page == 'rule') {
        ruleView.renderRule();

        // Search only in «filter» object
        ruleView.handleFormSubmit(state.info.filter);
    } else {
        alert('under-constuction')
    }
};