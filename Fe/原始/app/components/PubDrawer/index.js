import React from 'react';
import PropTypes from 'prop-types';
import { Drawer, Button } from 'antd';

const PubDrawer = (props) => {
    const { children, title, visible, onOk, onClose, okText, closeText } = props;

    return (
        <>
            <Drawer
                title={title || '查看'}
                width={600}
                destroyOnClose
                onClose={onClose}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}
                footer={
                    <div
                        style={{
                            textAlign: 'right',
                        }}
                    >
                        {closeText ? (
                            <Button onClick={onClose} style={{ marginRight: 8 }}>
                                {closeText || '取消'}
                            </Button>
                        ) : null}
                        {okText ? (
                            <Button onClick={onOk} type="primary">
                                {okText || '提交'}
                            </Button>
                        ) : null}
                    </div>
                }
            >
                {children}
            </Drawer>
        </>
    );
};

PubDrawer.propTypes = {
    title: PropTypes.string,
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onClose: PropTypes.func,
    okText: PropTypes.string,
    closeText: PropTypes.string,
    children: PropTypes.node,
};

export default PubDrawer;
