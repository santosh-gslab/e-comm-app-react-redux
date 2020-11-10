import config from './config';
import axios from 'axios';

function getHt() {
    return document.documentElement.clientHeight;
}

function getWidth() {
    return document.documentElement.clientWidth;
}

function returnURL( api) {
    return `${config.baseURL}${config.apis[api]}`;
}

function returnRegex(type) {
    switch( type) {
        case 'name':
            return /\b([A-ZÀ-ÿa-z][-,a-z. ']+[ ]*)+/
        case 'email':
            return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        case 'phone':
            return /^[0-9]{10}$/
        case 'cardnumber':
            return /^[0-9]{16}$/
    }
}

function callAPI(api, type, success, err, data) {
    if(type=== 'get') {
        axios.get(`${returnURL(api)}${data?'/'+data:''}`)
        .then(function (response) {
            success(response);
        })
        .catch(function (error) {
            err(error);
        });
    }
    else {
        axios.get(returnURL(api), data)
        .then(function (response) {
            success(response);
        })
        .catch(function (error) {
            err(error);
        });
    }
}

export {getHt, getWidth, callAPI, returnRegex}
