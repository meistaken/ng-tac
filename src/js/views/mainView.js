import { elements } from './base';

export const clearButton = () => {
    elements.startButtonLocation.parentNode.removeChild(elements.startButtonLocation);
}

export const renderBaseTemplate = () => {
 
 const markup = `
 <div class="wrapper">

    <nav id="sidebar">

        <div data-component="nav">
        
                <div class="card-body">
                <h5>Support assistant</h5>
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

    </div>
</div>
 `;
 elements.pageMarkup.insertAdjacentHTML('beforeend', markup);
}

export const clearContent = () => {
    document.getElementById('content').innerHTML = '';
}

