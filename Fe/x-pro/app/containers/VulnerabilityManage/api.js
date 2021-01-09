import request from '@utils/request';

// TI 恶意IP基本信息
export const getIpBase = (formdata) =>
    request('/api/threat/ti/evil/ip/base', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
