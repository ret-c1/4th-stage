import { TYPE_INPUT, TYPE_SELECT } from '@components/FormItem/utils';

export const formList = [
    {
        type: TYPE_INPUT,
        name: 'text1',
        label: '资产名称',
        placeholder: '',
        options: [],
    },
    {
        type: TYPE_INPUT,
        name: 'text8',
        label: 'IP',
        placeholder: '',
        options: [],
    },
    {
        type: TYPE_SELECT,
        name: 'text2',
        label: '主机资产类型',
        placeholder: '',
        options: [
            {
                value: '0',
                text: '资产类型1',
            },
            {
                value: '1',
                text: '资产类型2',
            },
            {
                value: '2',
                text: '资产类型3',
            },
        ],
    },
];
