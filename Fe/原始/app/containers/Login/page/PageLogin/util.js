import { DDLogin } from '@utils/ddLogin';
import request from '@utils/request';
import PubMessage from '@components/PubMessage';

const appid = 'dingoatwwrmzrvvig9kxlw';
const appsecret = 'l8YoaESMBd1x1E7j5NlT1PkiUdce-5b2a-tcs0HKFsafLNT9P7PxhPhCivC0-Qor';

export const initScanLogin = (id) => {
    const redirectUri = 'https://x.com/login';
    const uri = `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${appid}&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=${redirectUri}`;

    DDLogin({
        id,
        goto: encodeURIComponent(uri),
        style: '',
        href: '',
        width: '380px',
        height: '380px',
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

/**
 * access_token
 */
export const getAccessToken = (loginTmpCode) => {
    request(`/sns/gettoken?appid=${appid}&appsecret=${appsecret}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    })
        .then((res) => {
            if (res.errcode === 0 && res.errmsg === 'ok' && res) {
                getForerver(res.access_token, loginTmpCode);
            } else {
                PubMessage('error', '登录失败,请重新扫码登录!');
            }
        })
        .catch(() => {
            PubMessage('error', '登录失败,请重新扫码登录!');
        });
};

/**
 * 获取当前钉钉用户的持久授权码
 */
export const getForerver = (accessToken, loginTmpCode) => {
    request(`/sns/get_persistent_code?access_token=${accessToken}`, {
        method: 'POST',
        body: JSON.stringify({ tmp_auth_code: loginTmpCode }),
        headers: {
            'content-type': 'application/json',
        },
    })
        .then((res) => {
            if (res.errcode === 0 && res.errmsg === 'ok' && res) {
                getSnsToken(accessToken, res);
            } else {
                PubMessage('error', '登录失败,请重新扫码登录!');
            }
        })
        .catch(() => {
            PubMessage('error', '登录失败,请重新扫码登录!');
        });
};

/*
 *  获取 "sns_token"
 */
export const getSnsToken = (accessToken, forverResp) => {
    request(`/sns/get_sns_token?access_token=${accessToken}`, {
        method: 'POST',
        body: JSON.stringify({
            openid: forverResp.openid,
            persistent_code: forverResp.persistent_code,
        }),
        headers: {
            'content-type': 'application/json',
        },
    })
        .then((res) => {
            if (res.errcode === 0 && res.errmsg === 'ok' && res) {
                getUnionid(res.sns_token);
            } else {
                PubMessage('error', '登录失败,请重新扫码登录!');
            }
        })
        .catch(() => {
            PubMessage('error', '登录失败,请重新扫码登录!');
        });
};

/*
 * unionid
 */
export const getUnionid = (snsToken) => {
    request(`/sns/getuserinfo?sns_token=${snsToken}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    })
        .then((res) => {
            getToken(res.user_info.unionid);
        })
        .catch(() => {
            PubMessage('error', '登录失败,请重新扫码登录!');
        });
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
