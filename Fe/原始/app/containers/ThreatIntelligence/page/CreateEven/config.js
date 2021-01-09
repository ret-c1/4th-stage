import { TYPE_SELECT } from '@components/FormItem/utils';
export const basicFormconfig = [
    {
        type: TYPE_SELECT, // 类型
        name: 'text1', // name
        label: '业务系统名称',
        placeholder: '请输入业务系统名称',
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
                message: '请输入业务系统名称！',
            },
        ],
        labelCol: {},
        wrapperCol: {},
        // fetchFunc: getEmployee, // 搜索下拉框生效，传request对象
    },
];
