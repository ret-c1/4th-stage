import { TYPE_INPUT, TYPE_SELECT } from '@components/FormItem/utils';

export const formList = [
    {
        type: TYPE_INPUT,
        name: 'text1',
        label: '资产名称',
        margin: 'dense',
        variant: 'outlined',
        width: 200,
        options: [],
    },
    {
        type: TYPE_INPUT,
        name: 'text8',
        label: 'IP',
        margin: 'dense',
        variant: 'outlined',
        width: 200,
        options: [],
    },
    {
        type: TYPE_SELECT,
        name: 'text2',
        label: '主机资产类型',
        margin: 'dense',
        variant: 'outlined',
        width: 200,
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
    {
        type: TYPE_INPUT,
        name: 'text3',
        label: '标识',
        margin: 'dense',
        variant: 'outlined',
        width: 200,
        options: [],
    },
    {
        type: TYPE_INPUT,
        name: 'text4',
        label: '资产责任人',
        margin: 'dense',
        variant: 'outlined',
        width: 200,
        options: [],
    },
    {
        type: TYPE_SELECT,
        name: 'text5',
        label: '是否备案',
        margin: 'dense',
        variant: 'outlined',
        width: 200,
        options: [
            {
                value: '0',
                text: '全部',
            },
            {
                value: '1',
                text: '是',
            },
            {
                value: '2',
                text: '否',
            },
        ],
    },
    {
        type: TYPE_SELECT,
        name: 'text6',
        label: '未备案状态',
        margin: 'dense',
        variant: 'outlined',
        width: 200,
        options: [
            {
                value: '0',
                text: '全部',
            },
            {
                value: '1',
                text: '未发现',
            },
            {
                value: '2',
                text: '未知',
            },
        ],
    },
    {
        type: TYPE_SELECT,
        name: 'text7',
        label: '状态',
        margin: 'dense',
        variant: 'outlined',
        width: 200,
        options: [
            {
                value: '0',
                text: '全部',
            },
            {
                value: '1',
                text: '启用',
            },
            {
                value: '2',
                text: '停用',
            },
        ],
    },
];
