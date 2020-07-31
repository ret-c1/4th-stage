import request from '@utils/request';

// 登录
export const login = (data) =>
    request('/ahopen/oa/cli-login', {
        body: JSON.stringify(data),
        cache: 'no-cache',
        credentials: 'include',
        headers: new Headers({
            'content-type': 'application/x-www-form-urlencoded',
            // 'Authorization': token, // eslint-disable-line
        }),
        method: 'POST',
    });

// 获取验证码
export const code = (data) =>
    request('/ahopen/def/phone-code', {
        body: JSON.stringify(data),
        cache: 'no-cache',
        credentials: 'include',
        headers: new Headers({
            'content-type': 'application/x-www-form-urlencoded',
            // 'Authorization': token, // eslint-disable-line
        }),
        method: 'POST',
    });

// 报名会议
export const signupMeeting = (data) =>
    request('/ahopen2/conference_dot', {
        body: JSON.stringify(data),
        cache: 'no-cache',
        credentials: 'include',
        headers: new Headers({
            'content-type': 'application/x-www-form-urlencoded',
            // 'Authorization': token, // eslint-disable-line
        }),
        method: 'POST',
    });

// 微信签名
export const wxSignature = (data) =>
    request('/ahopen/oa/we-signature', {
        body: JSON.stringify(data),
        cache: 'no-cache',
        credentials: 'include',
        headers: new Headers({
            'content-type': 'application/x-www-form-urlencoded',
            // 'Authorization': token, // eslint-disable-line
        }),
        method: 'POST',
    });

// 钉钉签名
export const ddSignature = () =>
    request('/ahopen2/conference_dot', {
        body: JSON.stringify(),
        cache: 'no-cache',
        credentials: 'include',
        headers: new Headers({
            'content-type': 'application/x-www-form-urlencoded',
            // 'Authorization': token, // eslint-disable-line
        }),
        method: 'POST',
    });

// 日程安排
export const meetingInfo = (token) =>
    request('/ahopen/oa/pub_meeting_list', {
        cache: 'no-cache',
        credentials: 'include',
        headers: new Headers({
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': token, // eslint-disable-line
        }),
        method: 'POST',
    });

// 精彩时刻列表
export const picList = (data) =>
    request('/ahopen/strongpic/list', {
        body: JSON.stringify(data),
        cache: 'no-cache',
        credentials: 'include',
        headers: new Headers({
            'content-type': 'application/x-www-form-urlencoded',
            // 'Authorization': token, // eslint-disable-line
        }),
        method: 'POST',
    });

// 精彩时刻详情
export const picInfo = (data) =>
    request('/ahopen/strongpic/info', {
        body: JSON.stringify(data),
        cache: 'no-cache',
        credentials: 'include',
        headers: new Headers({
            'content-type': 'application/x-www-form-urlencoded',
            // 'Authorization': token, // eslint-disable-line
        }),
        method: 'POST',
    });

// 获取访客信息
export const userInfo = (data, token, type) =>
    request(`/ahopen/oa/visitor_info?t=${type}`, {
        body: JSON.stringify(data),
        cache: 'no-cache',
        credentials: 'include',
        headers: new Headers({
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': token, // eslint-disable-line
        }),
        method: 'POST',
    });

// 工作人员给访客签到
export const meetsign = (data, token) =>
    request('/ahopen/oa/meeting_sign', {
        body: JSON.stringify(data),
        cache: 'no-cache',
        credentials: 'include',
        headers: new Headers({
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': token, // eslint-disable-line
        }),
        method: 'POST',
    });

// 专家嘉宾列表
export const guestList = (data) =>
    request('/ahopen/guest/list', {
        body: JSON.stringify(data),
        cache: 'no-cache',
        credentials: 'include',
        headers: new Headers({
            'content-type': 'application/x-www-form-urlencoded',
            // 'Authorization': token, // eslint-disable-line
        }),
        method: 'POST',
    });

// 首页直播视频
export const firstVideo = () =>
    request('/ahopen/videolive/info', {
        // body: JSON.stringify(data),
        cache: 'no-cache',
        credentials: 'include',
        headers: new Headers({
            'content-type': 'application/x-www-form-urlencoded',
            // 'Authorization': token, // eslint-disable-line
        }),
        method: 'POST',
    });

// 新闻视频列表
export const newsVideoList = () =>
    request('/ahopen/video/list', {
        body: JSON.stringify({
            page: 1,
            items: 9999999,
        }),
        cache: 'no-cache',
        credentials: 'include',
        headers: new Headers({
            'content-type': 'application/x-www-form-urlencoded',
            // 'Authorization': token, // eslint-disable-line
        }),
        method: 'POST',
    });

// 新闻列表
export const newsList = () =>
    request('/ahopen/news/list', {
        body: JSON.stringify({
            page: 1,
            items: 9999999,
        }),
        cache: 'no-cache',
        credentials: 'include',
        headers: new Headers({
            'content-type': 'application/x-www-form-urlencoded',
            // 'Authorization': token, // eslint-disable-line
        }),
        method: 'POST',
    });

// 新闻详情
export const newsDetail = (data) =>
    request('/ahopen/news/info', {
        body: JSON.stringify(data),
        cache: 'no-cache',
        credentials: 'include',
        headers: new Headers({
            'content-type': 'application/x-www-form-urlencoded',
            // 'Authorization': token, // eslint-disable-line
        }),
        method: 'POST',
    });

// 新闻视频详情
export const newsVideoDetail = (data) =>
    request('/ahopen/video/info', {
        body: JSON.stringify(data),
        cache: 'no-cache',
        credentials: 'include',
        headers: new Headers({
            'content-type': 'application/x-www-form-urlencoded',
            // 'Authorization': token, // eslint-disable-line
        }),
        method: 'POST',
    });

// 新闻点赞
export const newsLike = (data) =>
    request('/ahopen/news/like', {
        body: JSON.stringify(data),
        cache: 'no-cache',
        credentials: 'include',
        headers: new Headers({
            'content-type': 'application/x-www-form-urlencoded',
            // 'Authorization': token, // eslint-disable-line
        }),
        method: 'POST',
    });

// 日程收藏
export const schedualLike = (data, token) =>
    request('/ahopen/oa/meeting/deep', {
        body: JSON.stringify(data),
        cache: 'no-cache',
        credentials: 'include',
        headers: new Headers({
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': token, // eslint-disable-line
        }),
        method: 'POST',
    });

// 关注列表
export const followList = (data, token) =>
    request('/ahopen/oa/meeting/deep_list', {
        body: JSON.stringify(data),
        cache: 'no-cache',
        credentials: 'include',
        headers: new Headers({
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': token, // eslint-disable-line
        }),
        method: 'POST',
    });

// 取消关注
export const schedualNOTLike = (data, token) =>
    request('/ahopen/oa/meeting/undeep', {
        body: JSON.stringify(data),
        cache: 'no-cache',
        credentials: 'include',
        headers: new Headers({
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': token, // eslint-disable-line
        }),
        method: 'POST',
    });

// vip服务信息
export const vipInfo = (data, token) =>
    request('/ahopen/oa/pub_hotel_list', {
        body: JSON.stringify(data),
        cache: 'no-cache',
        credentials: 'include',
        headers: new Headers({
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': token, // eslint-disable-line
        }),
        method: 'POST',
    });

// 获取酒店列表
export const hotelList = (data, token) =>
    request('/ahopen/oa/pub_hotel_All', {
        body: JSON.stringify(data),
        cache: 'no-cache',
        credentials: 'include',
        headers: new Headers({
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': token, // eslint-disable-line
        }),
        method: 'POST',
    });
