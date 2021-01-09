import { TYPE_INPUT, TYPE_SELECT, TYPE_TEXTAREA } from '@components/FormItem/utils';

export const missionFormConfig = [
    {
        type: TYPE_INPUT,
        name: 'vulName',
        label: '漏洞名称',
        margin: 'dense',
        variant: 'outlined',
        placeholder: '如：SQL注入攻击',
        width: 200,
        options: [],
        rules: [
            {
                required: true,
                message: '请输入漏洞名称',
            },
        ],
    },
    {
        type: TYPE_INPUT,
        name: 'cve',
        label: 'CVE编号',
        margin: 'dense',
        variant: 'outlined',
        placeholder: '如：CVE-2019-XXXX漏洞',
        width: 200,
        options: [],
        rules: [
            // {
            //     required: true,
            //     message: '请输入cve编号',
            // },
        ],
    },
    {
        type: TYPE_SELECT,
        name: 'vulLevel',
        label: '漏洞等级',
        margin: 'dense',
        variant: 'outlined',
        placeholder: '请选择',
        width: 200,
        rules: [
            {
                required: true,
                message: '请输入漏洞等级',
            },
        ],
        options: [
            {
                value: '紧急',
                text: '紧急',
            },
            {
                value: '高危',
                text: '高危',
            },
            {
                value: '中危',
                text: '中危',
            },
            {
                value: '低危',
                text: '低危',
            },
            {
                value: '信息',
                text: '信息',
            },
        ],
    },
    {
        type: TYPE_INPUT,
        name: 'vulType',
        label: '漏洞类型',
        margin: 'dense',
        variant: 'outlined',
        placeholder: '如：远程代码执行漏洞',
        width: 200,
        options: [],
    },
    {
        type: TYPE_INPUT,
        name: 'cnnd',
        label: 'CNND编号',
        margin: 'dense',
        variant: 'outlined',
        placeholder: '如：CNNVD-202001-XXX',
        width: 200,
        options: [],
    },
    {
        type: TYPE_INPUT,
        name: 'url',
        label: '相关链接',
        margin: 'dense',
        variant: 'outlined',
        placeholder: '如：https://www.123.com',
        width: 200,
        options: [],
    },
];

export const noticeFormConfig = [
    {
        type: TYPE_TEXTAREA,
        name: 'notice',
        label: '漏洞公告',
        margin: 'dense',
        variant: 'outlined',
        placeholder: '请输入',
        labelCol: { span: 2 },
        wrapperCol: { span: 20 },
        width: 200,
        options: [],
        rules: [
            {
                required: true,
                message: '请输入漏洞公告',
            },
        ],
    },
    {
        type: TYPE_TEXTAREA,
        name: 'scope',
        label: '影响范围',
        margin: 'dense',
        variant: 'outlined',
        placeholder: '请输入',
        labelCol: { span: 2 },
        wrapperCol: { span: 20 },
        width: 200,
        options: [],
    },
    {
        type: TYPE_TEXTAREA,
        name: 'description',
        label: '漏洞描述',
        margin: 'dense',
        variant: 'outlined',
        placeholder: '请输入',
        labelCol: { span: 2 },
        wrapperCol: { span: 20 },
        width: 200,
        options: [],
    },
    {
        type: TYPE_TEXTAREA,
        name: 'solution',
        label: '缓解措施',
        margin: 'dense',
        variant: 'outlined',
        placeholder: '请输入',
        labelCol: { span: 2 },
        wrapperCol: { span: 20 },
        width: 200,
        options: [],
    },
    {
        type: TYPE_TEXTAREA,
        name: 'tips',
        label: '友情提示',
        margin: 'dense',
        variant: 'outlined',
        placeholder: '请输入',
        labelCol: { span: 2 },
        wrapperCol: { span: 20 },
        width: 200,
        options: [],
    },
];

export const assessPerson = [
    {
        type: TYPE_SELECT,
        name: 'threatExpertId',
        label: '情报专家',
        margin: 'dense',
        variant: 'outlined',
        placeholder: '请选择',
        width: 200,
        options: [],
        rules: [
            {
                required: true,
                message: '请输入情报专家',
            },
        ],
    },
    {
        type: TYPE_SELECT,
        name: 'operateExpertId',
        label: '运营专家',
        margin: 'dense',
        variant: 'outlined',
        placeholder: '请选择',
        width: 200,
        options: [],
        rules: [
            {
                required: true,
                message: '请输入运营专家',
            },
        ],
    },
];
