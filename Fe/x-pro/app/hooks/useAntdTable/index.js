import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import { message } from 'antd';

const useAntdTable = (service, tbparams) => {
    const history = useHistory();
    const [params, setParams] = useState({});
    const [firstload, setFirstload] = useState(true);
    // 数据
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    // loading状态
    const [tbloading, setTbloading] = useState(false);
    const [formParams, setFormParams] = useState({});

    const reloadFetch = () => {
        setTbloading(true);
        service(params).then((res) => {
            setTbloading(false);
            if (res.code === 200) {
                setData(res.data.records);
                setTotal(res.data.total);
            } else {
                message.error(res.message);
            }
        });
    };
    useEffect(() => {
        // 请求数据
        if (Object.keys(params).length > 0) {
            setFirstload(false);
            const query = {};
            query.page = Number(params.offset) / Number(params.limit) + 1 || 1;
            query.pagesize = params.limit || 10;

            history.push({
                pathname: history.location.pathname,
                search: queryString.stringify({ ...query, ...params.param }, { sort: false }),
            });
            setTbloading(true);
            service(params).then((res) => {
                setTbloading(false);
                if (res.code === 200) {
                    setData(res.data.records);
                    setTotal(res.data.total);
                } else {
                    message.error(res.message);
                }
            });
        }
    }, [params]);

    useEffect(() => {
        const search = queryString.parse(history.location.search);
        const a = Number(search.pagesize || 10);
        const b = Number(search.page || 1);
        delete search.pagesize;
        delete search.page;
        // const keys = Object.keys(search).length;
        if (firstload) {
            console.log('firstload 1');
            setParams({
                ...tbparams,
                limit: a,
                offset: (b - 1) * a,
                param: {
                    ...tbparams.param,
                    ...search,
                    labels: search.labels && search.labels.split(','),
                    source: search.source && search.source.split(','),
                },
            });
            setFirstload(false);
            setFormParams({ ...search });
        } else {
            console.log('firstload 2');
            setParams({
                ...tbparams,
            });
        }
        // return () => {
        //     firstload = true;
        // };
    }, [tbparams]);

    useEffect(() => {
        console.log();
        return () => {
            setFirstload(true);
        };
    }, []);

    // 切换页码
    const onChange = (page, pageSize) => {
        setParams({
            ...params,
            limit: pageSize,
            offset: (page - 1) * pageSize,
        });
    };

    // 切换pagesize
    const onShowSizeChange = (current, pageSize) => {
        setParams({
            ...params,
            limit: pageSize,
            offset: current * 0,
        });
    };

    const usPaginatedParams = {
        current: Number(params.offset) / Number(params.limit) + 1,
        pageSize: params.limit,
        onChange,
        showSizeChanger: true,
        pageSizeOptions: [5, 10, 20, 50, 100],
        onShowSizeChange,
        total,
        showTotal: () => `共 ${total} 条`,
    };
    const usDataSource = data;
    const usTotal = total;
    const usLoading = tbloading;
    const usReloadFetch = reloadFetch;
    const usFormParams = formParams;
    return { usPaginatedParams, usDataSource, usTotal, usLoading, usFormParams, usReloadFetch };
};

export default useAntdTable;
