## `Drawer`


#### `props`

- `title` 标题
- `visible`  `Drawer`显示状态
- `onOk` 点击确定回调
- `onClose` 点击右上角叉或取消按钮的回调
- `okText` 确认按钮文字
- `closeText` 取消按钮文字

#### 示例

```javascript
···
// 引用
import PubDrawer from '@components/PubDrawer';
···

// 设置状态
const [visible, setVisible] = useState(false);


// 定义回调
const handleDvisibleOk = () => {
    // 点击确定回调
    setVisible(!visible);
};
// 定义回调
const handleDvisibleClose = () => {
    // 点击遮罩层或右上角叉或取消按钮的回调
    setVisible(!visible);
};

···

// 使用
<PubDrawer
    title="这里是标题"
    visible={visible}
    onOk={handleDvisibleOk}
    onClose={handleDvisibleClose}
    okText="提交"
    closeText="取消"
>
    这里是内容
</PubDrawer>
···
```
