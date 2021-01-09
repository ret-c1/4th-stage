import {
    TYPE_SELECT,
    TYPE_INPUT,
    TYPE_RADIO,
    TYPE_TEXTAREA,
    TYPE_MULTIPLE_SELECT,
} from '@components/FormItem/utils';
export const basicFormconfigStep1 = [
    {
        type: TYPE_MULTIPLE_SELECT, // 类型
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
        labelCol: { span: 6 },
        wrapperCol: { span: 10 },
        // fetchFunc: getEmployee, // 搜索下拉框生效，传request对象
    },
    {
        type: TYPE_INPUT, // 类型
        name: 'name', // name 资产名称
        label: '主机名称',
        placeholder: '请输入',
        rules: [
            // 验证规则
            {
                required: true,
                message: '请输入主机名称！',
            },
        ],
        labelCol: { span: 6 },
        wrapperCol: { span: 10 },
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
        labelCol: { span: 6 },
        wrapperCol: { span: 10 },
        // fetchFunc: getEmployee, // 搜索下拉框生效，传request对象
    },
    {
        type: TYPE_INPUT, // 类型
        name: 'intranetManagePort', // name
        label: '内网远程管理端口号',
        placeholder: '如：8080',
        labelCol: { span: 6 },
        wrapperCol: { span: 3 },
        // fetchFunc: getEmployee, // 搜索下拉框生效，传request对象
    },
    {
        type: TYPE_INPUT, // 类型
        name: 'internetIp', // name
        label: '互联网地址',
        placeholder: '如：1.1.1.1',
        labelCol: { span: 6 },
        wrapperCol: { span: 10 },
        // fetchFunc: getEmployee, // 搜索下拉框生效，传request对象
    },
    {
        type: TYPE_INPUT, // 类型
        name: 'internetManagePort', // name
        label: '互联网远程管理端口号',
        placeholder: '如：8080',
        labelCol: { span: 6 },
        wrapperCol: { span: 3 },
        // fetchFunc: getEmployee, // 搜索下拉框生效，传request对象
    },
    {
        type: TYPE_INPUT, // 类型
        name: 'ports', // name
        label: '主要开放服务端口',
        placeholder: '如：8080，多个端口号用 ; 隔离',
        labelCol: { span: 6 },
        wrapperCol: { span: 10 },
        // fetchFunc: getEmployee, // 搜索下拉框生效，传request对象
    },
    {
        type: TYPE_SELECT, // 类型
        name: 'product', // name
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
        labelCol: { span: 6 },
        wrapperCol: { span: 10 },
        // fetchFunc: getEmployee, // 搜索下拉框生效，传request对象
    },
    {
        type: TYPE_SELECT, // 类型
        name: 'version', // name
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
        labelCol: { span: 6 },
        wrapperCol: { span: 10 },
        // fetchFunc: getEmployee, // 搜索下拉框生效，传request对象
    },
    {
        type: TYPE_RADIO, // 类型
        name: 'antivirus', // name
        label: '是否安装杀毒软件',
        placeholder: '请选择',
        options: [
            {
                value: 1,
                text: '是',
            },
            {
                value: 0,
                text: '否',
            },
        ],
        rules: [
            // 验证规则
            {
                required: true,
                message: '请选择是否安装杀毒软件！',
            },
        ],
        labelCol: { span: 6 },
        wrapperCol: { span: 10 },
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
        labelCol: { span: 6 },
        wrapperCol: { span: 10 },
        // fetchFunc: getEmployee, // 搜索下拉框生效，传request对象
    },
    {
        type: TYPE_TEXTAREA, // 类型
        name: 'description', // name
        label: '服务器业务功能描述',
        placeholder: '请输入',
        labelCol: { span: 6 },
        wrapperCol: { span: 10 },
        // fetchFunc: getEmployee, // 搜索下拉框生效，传request对象
    },
    {
        type: TYPE_TEXTAREA, // 类型
        name: 'remark', // name
        label: '备注',
        placeholder: '请输入',
        labelCol: { span: 6 },
        wrapperCol: { span: 10 },
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
                required: false,
                message: '请选择资产状态！',
            },
        ],
        labelCol: { span: 6 },
        wrapperCol: { span: 10 },
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
            {
                value: '2',
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
        labelCol: { span: 6 },
        wrapperCol: { span: 10 },
        // fetchFunc: getEmployee, // 搜索下拉框生效，传request对象
    },
    {
        type: TYPE_SELECT, // 类型
        name: 'personId', // name
        label: '资产责任人',
        placeholder: '请选择',
        options: [
            {
                value: '1',
                text: '对象1',
            },
            {
                value: '2',
                text: '对象2',
            },
        ],
        rules: [
            // 验证规则
            {
                required: true,
                message: '请选择资产责任人！',
            },
        ],
        labelCol: { span: 6 },
        wrapperCol: { span: 10 },
    },
    {
        type: TYPE_INPUT,
        name: 'phone',
        label: '责任人联系电话',
        placeholder: '请输入',
        rules: [
            // 验证规则
            {
                required: true,
                message: '请输入责任人联系电话！',
            },
        ],
        labelCol: { span: 6 },
        wrapperCol: { span: 10 },
    },
    {
        type: TYPE_INPUT,
        name: 'address',
        label: '部署物理位置',
        placeholder: '如：总部大楼5层机房服务器机柜',
        labelCol: { span: 6 },
        wrapperCol: { span: 10 },
    },
    {
        type: TYPE_INPUT,
        name: 'region',
        label: '部署逻辑位置',
        placeholder: '如：服务器区',
        labelCol: { span: 6 },
        wrapperCol: { span: 10 },
    },
];
