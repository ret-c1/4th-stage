import {
    TYPE_INPUT,
    TYPE_DATEPICKER,
    TYPE_DATEPICKERTIME,
    TYPE_SELECT,
} from '@components/FormItem/utils';

export const basicFormconfig = [
    {
        type: TYPE_SELECT,
        name: 'contractType',
        label: '合同类型',
        placeholder: '请选择合同类型',
        width: 200,
        options: [
            {
                value: '合同',
                text: '合同',
            },
            {
                value: '非合同',
                text: '非合同',
            },
            {
                value: '提前实施',
                text: '提前实施',
            },
            {
                value: '合同外支持',
                text: '合同外支持',
            },
            {
                value: '战略支持',
                text: '战略支持',
            },
            {
                value: '日常工作',
                text: '日常工作',
            },
            {
                value: '其他',
                text: '其他',
            },
        ],
        rules: [
            {
                required: true,
                message: '请输入合同类型',
            },
        ],
    },
    {
        type: TYPE_INPUT,
        name: 'contractNo',
        label: '合同编号',
        placeholder: '',
        width: 160,
        options: [],
    },
    {
        type: TYPE_DATEPICKER,
        name: 'serviceStartTime',
        label: '预计开始时间',
        placeholder: '请选择预计开始时间',
        width: 200,
        options: [],
        rules: [
            {
                required: true,
                message: '请选择预计开始时间',
            },
        ],
    },
    {
        type: TYPE_DATEPICKER,
        name: 'serviceEndTime',
        label: '预计完成时间',
        placeholder: '请选择预计完成时间',
        width: 200,
        options: [],
        rules: [
            {
                required: true,
                message: '请选择预计完成时间',
            },
        ],
    },
    {
        type: TYPE_INPUT,
        name: 'clientName',
        label: '客户名称',
        placeholder: '请填写客户名称',
        width: 200,
        options: [],
        rules: [
            {
                required: true,
                message: '请填写客户名称',
            },
        ],
    },
    {
        type: TYPE_INPUT,
        name: 'clientMobilePhone',
        label: '客户联系电话',
        placeholder: '请填写客户联系电话',
        width: 200,
        options: [],
    },
    {
        type: TYPE_INPUT,
        name: 'clientAttention',
        label: '客户联系人',
        placeholder: '请填写客户联系人',
        width: 200,
        options: [],
    },
    {
        type: TYPE_INPUT,
        name: 'clientEmail',
        label: '客户邮件地址',
        placeholder: '请填写客户邮件地址',
        width: 200,
        options: [],
    },
    {
        type: TYPE_DATEPICKERTIME,
        name: 'discoverTime',
        label: '客户发现时间',
        placeholder: '请选择客户发现时间',
        width: 200,
        options: [],
        rules: [
            {
                required: true,
                message: '请选择客户发现时间',
            },
        ],
    },
    {
        type: TYPE_INPUT,
        name: 'clientAddress',
        label: '客户地址',
        placeholder: '请填写客户地址',
        width: 200,
        options: [],
    },
    {
        type: TYPE_INPUT,
        name: 'sellerName',
        label: '销售名字',
        placeholder: '请填写销售名字',
        width: 200,
        options: [],
    },
    {
        type: TYPE_INPUT,
        name: 'engineerIds',
        label: '应急人员',
        placeholder: '请填写应急人员',
        width: 200,
        options: [],
        rules: [
            {
                required: true,
                message: '请填写应急人员',
            },
        ],
    },
    {
        type: TYPE_INPUT,
        name: 'managerId',
        label: '项目经理',
        placeholder: '请填写项目经理',
        width: 200,
        options: [],
        rules: [
            {
                required: true,
                message: '请填写项目经理',
            },
        ],
    },
];
