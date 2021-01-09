// const moment = require('moment');
export const TYPE_INPUT = 'TYPE_INPUT'; // 文本框
export const TYPE_TEXTAREA = 'TYPE_TEXTAREA'; // 多行文本框
export const TYPE_SELECT = 'TYPE_SELECT'; // 下拉
export const TYPE_MULTIPLE_SELECT = 'TYPE_MULTIPLE_SELECT'; // 下拉多选
export const TYPE_SEARCH_SELECT = 'TYPE_SEARCH_SELECT'; // 下拉搜索框
// export const TYPE_CHECKBOX = 'TYPE_CHECKBOX'; // 复选框
export const TYPE_CHECKBOX_GROUP = 'TYPE_CHECKBOX_GROUP'; // 复选框组
export const TYPE_RADIO = 'TYPE_RADIO'; // 单选诓
export const TYPE_DATEPICKER = 'TYPE_DATEPICKER'; // 日期控件
export const TYPE_DATEPICKERTIME = 'TYPE_DATEPICKERTIME'; // 日期时间控件
export const TYPE_RANGEPICKER = 'TYPE_RANGEPICKER'; // 日期范围控件

export const renderFromData = (formList) => {
    const data = {};
    formList.forEach((item) => {
        switch (item.type) {
            case TYPE_INPUT: // 文本框
                data[item.name] = '';
                break;
            case TYPE_TEXTAREA: // 多行文本框
                data[item.name] = '';
                break;
            case TYPE_SELECT: // 下拉
                data[item.name] = '';
                break;
            case TYPE_MULTIPLE_SELECT: // 下拉多选
                data[item.name] = [];
                break;
            case TYPE_SEARCH_SELECT: // 下拉搜索框
                data[item.name] = [];
                break;
            // case TYPE_CHECKBOX: // 复选框
            //     data[item.name] = [];
            //     break;
            case TYPE_CHECKBOX_GROUP: // 复选框组
                data[item.name] = [];
                break;
            case TYPE_RADIO: // 单选诓
                data[item.name] = '';
                break;
            case TYPE_DATEPICKER: // 日期控件
                data[item.name] = null;
                break;
            case TYPE_DATEPICKERTIME: // 日期时间控件
                data[item.name] = null;
                break;
            case TYPE_RANGEPICKER: // 日期范围控件
                data[item.name] = [];
                break;
            default:
                data[item.name] = '';
        }
    });
    return data;
};
