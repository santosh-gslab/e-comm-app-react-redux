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
        case 'email':
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
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
