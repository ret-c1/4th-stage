import { authAction } from '@utils/authority';
export const receiveFileStream = (url) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    // 设置请求头参数的方式,如果没有可忽略此行代码
    xhr.setRequestHeader('AUTHENTICATION', authAction.get());
    // 设置响应类型为 blob   xhr.open必须为 异步
    xhr.responseType = 'blob';
    xhr.onreadystatechange = () => {
        // 如果请求执行成功
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const blob = xhr.response;
                const a = document.createElement('a');
                // blob.type = "application/octet-stream";
                const tempUrl = window.URL.createObjectURL(blob);
                a.href = tempUrl;
                a.download = 'assets.zip';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                // 释放之前创建的URL对象
                window.URL.revokeObjectURL(url);
            }
        }
    };
    xhr.send();
};
