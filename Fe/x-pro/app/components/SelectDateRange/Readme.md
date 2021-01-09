## `ckeditor` 编辑器

#### `props`

- `data` 编辑器默认显示的内容

- `onChange` 编辑器变动时触发的事件

- `onFocus` 编辑器获取焦点时触发的事件

- `onBlur` 编辑器失去焦点时触发的事件

- `onError` 编辑器报错触发的事件

#### 用法

```
···
// 引入编辑器
import Ckeditor from '@components/Ckeditor';
···
// 定义html状态
const [html, setHtml] = useState();

// 调用组建
<Ckeditor
    data="这里填充默认内容"
    name="必填项"
    onChange={(editor) => {
        // 获取html
        // 注意：这里是异步回调
        const data = editor.getData();
        setHtml(data);
    }}
/>
// 显示编辑器内容
<div>{html}</div>
```
