import CryptoJS from 'crypto-js';

const enCryptoJS = (data) => {
    const key = CryptoJS.enc.Latin1.parse('x@anheng2018');
    const iv = CryptoJS.enc.Latin1.parse('x@anheng2018');
    return CryptoJS.AES.encrypt(data, key, {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding,
    }).toString();
};

export default enCryptoJS;
