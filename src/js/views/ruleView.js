export const renderRule = () => {
    const markup = `
        <h2 class="mb-3">Rule Checker</h2>

        <div class="card rounded" >
            <div class="card-body" id="gen-info">
                <form>
                    <div class="form-row mb-3">
                        <div class="col-8">
                            <label for="sourceaddress">Source Address</label>
                            <input 
                            type="text" 
                            class="form-control"
                            id="sourceaddress"  
                            placeholder="Source address">
                        </div>
        
                        <div class="col">
                            <label for="sourceport">Source Port</label>
                            <input 
                            type="text" 
                            class="form-control" 
                            id="sourceport"  
                            placeholder="Source Port">
                        </div>
                    </div>
                    <div class="form-row mb-3">
                        <div class="col-8">
                            <label for="destinationaddress">Destination Address</label>
                            <input 
                            type="text" 
                            class="form-control" 
                            id="destinationaddress" 
                            placeholder="Destination address">
                        </div>
        
                        <div class="col">
                            <label for="destinationport">Destination Port</label>
                            <input 
                            type="text" 
                            class="form-control" 
                            id="exampleInputEmail1" 
                            aria-describedby="emailHelp" 
                            placeholder="Destination Port">
                        </div>
                    </div>
        
                    <div class="form-row mb-3">
                        <div class="col-4">
                            <label for="Protocol">Protocol</label>
                            <select 
                            class="form-control" 
                            id="protocol">
                                <option>any</option>
                                <option>TCP</option>
                                <option>UDP</option>
                            </select>
                        </div>
        
                        <div class="col-4">
                            <label for="Incoming interface">Incoming interface</label>
                            <select 
                            class="form-control" 
                            id="incoming_interface">
                                <option>LAN</option>
                                <option>WAN</option>
                            </select>
                        </div>
                    </div>
        
                    <input class="btn btn-primary btn col-md-3 float-right" type="submit" value="Check rule">
                </form>
            </div>
        </div>


    `;
    document.getElementById('content').insertAdjacentHTML('beforeend', markup);
   }