import {
    TYPE_SELECT,
    TYPE_INPUT,
    TYPE_RADIO,
    TYPE_TEXTAREA,
    // TYPE_MULTIPLE_SELECT,
} from '@components/FormItem/utils';
export const basicFormconfigStep1 = [
    {
        type: TYPE_SELECT, // 类型
        name: 'businessSystemIds', // name
        label: '业务系统名称',
        placeholder: '请选择',
        options: [
            // 多选项填充 TYPE_SELECT、TYPE_MULTIPLE_SELECT、TYPE_CHECKBOX_GROUP、TYPE_RADIO
            {
                value: '1',
                text: '对象1',
            },
        ],
        rules: [
            // 验证规则
            {
                required: true,
                message: '请选择业务系统名称！',
            },
        ],
        labelCol: {},
        wrapperCol: {},
    },
    {
        type: TYPE_SELECT, // 类型
        name: 'name', // name
        label: '网站名称',
        placeholder: '请选择',
        rules: [
            // 验证规则
            {
                required: true,
                message: '请选择网站名称！',
            },
        ],
        labelCol: {},
        wrapperCol: {},
    },
    {
        type: TYPE_INPUT, // 类型
        name: 'intranetManagePort', // name
        label: '代码项目名称',
        placeholder: '如：A collection of awesome things ...',
        labelCol: {},
        wrapperCol: {},
        // fetchFunc: getEmployee, // 搜索下拉框生效，传request对象
    },
    {
        type: TYPE_INPUT, // 类型
        name: 'internetIp', // name
        label: '代码仓库地址SSH',
        placeholder: '如：ssh:git@gitlab.info.db...',
        labelCol: {},
        wrapperCol: {},
        // fetchFunc: getEmployee, // 搜索下拉框生效，传request对象
    },
    {
        type: TYPE_INPUT, // 类型
        name: 'internetManagePort', // name
        label: '代码仓库地址HTTPS',
        placeholder: '如：https://git@gitlab.info.db...',
        labelCol: {},
        wrapperCol: {},
    },
    {
        type: TYPE_INPUT, // 类型
        name: 'ports', // name
        label: '代码仓库内网端口号',
        placeholder: '如：8080',
        labelCol: {},
        wrapperCol: {},
    },
    {
        type: TYPE_TEXTAREA, // 类型
        name: 'remark', // name
        label: '备注',
        placeholder: '请输入',
        labelCol: {},
        wrapperCol: {},
        // fetchFunc: getEmployee, // 搜索下拉框生效，传request对象
    },
    {
        type: TYPE_RADIO, // 类型
        name: 'status', // name
        label: '资产状态',
        placeholder: '',
        options: [
            {
                value: '1',
                text: '使用中',
            },
            {
                value: '2',
                text: '未使用',
            },
        ],
        rules: [
            // 验证规则
            {
                required: true,
                message: '请选择资产状态！',
            },
        ],
        labelCol: {},
        wrapperCol: {},
        // fetchFunc: getEmployee, // 搜索下拉框生效，传request对象
    },
];
export const basicFormconfigStep3 = [
    {
        type: TYPE_SELECT, // 类型
        name: 'text1', // name
        label: '资产所属部门',
        placeholder: '请选择',
        options: [
            // 多选项填充 TYPE_SELECT、TYPE_MULTIPLE_SELECT、TYPE_CHECKBOX_GROUP、TYPE_RADIO
            {
                value: '1',
                text: '对象1',
            },
        ],
        rules: [
            // 验证规则
            {
                required: true,
                message: '请选择资产所属部门！',
            },
        ],
        labelCol: {},
        wrapperCol: {},
        // fetchFunc: getEmployee, // 搜索下拉框生效，传request对象
    },
    {
        type: TYPE_SELECT, // 类型
        name: 'name', // name
        label: '资产责任人',
        placeholder: '请选择',
        options: [
            {
                value: '1',
                text: '对象1',
            },
        ],
        rules: [
            // 验证规则
            {
                required: true,
                message: '请选择资产责任人！',
            },
        ],
        labelCol: {},
        wrapperCol: {},
    },
    {
        type: TYPE_INPUT,
        name: 'intranetIp',
        label: '责任人联系电话',
        placeholder: '请输入',
        rules: [
            // 验证规则
            {
                required: true,
                message: '请输入责任人联系电话！',
            },
        ],
        labelCol: {},
        wrapperCol: {},
    },
];
