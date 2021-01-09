import {
    TYPE_SELECT,
    TYPE_TEXTAREA,
    TYPE_DATEPICKER,
    TYPE_INPUT,
    TYPE_MULTIPLE_SELECT,
} from '@components/FormItem/utils';

export const modalFormConfig = [
    {
        type: TYPE_MULTIPLE_SELECT,
        name: 'ipAssetIds',
        label: '排查资产',
        margin: 'dense',
        variant: 'outlined',
        placeholder: '请选择',
        width: 200,
        options: [],
        rules: [
            {
                required: true,
                message: '请选择排查资产',
            },
        ],
    },
    {
        type: TYPE_SELECT,
        name: 'executorId',
        label: '执行者',
        variant: 'outlined',
        placeholder: '请选择',
        options: [],
        rules: [
            {
                required: true,
                message: '请选择执行者',
            },
        ],
    },
    {
        type: TYPE_INPUT,
        name: 'taskName',
        label: '任务名称',
        variant: 'outlined',
        placeholder: '请填写任务名称',
        options: [],
        rules: [
            {
                required: true,
                message: '请填写任务名称',
            },
        ],
    },
    {
        type: TYPE_DATEPICKER,
        name: 'exetime',
        label: '执行时间',
        margin: 'dense',
        variant: 'outlined',
        placeholder: ['开始时间', '结束时间'],
        width: 200,
        options: [],
        rules: [
            {
                required: true,
                message: '请选择时间',
            },
        ],
    },
    {
        type: TYPE_SELECT,
        name: 'priority',
        label: '优先级',
        margin: 'dense',
        variant: 'outlined',
        placeholder: '请选择',
        width: 200,
        options: [
            {
                text: '重要且紧急',
                value: '重要且紧急',
            },
            {
                text: '重要且不紧急',
                value: '重要且不紧急',
            },
            {
                text: '不重要且紧急',
                value: '不重要且紧急',
            },
            {
                text: '不重要且不紧急',
                value: '不重要且不紧急',
            },
        ],
        rules: [
            {
                required: true,
                message: '请选择优先级',
            },
        ],
    },
    {
        type: TYPE_TEXTAREA,
        name: 'remark',
        label: '备注',
        margin: 'dense',
        variant: 'outlined',
        placeholder: '请输入备注信息',
        width: 200,
        options: [],
    },
];

export const createFormConfig = [
    {
        type: TYPE_INPUT,
        name: 'projectName',
        label: '项目名称',
        variant: 'outlined',
        placeholder: '请填写',
        options: [],
        rules: [
            {
                required: true,
                message: '请填写项目名称',
            },
        ],
    },
    {
        type: TYPE_INPUT,
        name: 'contractNo',
        label: '项目编号',
        variant: 'outlined',
        placeholder: '请填写',
        options: [],
    },
    {
        type: TYPE_INPUT,
        name: 'clientName',
        label: '客户名称',
        variant: 'outlined',
        placeholder: '请填写',
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
        name: 'clientAttention',
        label: '客户联系人',
        variant: 'outlined',
        placeholder: '请填写',
        options: [],
    },
    {
        type: TYPE_INPUT,
        name: 'responsibleSeller',
        label: '销售名称',
        variant: 'outlined',
        placeholder: '请填写',
        options: [],
    },
    {
        type: TYPE_INPUT,
        name: 'clientMobilePhone',
        label: '联系电话',
        variant: 'outlined',
        placeholder: '请填写',
        options: [],
    },
    {
        type: TYPE_INPUT,
        name: 'serviceName',
        label: '服务名称',
        variant: 'outlined',
        placeholder: '请填写',
        options: [],
        rules: [
            {
                required: true,
                message: '请填写服务名称',
            },
        ],
    },
    {
        type: TYPE_DATEPICKER,
        name: 'reviewEndTime',
        label: '评审结束时间',
        margin: 'dense',
        variant: 'outlined',
        placeholder: '请输入评审结束时间',
        width: 200,
        options: [],
        rules: [
            {
                required: true,
                message: '请填写评审结束时间',
            },
        ],
    },
];
