import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import styled from 'styled-components';

const ScModal = styled(Modal)`
    top: 10vh;
    & .ant-modal-body {
        max-height: 70vh;
        overflow: scroll;
    }
`;

const PubModal = (props) => {
    const { title, visible, width, onOk, onCancel, okText, cancelText, footer, children } = props;
    const handleModel = () => {};

    return (
        <>
            <ScModal
                title={title || '对话框'}
                width={width || 700}
                destroyOnClose // 关闭时销毁 Modal 里的子元素
                visible={visible}
                onOk={onOk || handleModel}
                onCancel={onCancel || handleModel}
                okText={okText || '确认'}
                cancelText={cancelText || '取消'}
                footer={footer}
            >
                {children}
            </ScModal>
        </>
    );
};

const pubModalTips = (
    type = 'info',
    title = '提示',
    content = '操作成功, 3s后隐藏.',
    delay = 3,
    callback = () => {},
) => {
    let secondsToGo = delay;
    let modal = null;
    switch (type) {
        case 'info':
            modal = Modal.info({
                title,
                content,
                onOk() {
                    callback();
                },
            });
            break;
        case 'success':
            modal = Modal.success({
                title,
                content,
                onOk() {
                    callback();
                },
            });
            break;
        case 'error':
            modal = Modal.error({
                title,
                content,
                onOk() {
                    callback();
                },
            });
            break;
        case 'warning':
            modal = Modal.warning({
                title,
                content,
                onOk() {
                    callback();
                },
            });
            break;
        default:
            modal = Modal.info({
                title,
                content,
                onOk() {
                    callback();
                },
            });
    }

    const timer = setInterval(() => {
        secondsToGo -= 1;
    }, 1000);
    setTimeout(() => {
        clearInterval(timer);
        callback();
        modal.destroy();
    }, secondsToGo * 1000);
};

PubModal.propTypes = {
    title: PropTypes.string,
    visible: PropTypes.bool,
    width: PropTypes.number,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    okText: PropTypes.string,
    cancelText: PropTypes.string,
    children: PropTypes.node,
    footer: PropTypes.node,
};

pubModalTips.propTypes = {
    type: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    callback: PropTypes.func,
};

export { pubModalTips };
export default PubModal;
