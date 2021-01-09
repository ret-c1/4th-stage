// 展开所有路由为一级
// 给Route注入使用
const renderprivate = (data, list) => {
    data.forEach((item) => {
        list.push({
            exact: item.exact,
            path: item.path,
            title: item.title,
            component: item.component,
        });
        if (item.children && item.children.length > 0) {
            renderprivate(item.children, list);
        }
    });
};

export const flattenDeep = (data) => {
    const list = [];
    renderprivate(data, list);
    return list;
};
