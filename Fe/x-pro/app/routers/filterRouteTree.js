import { dynamicRoutes } from './routers';
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

const flattenDeep = (data) => {
    const list = [];
    renderprivate(data, list);
    return list;
};

export const diff = (data) => {
    // 筛选一级菜单
    const menuTree = [];
    dynamicRoutes.forEach((d1) => {
        data.forEach((j1) => {
            if (d1.path === j1.path) {
                // 全路由 和 service端 树进行比较
                // service 树 如果选中才渲染
                menuTree.push({
                    path: d1.path,
                    exact: d1.exact,
                    component: d1.component,
                    title: d1.title,
                    key: d1.key,
                    children: d1.children,
                });
            }
        });
    });
    return flattenDeep(menuTree) || [];
};
