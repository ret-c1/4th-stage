import { dynamicRoutes } from './routers';

let idx1th = -1; // 一级下标
let idx2th = -1; // 二级下标

// 筛选三级级菜单
export const diffCmenu = (Clist, Cjson, menuTree) => {
    Clist.children.forEach((d1co) => {
        if (Cjson.children) {
            Cjson.children.forEach((j1co) => {
                if (d1co.path === j1co.path && menuTree[idx1th].children[idx2th]) {
                    // service 树 如果选中才渲染
                    menuTree[idx1th].children[idx2th].children.push({
                        path: d1co.path,
                        component: d1co.component,
                        exact: d1co.exact,
                        title: d1co.title,
                        children: [],
                    });
                }
            });
        }
    });
};

// 筛选二级菜单
export const diffBmenu = (Blist, Bjson, menuTree) => {
    idx2th = -1; // 重置下标
    Blist.children.forEach((d1c) => {
        if (Bjson.children) {
            Bjson.children.forEach((j1c) => {
                if (d1c.path === j1c.path && menuTree[idx1th]) {
                    // service 树 如果选中才渲染
                    menuTree[idx1th].children.push({
                        path: d1c.path,
                        component: d1c.component,
                        exact: d1c.exact,
                        title: d1c.title,
                        children: [],
                    });
                    idx2th += 1;
                    diffCmenu(d1c, j1c, menuTree);
                }
            });
        }
    });
};

// 筛选一级菜单
export const diffAmenu = (data) => {
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
                    children: [],
                });
                idx1th += 1;
                diffBmenu(d1, j1, menuTree);
            }
        });
    });
    return menuTree || [];
};
