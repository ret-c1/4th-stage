import { TYPE_SELECT, TYPE_TEXTAREA, TYPE_RANGEPICKER } from '@components/FormItem/utils';

export const modalFormConfig = [
    {
        type: TYPE_SELECT,
        name: 'engineerIds',
        label: '执行者',
        variant: 'outlined',
        placeholder: '请选择',
        options: [],
    },
    {
        type: TYPE_RANGEPICKER,
        name: 'exetime',
        label: '执行时间',
        margin: 'dense',
        variant: 'outlined',
        placeholder: ['开始时间', '结束时间'],
        width: 200,
        options: [],
    },
    {
        type: TYPE_RANGEPICKER,
        name: 'serviceTime',
        label: '项目时间',
        margin: 'dense',
        variant: 'outlined',
        placeholder: ['项目开始时间', '项目结束时间'],
        width: 200,
        rules: [
            {
                required: true,
                message: '请选择项目时间',
            },
        ],
        options: [],
    },
    {
        type: TYPE_SELECT,
        name: 'planLevel',
        label: '优先级',
        margin: 'dense',
        variant: 'outlined',
        placeholder: '请填写优先级',
        width: 200,
        options: [
            {
                value: '重要且紧急',
                text: '重要且紧急',
            },
            {
                value: '重要且不紧急',
                text: '重要且不紧急',
            },
            {
                value: '不重要且紧急',
                text: '不重要且紧急',
            },
            {
                value: '不重要且不紧急',
                text: '不重要且不紧急',
            },
        ],
    },
    {
        type: TYPE_TEXTAREA,
        name: 'planRemark',
        label: '备注',
        margin: 'dense',
        variant: 'outlined',
        placeholder: '请输入备注信息',
        width: 200,
        options: [],
    },
];
