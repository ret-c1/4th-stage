import {
    TYPE_INPUT,
    TYPE_SELECT,
    TYPE_DATEPICKERTIME,
    TYPE_TEXTAREA,
} from '@components/FormItem/utils';

export const emergencyFormConfig = [
    {
        type: TYPE_INPUT,
        name: 'name',
        label: '事件名称',
        margin: 'dense',
        variant: 'outlined',
        placeholder: '请输入事件名称',
        width: 200,
        options: [],
        rules: [
            {
                required: true,
                message: '请输入事件名称',
            },
        ],
    },
    {
        type: TYPE_SELECT,
        name: 'type',
        label: '事件类型',
        margin: 'dense',
        variant: 'outlined',
        placeholder: '请输入事件类型',
        width: 200,
        options: [
            {
                value: '有害程序事件',
                text: '有害程序事件',
            },
            {
                value: '网络攻击事件',
                text: '网络攻击事件',
            },
            {
                value: '信息破坏事件',
                text: '信息破坏事件',
            },
            {
                value: '信息内容安全事件',
                text: '信息内容安全事件',
            },
            {
                value: '设备设施故障',
                text: '设备设施故障',
            },
            {
                value: '灾害性事件',
                text: '灾害性事件',
            },
            {
                value: '其他事件',
                text: '其他事件',
            },
        ],
        rules: [
            {
                required: true,
                message: '请输入事件类型',
            },
        ],
    },
    {
        type: TYPE_SELECT,
        name: 'keyword',
        label: '事件关键字',
        margin: 'dense',
        variant: 'outlined',
        placeholder: '请输入事件关键字',
        width: 200,
        options: [
            {
                value: '暴力破解',
                text: '暴力破解',
            },
            {
                value: '蠕虫病毒',
                text: '蠕虫病毒',
            },
            {
                value: '勒索病毒',
                text: '勒索病毒',
            },
            {
                value: '挖矿病毒',
                text: '挖矿病毒',
            },
            {
                value: '钓鱼邮件',
                text: '钓鱼邮件',
            },
            {
                value: '网页篡改',
                text: '网页篡改',
            },
            {
                value: '远程控制',
                text: '远程控制',
            },
        ],
        rules: [
            {
                required: true,
                message: '请输入事件关键字',
            },
        ],
    },
    {
        type: TYPE_SELECT,
        name: 'level',
        label: '事件级别',
        margin: 'dense',
        variant: 'outlined',
        placeholder: '请选择事件级别',
        width: 200,
        options: [
            {
                value: '一级',
                text: '一级',
            },
            {
                value: '二级',
                text: '二级',
            },
            {
                value: '三级',
                text: '三级',
            },
            {
                value: '四级',
                text: '四级',
            },
            {
                value: '五级',
                text: '五级',
            },
        ],
        rules: [
            {
                required: true,
                message: '请选择事件级别',
            },
        ],
    },
    {
        type: TYPE_SELECT,
        name: 'urgency',
        label: '事件紧急程度',
        margin: 'dense',
        variant: 'outlined',
        placeholder: '请选择事件紧急程度',
        width: 200,
        options: [
            {
                value: '低',
                text: '低',
            },
            {
                value: '中',
                text: '中',
            },
            {
                value: '高',
                text: '高',
            },
            {
                value: '紧急',
                text: '紧急',
            },
        ],
    },
    {
        type: TYPE_INPUT,
        name: 'targetIp',
        label: '来源IP',
        margin: 'dense',
        variant: 'outlined',
        placeholder: '请填写来源IP',
        width: 200,
        options: [],
    },
    {
        type: TYPE_INPUT,
        name: 'attack',
        label: '攻击来源',
        margin: 'dense',
        variant: 'outlined',
        placeholder: '请填写攻击来源',
        width: 200,
        options: [],
    },
    {
        type: TYPE_INPUT,
        name: 'intranetSystem',
        label: '攻击所属业务系统',
        margin: 'dense',
        variant: 'outlined',
        placeholder: '请填写攻击所属业务系统',
        width: 200,
        options: [],
    },
    {
        type: TYPE_DATEPICKERTIME,
        name: 'realDiscoverTime',
        label: '事件发现时间',
        margin: 'dense',
        variant: 'outlined',
        placeholder: '请选择事件发现时间',
        width: 200,
        options: [],
        rules: [
            {
                required: true,
                message: '请选择事件发现时间',
            },
        ],
    },
    {
        type: TYPE_DATEPICKERTIME,
        name: 'happenTime',
        label: '事件发生时间',
        margin: 'dense',
        variant: 'outlined',
        placeholder: '请选择事件发生时间',
        width: 200,
        options: [],
        rules: [
            {
                required: true,
                message: '请选择事件发生时间',
            },
        ],
    },
    {
        type: TYPE_INPUT,
        name: 'aimIp',
        label: '目的IP',
        margin: 'dense',
        variant: 'outlined',
        placeholder: '请填写目的IP',
        width: 200,
        options: [],
        rules: [
            {
                required: true,
                message: '请填写目的IP',
            },
        ],
    },
    {
        type: TYPE_INPUT,
        name: 'aimSecurityDomain',
        label: '目的来源',
        margin: 'dense',
        variant: 'outlined',
        placeholder: '请填写目的来源',
        width: 200,
        options: [],
    },
    {
        type: TYPE_INPUT,
        name: 'internetSystem',
        label: '目的所属业务系统',
        margin: 'dense',
        variant: 'outlined',
        placeholder: '请填写目的所属业务系统',
        width: 200,
        options: [],
        rules: [
            {
                required: true,
                message: '请填写目的所属业务系统',
            },
        ],
    },
    {
        type: TYPE_TEXTAREA,
        name: 'description',
        label: '事件描述',
        margin: 'dense',
        variant: 'outlined',
        placeholder: '请填写事件描述',
        width: 200,
        options: [],
    },
];
