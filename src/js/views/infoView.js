import {elements} from './base';

// Создание готового массива данных путем фильтрации JSON
const generalInfo = info => {

    // Набор ключей для вывода
    const keys = ['hostname', 'domain', 'timezone', 'dnsserver'];

    // Преобразование объекта в массив для использования filter
    const res = Object.entries(info.system);

    let arr = res.filter(el => {
        for (let i = 0; i < keys.length; i++) {
            if (el[0].indexOf(keys[i]) != -1) {
                return true;
            }
        }
        return false;
    });
    return arr;
}


const interFaceInfo = info => {
    const res = Object.entries(info.interfaces);

    let arr = res.filter(el => {
        for (let i = 0; i < res.length; i++) {
            if (el[0] != -1) {
                return true;
            }
        }
        return false;
    });
    return arr;
}


const renderInfoBlock = info => {
    let result = generalInfo(info);
    result.forEach(print);

    function print(result) {
        const markup = `
        <div class="results__data">
                 <h4 class="results__name">${result[0]}</h4>
                 <p class="results__value">${result[1]}</p>
        </div>
        `;
        document.getElementById('gen-info').insertAdjacentHTML('beforeend', markup);
    }
}


const renderInterBlock = info => {
    let result = interFaceInfo(info);
    result.forEach(print);

    function print(result) {
        const markup = `
            <div class="results__data">
                     <h4 class="results__name">${result[0]}</h4>
                     <p class="results__value">${JSON.stringify(result[1])}</p>
            </div>
            `;
        document.getElementById('inf-info').insertAdjacentHTML('beforeend', markup);
    }
}


export const renderInfoTemplate = () => {
    const markup = `
    <div class="card-body" id="gen-info">
        <h2>General info</h2>
    </div>
    <div class="card-body" id="inf-info">
        <h2>Interface info</h2>
    </div>
    `;
    document.getElementById('content').insertAdjacentHTML('beforeend', markup);
}


export const renderInfo = info => {
    renderInfoBlock(info)
    renderInterBlock(info)
}