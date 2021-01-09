export const renderContrackType = (type) => {
    let state = null;
    switch (type) {
        case '1':
            state = '合同';
            break;
        case '2':
            state = '非合同';
            break;
        case '3':
            state = '提前实施';
            break;
        case '4':
            state = '合同外支持';
            break;
        case '5':
            state = '战略支持';
            break;
        case '6':
            state = '日常工作';
            break;
        case '7':
            state = '其他';
            break;
        default:
            state = '其他';
            break;
    }
    return state;
};
