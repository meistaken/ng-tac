export const layout = () => {
    const markup = `
<div id="uploadJson" class="col-lg-6 mx-auto mt-5">
      <div class="col text-center">
          <h1 class="display-3">ngtac helper</h1>
          <p class="mt-2">Check information about your configuration and seach rules by parameters</p>
          <label class="btn btn-lg btn-primary mb-0 mr-2">
              Upload JSON <input id="fileUpload" type="file" hidden accept="application/json" />
          </label>
          <button id="startApp" type="button" class="btn btn-lg  btn-outline-primary" >Demo file</button>
      </div>
    </div>   
     `;
    document.body.insertAdjacentHTML('beforeend', markup);
}