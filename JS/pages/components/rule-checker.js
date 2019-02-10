'use strict';

export default class RuleChecker {
    constructor({
        element
    }) {
        this._element = element;
        this._render()
    }

    _render() {
        this._element.innerHTML = `
        <h1 class="mb-4">Rule Checker</h1>
        <form action="http://127.0.0.1:5000/rule_checker">
            <div class="form-row">
                <div class="form-group col-md-4">
                    {{ form.source.label }}{{ form.source (class="form-control form-control-lg")}}
                </div>
                <div class="form-group col-md-2">
                    {{ form.src_port.label }}{{ form.src_port (class="form-control form-control-lg")}}
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-4">
                    {{ form.destination.label }}{{ form.destination (class="form-control form-control-lg")}}
                </div>
                <div class="form-group col-md-2">
                    {{ form.dst_port.label }}{{ form.dst_port (class="form-control form-control-lg")}}
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-4">
                    {{ form.interface.label}}{{form.interface (class="form-control form-control-lg")}}
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-4">
                    {{ form.ipprotocol.label }}{{ form.ipprotocol (class="form-control form-control-lg")}}
                </div>
            </div>
            <input class="btn btn-primary btn-lg col-md-2" type="submit" value="check">
        </form>
        `;
    }
}