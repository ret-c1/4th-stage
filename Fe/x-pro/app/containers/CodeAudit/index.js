// import CryptoJs from 'crypto-js';
// import { Base64 } from 'js-base64';
import CodeAuditList from './page/CodeAuditList/Loadable';
import LoopholeDetail from './page/LoopholeDetail/Loadable';
// import { login } from './api';

// 加密
// const encrypt = (word) => {
//     const keyStr = 'efgabcd12abcdefg';
//     const key = CryptoJs.enc.Utf8.parse(keyStr);
//     const passWord = CryptoJs.enc.Utf8.parse(word);
//     const encrypted = CryptoJs.AES.encrypt(passWord, key, {
//         mode: CryptoJs.mode.ECB,
//         padding: CryptoJs.pad.Pkcs7,
//     });
//     return encrypted.toString();
// };

// 获取 DevSocOps token
// (() => {
//     const data = {
//         domainAccount: 'Ddaping',
//         password: 'DdapingDdaping2',
//     };
//     const password = encrypt(data.password);
//     const newPassweord = Base64.encode(password);
//     data.password = newPassweord;
//     login(data).then((res) => {
//         sessionStorage.setItem('DevSocOps', res.message.token);
//     });
// })();

// 只有项目经理有权限
export const codeAuditRouter = {
    path: '/codeaudit',
    exact: true,
    component: CodeAuditList,
    title: '代码审计',
    key: 'codeReview',
    children: [
        {
            path: '/codeaudit/list',
            exact: true,
            component: CodeAuditList,
            title: '审计列表',
            isShow: true,
            children: [],
        },
        {
            path: '/codeaudit/loophole',
            exact: true,
            component: LoopholeDetail,
            title: '漏洞详情',
            isShow: false,
            children: [],
        },
    ],
};
