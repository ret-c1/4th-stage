## 文档

本文通过配置型生成表单，维护一套配置来实现表单（新增&编辑）、内容详情展示；

### 使用方法

目前组件已内置在项目中
```javascript
// 引入生成表单节点
import FormItem from '@components/FormItem';
// 引入初始化数据结构方法 - 非必须
import { renderFromData } from '@components/FormItem/utils';
// 引入当前组件表单配置项
import { basicFormconfig } from './config';
```

### 支持类型
- `TYPE_INPUT` // 文本框
- `TYPE_TEXTAREA` // 多行文本框
- `TYPE_SELECT` // 下拉
- `TYPE_MULTIPLE_SELECT` // 下拉多选
- `TYPE_SEARCH_SELECT` // 下拉搜索框
- `TYPE_CHECKBOX_GROUP` // 复选框组
- `TYPE_RADIO` // 单选诓
- `TYPE_DATEPICKER` // 日期控件
- `TYPE_DATEPICKERTIME` // 日期时间控件
- `TYPE_RANGEPICKER` // 日期范围控件

### 配置文件

```javascript
export const basicFormconfig = [
    {
        type: TYPE_INPUT, // 类型
        name: 'text1',    // name
        label: '文本框',
        placeholder: '',
        options: [      // 多选项填充 TYPE_SELECT、TYPE_MULTIPLE_SELECT、TYPE_CHECKBOX_GROUP、TYPE_RADIO
            {
                value: '1',
                text: '对象1',
            },
        ],
        rules: [        // 验证规则
            {
                required: true,
                message: '规则提示语',
            },
        ],
        labelCol: {},
        wrapperCol: {},
        fetchFunc: getEmployee, // 搜索下拉框生效，传request对象
    },
];
```

### 初始化数据结构方法 `renderFromData`

```javascript
const initForm = renderFromData(basicFormconfig);

// initForm
{
    text1: ""
    text2: ""
    text3: ""
    text4: []
    text5: []
    text6: []
    text7: ""
    text8: null
    text9: null
    text10: [],
}
```

### 表单示例（新增&编辑）

```javascript
...
const [form] = Form.useForm();
...
const res1 = {
    ...initForm,
    text1: '1',
    text2: '1',
    text3: '1',
    text4: ['1'],
    text5: null,
    text6: ['1'],
    text7: '1',
    text8: moment('2015/01/01', 'YYYY/MM/DD'),
    text9: moment('2015/01/01', 'YYYY/MM/DD'),
    text10: [moment('2015/01/01', 'YYYY/MM/DD'), moment('2015/01/01', 'YYYY/MM/DD')],
};
form.setFieldsValue({ ...res1 });
...
<Form
    form={form}
    onFinish={handleFinish}
    labelCol={{ span: 4 }}
    wrapperCol={{ span: 18 }}
>
    {basicFormconfig.map((item) => {
        console.log('1');
        return (
            <FormItem
                key={item.name}
                label={item.label}
                name={item.name}
                type={item.type}
                options={item.options}
                placeholder={item.placeholder}
                rules={item.rules}
                fetchFunc={item.fetchFunc}
            />
        );
    })}
    <Button type="primary" htmlType="submit">
        提交
    </Button>
</Form>
```
![](./img/001.png)

### 展示详情
```javascript
<Descriptions size="small" column={2}>
    {basicFormconfig.map((item) => (
        <Descriptions.Item key={item.name} label={item.label}>
            {decData[item.name]}
        </Descriptions.Item>
    ))}
</Descriptions>
```
![](./img/002.png)
