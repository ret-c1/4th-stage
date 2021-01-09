export const returnProStatus = (status) => {
    switch (status) {
        case 1:
            return '未启动';
        case 2:
            return '执行中';
        case 3:
            return '暂停中';
        case 4:
            return '已关闭';
        default:
            return '未启动';
    }
};
