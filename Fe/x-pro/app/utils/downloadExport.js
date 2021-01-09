// 下载、导出统一utils，待优化
import { message } from 'antd';
import { authAction } from '@utils/authority';
import PropTypes from 'prop-types';
import moment from 'moment';

export const exportFile = (props) => {
    const { url = '', method = 'GET', data, name = moment().format('YYYYMMDD') } = props;
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    // 设置请求头参数的方式,如果没有可忽略此行代码
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.setRequestHeader('AUTHENTICATION', authAction.get());

    // 设置响应类型为 blob   xhr.open必须为 异步
    xhr.responseType = 'blob';
    xhr.onreadystatechange = () => {
        // 如果请求执行成功
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const blob = xhr.response;
                if (blob.type) {
                    const a = document.createElement('a');
                    // blob.type = "application/octet-stream";
                    const tempUrl = window.URL.createObjectURL(blob);
                    const content = xhr.getResponseHeader('content-disposition'); // 注意是全小写，自定义的header也是全小写
                    let name1 = '';
                    let name2 = '';
                    if (content) {
                        name1 = decodeURIComponent(
                            content.match(/filename=(.*)/) && content.match(/filename=(.*)/)[1],
                        ); // 获取filename的值
                        name2 = decodeURIComponent(
                            content.match(/filename\*=(.*)/) &&
                                content.match(/filename\*=(.*)/)[1].substring(6),
                        ); // 获取filename*的值
                    }
                    a.href = tempUrl;
                    a.download = name || name1 || name2;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    // 释放之前创建的URL对象
                    window.URL.revokeObjectURL(url);
                } else {
                    message.error('导出失败');
                }
            }
        }
    };
    xhr.send(data);
};
exportFile.propTypes = {
    url: PropTypes.string,
    method: PropTypes.string,
    data: PropTypes.object,
    name: PropTypes.string,
};
