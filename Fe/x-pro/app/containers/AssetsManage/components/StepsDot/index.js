import React from 'react';
import { Popover } from 'antd';
const handleMsg = (index) => {
    switch (index) {
        case 0:
            return (
                <span>
                    可对社会公开的信息；
                    <br />
                    公用的信息处理设备和
                    <br />
                    系统资源等
                </span>
            );
        case 1:
            return (
                <span>
                    未经授权的修改或破坏
                    <br />
                    会对组织造成轻微影响，
                    <br />
                    对业务冲击轻微，容易弥补
                </span>
            );
        default:
            return 'default message';
    }
};
export const customDot = (dot, { index }) => (
    <Popover
        getPopupContainer={() => document.querySelector('.ant-card')}
        content={handleMsg(index)}
        placement="top"
    >
        {dot}
    </Popover>
);
