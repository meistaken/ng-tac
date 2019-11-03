import { elements } from './base';

export const clearButton = () => {
    elements.startButtonLocation.parentNode.removeChild(elements.startButtonLocation);
}

export const renderMarkup = info => {
 const markup = `
 <div class="wrapper">

    <nav id="sidebar">
        <div data-component="nav">
                <div class="card-body">
                <h4>Support assistant</h4>
                <ul class="nav flex-column">

                    <li class="nav-item"
                    data-element="page"
                    >
                        <a class="nav-link active" href="#" id="info">Information</a>
                    </li>

                    <li class="nav-item"
                    data-element="page"
                    >                    
                        <a class="nav-link" href="#" id="rule">Rule checker</a>
                    </li>


                    <li class="nav-item"
                    data-element="page"
                    >
                        <a class="nav-link" href="#" id="new">Add new file</a>
                    </li>

                </ul>
            </div>
        </div>
    </nav>

    <div id="content">
        <div class="card-body">   
        ${JSON.stringify(info.system)}
        </div>
    </div>
</div>
 `;
 elements.pageMarkup.insertAdjacentHTML('beforeend', markup);
}
