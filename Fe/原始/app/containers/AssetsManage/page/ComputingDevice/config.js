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
        type: TYPE_INPUT, // 类型
        name: 'name', // name
        label: '主机名称',
        placeholder: '请输入',
        rules: [
            // 验证规则
            {
                required: true,
                message: '请输入主机名称！',
            },
        ],
        labelCol: {},
        wrapperCol: {},
        // fetchFunc: getEmployee, // 搜索下拉框生效，传request对象
    },
    {
        type: TYPE_INPUT, // 类型
        name: 'intranetIp', // name
        label: '内网IP地址',
        placeholder: '如：1.1.1.1',
        rules: [
            // 验证规则
            {
                required: true,
                message: '请输入内网IP地址！',
            },
        ],
        labelCol: {},
        wrapperCol: {},
        // fetchFunc: getEmployee, // 搜索下拉框生效，传request对象
    },
    {
        type: TYPE_INPUT, // 类型
        name: 'intranetManagePort', // name
        label: '内网远程管理端口号',
        placeholder: '如：8080',
        labelCol: {},
        wrapperCol: {},
        // fetchFunc: getEmployee, // 搜索下拉框生效，传request对象
    },
    {
        type: TYPE_INPUT, // 类型
        name: 'internetIp', // name
        label: '互联网地址',
        placeholder: '如：1.1.1.1',
        labelCol: {},
        wrapperCol: {},
        // fetchFunc: getEmployee, // 搜索下拉框生效，传request对象
    },
    {
        type: TYPE_INPUT, // 类型
        name: 'internetManagePort', // name
        label: '互联网远程管理端口号',
        placeholder: '如：8080',
        labelCol: {},
        wrapperCol: {},
        // fetchFunc: getEmployee, // 搜索下拉框生效，传request对象
    },
    {
        type: TYPE_INPUT, // 类型
        name: 'ports', // name
        label: '主要开放服务端口',
        placeholder: '如：8080，多个端口号用 ; 隔离',
        labelCol: {},
        wrapperCol: {},
        // fetchFunc: getEmployee, // 搜索下拉框生效，传request对象
    },
    {
        type: TYPE_SELECT, // 类型
        name: 'businessType', // name
        label: '操作系统类型',
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
                message: '请选择操作系统类型！',
            },
        ],
        labelCol: {},
        wrapperCol: {},
        // fetchFunc: getEmployee, // 搜索下拉框生效，传request对象
    },
    {
        type: TYPE_SELECT, // 类型
        name: 'sn', // name
        label: '操作系统版本',
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
                message: '请选择操作系统版本！',
            },
        ],
        labelCol: {},
        wrapperCol: {},
        // fetchFunc: getEmployee, // 搜索下拉框生效，传request对象
    },
    {
        type: TYPE_RADIO, // 类型
        name: 'antivirus', // name
        label: '是否安装杀毒软件',
        placeholder: '请选择',
        options: [
            {
                value: '1',
                text: '是',
            },
            {
                value: '2',
                text: '否',
            },
        ],
        rules: [
            // 验证规则
            {
                required: true,
                message: '请选择操作系统版本！',
            },
        ],
        labelCol: {},
        wrapperCol: {},
        // fetchFunc: getEmployee, // 搜索下拉框生效，传request对象
    },
    {
        type: TYPE_SELECT, // 类型
        name: 'managerType', // name
        label: '远程管理方式',
        placeholder: '请选择',
        options: [
            {
                value: '1',
                text: '对象1',
            },
        ],
        labelCol: {},
        wrapperCol: {},
        // fetchFunc: getEmployee, // 搜索下拉框生效，传request对象
    },
    {
        type: TYPE_TEXTAREA, // 类型
        name: 'description', // name
        label: '服务器业务功能描述',
        placeholder: '请输入',
        labelCol: {},
        wrapperCol: {},
        // fetchFunc: getEmployee, // 搜索下拉框生效，传request对象
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
    {
        type: TYPE_INPUT,
        name: 'intranetManagePort',
        label: '部署物理位置',
        placeholder: '如：总部大楼5层机房服务器机柜',
        labelCol: {},
        wrapperCol: {},
    },
    {
        type: TYPE_INPUT,
        name: 'internetIp',
        label: '部署逻辑位置',
        placeholder: '如：服务器区',
        labelCol: {},
        wrapperCol: {},
    },
];
