## `modal`框


#### `props`

- `title` 标题
- `visible` 对话框显示状态
- `onOk` 点击确定回调
- `onCancel` 点击遮罩层或右上角叉或取消按钮的回调
- `okText` 确认按钮文字
- `cancelText` 取消按钮文字

#### 示例

```javascript
···
// 引用
import PubModal from '@components/PubModal';
···

// 设置状态
const [visible, setVisible] = useState(false);

// 定义回调
const handleModelOk = () => {
    // 点击确定回调
    setVisible(!visible);
};
// 定义回调
const handleModelCancel = () => {
    // 点击遮罩层或右上角叉或取消按钮的回调
    setVisible(!visible);
};

···

// 使用
<PubModal
    title="我来测试"
    visible={visible}
    onOk={handleModelOk}
    onCancel={handleModelCancel}
    okText="提交"
    cancelText="取消"
>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
</PubModal>
···
```

## `pubModalTips`

#### `props`

- `type` modal信息提示类型 `info` `success` `error` `warning`
- `title` 标题
- `content` 提示内容
- `delay` 延迟关闭,默认3s
- `callback` 回调函数

#### 用法

```javascript
···
import { pubModalTips } from '@components/PubModal';
···

const callback = () => {
    // 如果关闭提示框要做什么事情时
};

// 触发提示框
const handleModelSuccess = () => {
    pubModalTips('info', '标题', '内容', 5, callback);
    // pubModalTips('info', '标题', '内容', null, null); 使用默认延迟&&不触发回调函数
};

···
<Button type="primary" onClick={handleModelSuccess}>
    Open Modal.Success
</Button>
···
```
