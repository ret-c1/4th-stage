import request from '@utils/request';

// 有效事件IP数统计
export const queryEffectEventIps = (formdata) =>
    request('/api/hw/statistics/emergencyResp/effectEventIps', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 目的Ip
export const queryIpInfo = (formdata) =>
    request('/api/hw/statistics/emergencyResp/ipInfos', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 响应事件升级
export const queryTrackProgress = (formdata) =>
    request('/api/hw/statistics/emergencyResp/upgradeInfos', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

export const queryNewestEventInfos = (formdata) =>
    request('/api/hw/statistics/emergencyResp/newestEventInfos', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 应急 - 总览 - 各模块数量
export const queryTrackOverview = (formdata) =>
    request('/api/hw/statistics/emergencyResp/trackProgress', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
