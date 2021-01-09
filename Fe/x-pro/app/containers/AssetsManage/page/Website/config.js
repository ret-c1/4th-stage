import {
    TYPE_SELECT,
    TYPE_INPUT,
    TYPE_RADIO,
    TYPE_TEXTAREA,
    TYPE_MULTIPLE_SELECT,
} from '@components/FormItem/utils';
export const basicFormconfigStep1 = [
    {
        type: TYPE_SELECT, // 类型
        name: 'businessSystemIds', // name
        label: '业务系统名称',
        placeholder: '请输入',
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
        type: TYPE_SELECT, // 类型
        name: 'businessCompany', // name
        label: '系统开发商/维护商',
        placeholder: '请选择',
        options: [
            {
                value: '1',
                text: '对象1',
            },
        ],
        labelCol: { span: 6 },
        wrapperCol: { span: 10 },
    },
    {
        type: TYPE_SELECT, // 类型
        name: 'languages', // name
        label: '系统后端开发语言',
        placeholder: '请选择',
        options: [
            {
                value: '1',
                text: '对象1',
            },
        ],
        labelCol: { span: 6 },
        wrapperCol: { span: 10 },
    },
    {
        type: TYPE_SELECT, // 类型
        name: 'version', // name
        label: '开发语言版本',
        placeholder: '请选择',
        options: [
            {
                value: '1',
                text: '对象1',
            },
        ],
        labelCol: { span: 6 },
        wrapperCol: { span: 10 },
    },
    {
        type: TYPE_INPUT, // 类型
        name: 'name', // name
        label: '网站名称',
        placeholder: '如：财务门户',
        rules: [
            // 验证规则
            {
                required: true,
                message: '请输入网站名称！',
            },
        ],
        labelCol: { span: 6 },
        wrapperCol: { span: 10 },
    },
    {
        type: TYPE_INPUT, // 类型
        name: 'intranetIp', // name
        label: '内网IP地址及端口',
        placeholder: 'http://10.1.1.1:8080',
        labelCol: { span: 6 },
        wrapperCol: { span: 10 },
    },
    {
        type: TYPE_INPUT, // 类型
        name: 'intranetManagePort', // name
        label: '内网域名',
        placeholder: 'test.aaaa.com',
        labelCol: { span: 6 },
        wrapperCol: { span: 10 },
    },
    {
        type: TYPE_RADIO, // 类型
        name: 'antivirus', // name
        label: '是否为互联网系统',
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
                message: '请选择是否为互联网系统！',
            },
        ],
        labelCol: { span: 6 },
        wrapperCol: { span: 10 },
    },
    {
        type: TYPE_INPUT, // 类型
        name: 'internetIp', // name
        label: '互联网IP地址及端口',
        placeholder: 'http://123.1.1.1:8080',
        labelCol: { span: 6 },
        wrapperCol: { span: 10 },
    },
    {
        type: TYPE_INPUT, // 类型
        name: 'internetManagePort', // name
        label: '外网域名',
        placeholder: 'test.aaaa.com',
        labelCol: { span: 6 },
        wrapperCol: { span: 10 },
    },
    {
        type: TYPE_MULTIPLE_SELECT, // 类型
        name: 'businessType', // name
        label: '选入关联主机资产',
        placeholder: '请选择，可多选',
        options: [
            {
                value: '1',
                text: '对象1',
            },
        ],
        labelCol: { span: 6 },
        wrapperCol: { span: 10 },
    },
    {
        type: TYPE_TEXTAREA, // 类型
        name: 'remark', // name
        label: '备注',
        placeholder: '请输入',
        labelCol: { span: 6 },
        wrapperCol: { span: 10 },
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
        labelCol: { span: 6 },
        wrapperCol: { span: 10 },
        // fetchFunc: getEmployee, // 搜索下拉框生效，传request对象
    },
    {
        type: TYPE_MULTIPLE_SELECT, // 类型
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
        labelCol: { span: 6 },
        wrapperCol: { span: 10 },
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
        labelCol: { span: 6 },
        wrapperCol: { span: 10 },
    },
    {
        type: TYPE_INPUT,
        name: 'intranetManagePort',
        label: '开发商',
        placeholder: '请输入开发商名称',
        labelCol: { span: 6 },
        wrapperCol: { span: 10 },
    },
    {
        type: TYPE_INPUT,
        name: 'internetIp',
        label: '维护商',
        placeholder: '请输入维护商名称',
        labelCol: { span: 6 },
        wrapperCol: { span: 10 },
    },
    {
        type: TYPE_INPUT,
        name: 'internetIp',
        label: '维护商责任人',
        placeholder: '请输入责任人姓名',
        labelCol: { span: 6 },
        wrapperCol: { span: 10 },
    },
];
