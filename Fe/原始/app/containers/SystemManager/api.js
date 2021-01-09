import request from '@utils/request';

// 所有用户
export const getAllpeople = (formdata) =>
    request('/api/user/page', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 组织树结构
export const getDepartTree = (formdata) =>
    request('/api/depart/tree', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 所属组织人员列表
export const getDepartPeople = (formdata) =>
    request('/api/depart/peoples', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 组织关联用户 批量添加用户操作
export const updateDepartRelateUser = (formdata) =>
    request('/api/depart/relate/users', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 组织下所有用户 批量添加用户时modal框中的用户列表
export const getDepartAllPeople = (formdata) =>
    request('/api/depart/all/peoples', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 查询父级部门
export const getDepartParent = (formdata) =>
    request('/api/depart/parent', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 新增组织
export const addDepart = (formdata) =>
    request('/api/depart/save', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 编辑组织
export const editDepart = (formdata) =>
    request('/api/depart/update', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 删除组织
export const removeDepart = (formdata) =>
    request('/api/depart/group/remove', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 新增组织下用户
export const saveDepartUser = (formdata) =>
    request('/api/depart/user/save', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 编辑组织下用户
export const updateDepartUser = (formdata) =>
    request('/api/depart/user/update', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 编辑用户
export const updateUser = (formdata) =>
    request('/api/user/edit', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 根据用户查询所属组织列表
export const getUserFromDepart = (formdata) =>
    request('/api/depart/by/user', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 查询用户
export const getUserDetail = (formdata) =>
    request('/api/depart/user/get', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 用户解绑
export const userUnBind = (formdata) =>
    request('/api/depart/user/unbind', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 重置密码
export const resetPassword = (formdata) =>
    request('/api/user/resetpwd', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

// 角色管理

// 新增角色
export const addRole = (formdata) =>
    request('/api/role/add', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 删除角色
export const delRole = (formdata) =>
    request('/api/role/del', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 编辑角色
export const editRole = (formdata) =>
    request('/api/role/edit', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 角色分页
export const getRole = (formdata) =>
    request('/api/role/page', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 权限树
export const getRolePermissions = (formdata) =>
    request('/api/role/permissions', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
// 角色分配
export const dispatchRoles = (formdata) =>
    request('/api/depart/user/role/dispatch', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });
