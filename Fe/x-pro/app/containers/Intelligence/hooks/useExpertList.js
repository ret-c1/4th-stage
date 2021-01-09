// 请求运营专家或者情报专家名单hooks，返回下拉框需要的列表项数据
import { useState, useEffect } from 'react';

export default function useExpertList(request) {
    const [optionList, setOptionList] = useState([]);
    useEffect(() => {
        request().then((res) => {
            if (res.code === 200) {
                let option = [];
                option = res.data.map((item) => ({
                    value: item.id,
                    text: item.name,
                }));
                setOptionList(option);
            }
        });
    }, []);
    return optionList;
}
