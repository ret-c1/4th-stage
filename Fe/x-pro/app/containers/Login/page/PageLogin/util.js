import { DDLogin } from '@utils/ddLogin';
import request from '@utils/request';

// const appid = 'dingoatwwrmzrvvig9kxlw';

export const initScanLogin = (id, appid, redirectUri) => {
    const uri = `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${appid}&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=${redirectUri}`;

    DDLogin({
        id,
        goto: encodeURIComponent(uri),
        style: '',
        href: '',
        width: '400',
        height: '400',
    });

    const hanndleMessage = (event) => {
        const { data, origin } = event;

        if (origin === 'https://login.dingtalk.com') {
            // 判断是否来自ddLogin扫码事件。
            const url = `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${appid}&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=${redirectUri}&loginTmpCode=${data}`;
            window.location.href = url;
        }
    };

    if (typeof window.addEventListener !== 'undefined') {
        window.addEventListener('message', hanndleMessage, false);
    } else if (typeof window.attachEvent !== 'undefined') {
        window.attachEvent('onmessage', hanndleMessage);
    }
};

/*
 * token
 */
export const getToken = (unionid) =>
    request(`/api/dingLogin`, {
        method: 'POST',
        body: JSON.stringify({
            code: unionid,
        }),
        headers: {
            'content-type': 'application/json',
        },
    });
