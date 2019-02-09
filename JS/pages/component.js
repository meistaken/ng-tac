export default class Component {
    constructor({element}) {
        this._element = element;
        this._callbackMap = {};
    }

    subscribe(eventName, callback) {
        let eventCallbacks = this._element[eventName] || [];

        eventCallbacks.push(callback);

        this._callbackMap[eventName] = eventCallbacks;
    }

    emit(eventName, data) {
        let eventCallbacks = this._callbackMap[eventName] || [];

        eventCallbacks.forEach(callback => {
            callback(data);
        });
    }

    hide() {
        this._element.hidden = true;
    }
    show() {
        this._element.hidden = false;
    }
}