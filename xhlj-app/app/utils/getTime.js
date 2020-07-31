export const getTime = (time) => `${time.slice(11, 16)}`;

export const getMonthTime = (time) =>
    `${time.slice(5, 7)}.${time.slice(8, 10)} ${time.slice(11, 16)}`;

export const getDateTime = (time) => {
    // 比如需要这样的格式 yyyy-MM-dd hh:mm:ss
    const date = new Date(time / 1000000);
    const Y = date.getFullYear();
    const M = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const D = date.getDate();
    const h = date.getHours();
    const m = date.getMinutes();
    return `${Y}-${M}-${D} ${h}:${m}`;
};
