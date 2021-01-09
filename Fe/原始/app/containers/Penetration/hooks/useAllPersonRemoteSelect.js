import { useState } from 'react';

export default function useAllPersonRemoteSelect(request) {
    let timeout;
    let currentValue;
    // 漏洞类型远程搜索
    const [remoteData, setRemoteData] = useState([]);
    /**
     * 漏洞类型请求
     * @param {*} value 搜索值
     * @param {*} callback 回调函数
     */
    const fetch = (value, callback) => {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        currentValue = value;

        const getData = () => {
            request({ param: { name: value } }).then((res) => {
                if (res.code === 200) {
                    if (currentValue === value) {
                        const { records } = res.data;
                        const odata = [];
                        records.forEach((item) => {
                            odata.push({
                                value: item.id,
                                text: item.name,
                            });
                        });
                        callback(odata);
                    }
                }
            });
        };

        timeout = setTimeout(getData, 300);
    };

    const handleSearch = (value) => {
        if (value) {
            fetch(value, (data) => setRemoteData(data));
        } else {
            setRemoteData([]);
        }
    };

    return {
        remoteData,
        handleSearch,
    };
}
