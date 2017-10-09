import axios from 'axios';
import qs from 'qs';
// import config from '../config';

const postInstance = axios.create({
    timeout: 60000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },

    transformResponse: [function (resp) {
        resp = JSON.parse(resp);
        resp.result = resp.data;
        resp.code = resp.success ? 200 : resp.code;
        return resp;
    }]
});

const authInstance = axios.create({
    timeout: 60000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformResponse: [function (data) {
        return JSON.parse(data);
    }]
});
// 特殊的请求方式
const JSONInstance = axios.create({
    timeout: 60000,
    headers: {
        'Content-Type': 'application/json'
    },
    transformResponse: [function (resp) {
        resp = JSON.parse(resp);
        resp.result = resp.data;
        resp.code = resp.success ? 200 : resp.code;
        return resp;
    }]
});



export function fetchMock(url) {
    return JSONInstance.get(url);
}

// export function JSONPost(url, params) {
//     const accessToken = {
//         access_token: config.User.getAccessToken()
//     };
//     const postParams = params ? Object.assign(params, accessToken) : accessToken;
//     return JSONInstance.post(url, JSON.stringify(postParams));
// }
// export function get(url) {
//     if (url.includes('?')) {
//         url += `&access_token=${config.User.getAccessToken()}`;
//     } else {
//         url += `?access_token=${config.User.getAccessToken()}`;
//     }
//     return JSONInstance.get(url);
// }
// export function post(url, params) {
//     const accessToken = {
//         access_token: config.User.getAccessToken()
//     };
//     const postParams = params ? Object.assign(params, accessToken) : accessToken;
//     return postInstance.post(url, qs.stringify(postParams, { indices: false }));
// }