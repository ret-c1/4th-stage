export function getAuthority() {
    return sessionStorage.getItem('react-template-authority') || 'admin';
}

export function setAuthority(authority) {
    return sessionStorage.setItem('react-template-authority', authority);
}

export function setBottom(value) {
    return sessionStorage.setItem('bottom', value);
}

export const routeStage = () => {
    const uri = window.location.href.split('#')[1];
    if (/checkin/.test(uri)) {
        return 0;
    }
    if (/use/.test(uri)) {
        return 2;
    }
    return 1;
};

export function getBottom() {
    const stage = routeStage();
    const flag = sessionStorage.getItem('bottom');
    return flag === null ? stage : Number(flag);
}

export function getSchedule() {
    return JSON.parse(sessionStorage.getItem('schedule')) || null;
}

export function setSchedule(schedule) {
    return sessionStorage.setItem('schedule', JSON.stringify(schedule));
}

export function threeDays() {
    // 这里是设置3天过期
    // 可以根据需求定义
    const ms = 3 * 24 * 60 * 60 * 1000;
    return ms;
}

export function today() {
    // 获取当前时间
    const ms = new Date().getTime();
    return ms;
}

export function getToken() {
    // 通过时间判断token是否过期
    // token的存储时间超过3天就表示过期
    const bToday = today();
    const expire = threeDays();
    const oToken = localStorage.getItem('token');
    if (!/timestamp/.test(oToken)) {
        // 这里是为了清除以前的状态
        localStorage.clear();
        return null;
    }
    const token = JSON.parse(oToken);
    if (token === null) {
        return null;
    }
    // 存储时间
    const time = token.timestamp;
    if (bToday - time > expire) {
        // 登录超时
        // localStorage.removeItem('token');
        // 这因存储数据问题，特殊处理了
        localStorage.clear();
        return null;
    }
    return token.value;
}

export function setToken(token) {
    // 给token加上过期时间
    const time = today();
    const object = {
        value: token,
        timestamp: time,
    };
    return localStorage.setItem('token', JSON.stringify(object));
}

export function getRole() {
    return localStorage.getItem('role') || 'no';
}

export function setRole(role) {
    return localStorage.setItem('role', role);
}

export function getUserId() {
    return localStorage.getItem('userid') || null;
}

export function setUserId(userid) {
    return localStorage.setItem('userid', userid);
}

// 会议签到类型
export function getSignType() {
    return parseInt(sessionStorage.getItem('signType'), 10) || 0;
}

export function setSignType(signType) {
    return sessionStorage.setItem('signType', signType);
}

export function getCodeString() {
    return localStorage.getItem('codeString') || '';
}

export function setCodeString(codeString) {
    return localStorage.setItem('codeString', codeString);
}

export function getHotelId() {
    return localStorage.getItem('hotelId') || null;
}

export function setHotelId(hotelId) {
    return localStorage.setItem('hotelId', hotelId);
}
