import data from '../data/config.json';

export default class Info {
    constructor(query){
        this.query = query;
    }

    async getResults() {
        try {
            this.results = data;
        } catch (error) {
            alert(error);
        }
    }
}
