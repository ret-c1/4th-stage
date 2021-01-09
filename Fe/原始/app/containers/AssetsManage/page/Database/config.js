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
        // fetchFunc: getEmployee, // 搜索下拉框生效，传request对象
    },
    {
        type: TYPE_SELECT, // 类型
        name: 'name', // name
        label: '主机名称',
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
                message: '请选择主机名称！',
            },
        ],
        labelCol: {},
        wrapperCol: {},
    },
    {
        type: TYPE_SELECT, // 类型
        name: 'type', // name
        label: '数据库类型',
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
                message: '请选择数据库类型！',
            },
        ],
        labelCol: {},
        wrapperCol: {},
    },
    {
        type: TYPE_SELECT, // 类型
        name: 'version', // name
        label: '数据库版本',
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
                message: '请选择数据库版本！',
            },
        ],
        labelCol: {},
        wrapperCol: {},
    },
    {
        type: TYPE_INPUT, // 类型
        name: 'internetManagePort', // name
        label: '数据库内网端口号',
        placeholder: '如：8080',
        labelCol: {},
        wrapperCol: {},
    },
    {
        type: TYPE_INPUT, // 类型
        name: 'ports', // name
        label: '数据库互联网端口号',
        placeholder: '如：8080',
        labelCol: {},
        wrapperCol: {},
    },
    {
        type: TYPE_RADIO, // 类型
        name: 'antivirus', // name
        label: '主备关系',
        placeholder: '请选择',
        options: [
            {
                value: '1',
                text: '主数据库',
            },
            {
                value: '2',
                text: '备份数据库',
            },
        ],
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
