// eslint-disable-next-line import/no-cycle
import { logout } from '@layouts/Main/api';
import { authAction } from './authority';
import history from './history';

// 读取环境变量
// 如果是开发环境读取的是http://192.168.19.252 否则是测试环境
const isDev = process.env.NODE_ENV;
const origin = isDev === 'development' ? 'http://192.168.19.252' : 'http://10.20.156.58';
let mainKeycloak = '';
export const initKeycloak = (onCallback) => {
    if (window && window.xIntegrated) {
        window
            .xIntegrated(origin, true)
            .then((keycloak) => {
                mainKeycloak = keycloak;
                authAction.set(keycloak.token);
                if (window.location.pathname.includes('x-login')) {
                    const m = window.location.pathname.split('/');
                    history.replace(`/${m.slice(1, m.length - 1).join('/')}`);
                }
                onCallback();
            })
            .catch((keycloak) => {
                mainKeycloak = keycloak;
                doLogout();
            });
    }
};
export const getUsername = () => {
    if (mainKeycloak.tokenParsed) {
        return mainKeycloak.tokenParsed.preferred_username;
    }
    return null;
};

export const doLogout = () => {
    authAction.remove();
    if (mainKeycloak) {
        mainKeycloak.logout();
    } else {
        logout().then((res) => {
            if (res.code === 200) {
                history.replace('/login');
            }
        });
    }
};
