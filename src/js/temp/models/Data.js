import data from '../data/config.json';

export default class Info {
    constructor(){
    }

    async getResults() {
        try {
            this.results = data;
        } catch (error) {
            alert(error);
        }
    }
}

