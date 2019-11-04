import { elements } from './base';

export const renderRule = () => {
    const markup = `
    <div class="card-body">
        <h1 class="mb-4">Rule Checker</h1>
        <form action="test">

            <div class="form-row mb-3">

                <div class="col">
                    <label for="sourceaddress">Source Address</label>
                    <input type="text" class="form-control" id="sourceaddress"  placeholder="Source address">
                </div>

                <div class="col">
                    <label for="Destination Address">Destination Address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Destination address"">
                </div>
            </div>

            <div class="form-row mb-3">
                <div class="col">
                    <label for="sourceaddress">Source Port</label>
                    <input type="text" class="form-control" id="sourceaddress"  placeholder="Source Port">
                </div>

                <div class="col">
                    <label for="Destination Address">Destination Port</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Destination Port">
                </div>
            </div>

            <div class="form-row mb-3">
                <div class="col">
                    <label for="exampleFormControlSelect1">Example select</label>
                        <select class="form-control" id="exampleFormControlSelect1">
                            <option>any</option>
                            <option>TCP</option>
                            <option>UDP</option>
                        </select>
                </div>

                <div class="col">
                <label for="exampleFormControlSelect1">Example select</label>
                    <select class="form-control" id="exampleFormControlSelect1">
                        <option>LAN</option>
                        <option>WAN</option>
                    </select>
            </div>
            </div>

            <input class="btn btn-primary btn-lg col-md-3" type="submit" value="check">
        </form>
    </div>
    `;
    document.getElementById('content').insertAdjacentHTML('beforeend', markup);
   }