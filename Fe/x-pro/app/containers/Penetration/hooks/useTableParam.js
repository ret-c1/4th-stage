import { useState, useEffect } from 'react';
import { message } from 'antd';

/**
 * 初始化列表，改变页数，改变每页条数
 * @param {*} request 请求函数
 * @param {*} offset 页数(注意，老平台第一页page为0)
 * @param {*} limit 每页条数
 * @param  {...any} otherRequestParam (其他请求参数)
 * 注意：如果需要依赖于外部参数，比如查询参数，请在form表单组件使用useCallback回调
 */
export default function useTableParam(request, ...otherRequestParam) {
    // 定义列表初始页数和条数
    const [page, setPage] = useState(0);
    const [pagesize, setPagesize] = useState(10);
    // 定义表格总数
    const [total, setTotal] = useState(0);
    // 定义数据
    const [dataSource, setDataSource] = useState(null);
    // 表格加载状态
    const [loading, setLoading] = useState(true);
    // 改变页数方法
    const pageChange = (curPage, curPageSize) => {
        setPage(curPage - 1);
        setPagesize(curPageSize);
    };
    // 初始化调用请求
    useEffect(() => {
        console.log(request);
        setLoading(true);
        request({ offset: page * pagesize, limit: pagesize, ...otherRequestParam[0] }).then(
            (res) => {
                if (res.code === 200) {
                    setTotal(res.data.total);
                    setDataSource(res.data.records);
                    setLoading(false);
                } else {
                    setLoading(true);
                    message.error(res.message);
                }
            },
        );
    }, [page, pagesize, request]);

    return {
        dataSource,
        loading,
        pagination: {
            current: page + 1,
            pageSize: pagesize,
            defaultCurrent: 1,
            defaultPageSize: 10,
            onChange: pageChange,
            total,
        },
    };
}
