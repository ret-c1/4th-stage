## usetable

```

    // 引入 useAntdTable
    import useAntdTable from '@hooks/useAntdTable';

    // 这个是当前页要调用的api 这个是示例
    import { getThreatsEngineer } from './api';

    // 引入暴露的参数
    const { dataSource, paginatedParams, loading } = useAntdTable(
        getThreatsEngineer, // 传递api
        5, // 默认的pagesize
        tableParams, // params
    );

    // 在table 里注入 分页参数 paginatedParams && 返回的数据 dataSource && 返回的loading状态
    <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        pagination={{ ...paginatedParams }}
    />
```
