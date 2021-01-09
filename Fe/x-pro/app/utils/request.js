import { message } from 'antd';
import { authAction } from '@utils/authority';
// eslint-disable-next-line import/no-cycle
import { doLogout } from '@utils/userService';

/**
 * Checks if a network request came back fine, and throws an error if not
 * A response from a network request
 * @param  {object} response
 * Returns either the response, or throws an error
 * @return {object|undefined}
 */

// const checkStatus = (response) => {
//     if (response.status >= 200 && response.status < 300) {
//         return response;
//     }
//     const error = new Error(response.statusText);
//     error.response = response;
//     throw error;
// };

/**
 * Parses the JSON returned by a network request
 * A response from a network request
 * @param  {object} response
 * The parsed JSON from the request
 * @return {object}
 */

const parseJSON = (response) => {
    if (response.status === 403 && /\/intelligence\//.test(window.location.href)) {
        message.error('文本框中代码已被拦截，请在下方模块"验证工具文档”上传文件', 5);
    }
    return response.json();
};

// 统一判断登录状态
// 如果未登录将跳转登录页
let ckCount = 0;
const checkAuth = (response) => {
    if (response.code === 1000 && response.message === '尚未登录!') {
        if (ckCount > 0) return null;
        ckCount += 1;
        if (!/login|register|forget/.test(window.location.href)) {
            message.warning('登录已过期,将重新登录...', 2, () => {
                doLogout();
                ckCount = 0;
            });
        }
        return null;
    }
    return response;
};

const setOption = (options) => {
    const exception = ['/login', '/register'];
    const isAddJwt = exception.indexOf(window.location.pathname);
    const setHeader = () => {
        if (Object.prototype.hasOwnProperty.call(options, 'headers')) {
            Object.assign(options.headers, { AUTHENTICATION: authAction.get() });
        } else {
            Object.assign(options, { headers: { AUTHENTICATION: authAction.get() } });
        }
        return options;
    };
    return isAddJwt > -1 ? options : setHeader();
};
/**
 * Requests a URL, returning a promise
 * The URL we want to request
 * @param  {string} url
 * The options we want to pass to "fetch"
 * @param  {object} [options]
 * The response data
 * @return {object}
 */

const request = (url, options) => fetch(url, setOption(options)).then(parseJSON).then(checkAuth);

export default request;
