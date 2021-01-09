import React, { useState } from 'react';
import { Modal, Row, Col, Button, Table, Badge } from 'antd';
import { ExclamationCircleFilled, DownOutlined, UpOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
// import { dealDelete } from './api';

const { Column } = Table;

const messages = [
    {
        key: '1',
        name: '统一信息平台',
        isUse: true,
        department: '企信部',
        owner: '郭延朋',
    },
    {
        key: '2',
        name: '资产管理系统',
        isUse: false,
        department: '企信部',
        owner: '郭延朋',
    },
    {
        key: '3',
        name: 'OA平台',
        isUse: true,
        department: '企信部',
        owner: '郭延朋',
    },
    {
        key: '4',
        name: '统一信息平台',
        isUse: false,
        department: '企信部',
        owner: '郭延朋',
    },
    {
        key: '5',
        name: '统一信息平台',
        isUse: true,
        department: '企信部',
        owner: '郭延朋',
    },
    {
        key: '6',
        name: '统一信息平台',
        isUse: true,
        department: '企信部',
        owner: '郭延朋',
    },
    {
        key: '7',
        name: '统一信息平台',
        isUse: true,
        department: '企信部',
        owner: '郭延朋',
    },
    {
        key: '8',
        name: '统一信息平台',
        isUse: true,
        department: '企信部',
        owner: '郭延朋',
    },
    {
        key: '9',
        name: '统一信息平台',
        isUse: true,
        department: '企信部',
        owner: '郭延朋',
    },
    {
        key: '10',
        name: '统一信息平台',
        isUse: false,
        department: '企信部',
        owner: '郭延朋',
    },
    {
        key: '11',
        name: '统一信息平台',
        isUse: true,
        department: '企信部',
        owner: '郭延朋',
    },
];

const SystemDelete = (props) => {
    const { visible, onCancel } = props;
    const modalWidth = '631px';
    const [expand, setExpand] = useState(false);

    const handleDelete = () => {
        const param = {
            id: props.id,
        };
        console.log(param);
        // dealDelete(param).then((res) => {
        //     if (res.code === 200) {
        //         onOk();
        //     } else {
        //         message.warn(res.message);
        //     }
        // });
    };

    const toggleMessage = () => {
        setExpand(!expand);
    };

    const renderAll = () => (
        <>
            <Row height="22px">
                <Col span={24}>
                    <Button type="link" onClick={toggleMessage} style={{ marginLeft: '10px' }}>
                        关键资产列表
                        <UpOutlined />
                    </Button>
                </Col>
            </Row>
            <Table size="small" dataSource={messages} style={{ marginLeft: '20px' }}>
                <Column title="资产名称" dataIndex="name" key="name" />
                <Column
                    title="资产状态"
                    dataIndex="isUse"
                    key="isUse"
                    render={(text) => {
                        if (text) {
                            return <Badge status="success" text="使用中" />;
                        }
                        return <Badge status="default" text="未使用" />;
                    }}
                />
                <Column title="资产所属部门" dataIndex="department" key="department" />
                <Column title="资产负责人" dataIndex="owner" key="owner" />
            </Table>
        </>
    );

    const renderSimple = () => (
        <Row height="22px">
            <Col span={24}>
                <Button type="link" onClick={toggleMessage} style={{ marginLeft: '10px' }}>
                    关联资产列表
                    <DownOutlined />
                </Button>
            </Col>
        </Row>
    );

    const renderMessage = () => (expand ? renderAll() : renderSimple());

    return (
        <Modal
            visible={visible}
            onCancel={onCancel}
            onOk={handleDelete}
            width={modalWidth}
            okText="删除"
            okButtonProps={{ danger: 'true' }}
            cancelText="取消"
        >
            <ExclamationCircleFilled style={{ color: 'orange', marginRight: 10 }} />
            <div style={{ display: 'inline-block' }}>确认要删除 OA系统 吗?</div>
            <div style={{ marginTop: '12px', marginLeft: '24px' }}>
                OA系统下有25个关联资产，将此业务系统删除后，关联资产均将变成未分组状态
            </div>
            {renderMessage()}
        </Modal>
    );
};

SystemDelete.propTypes = {
    visible: PropTypes.bool,
    onCancel: PropTypes.func,
    // onOk: PropTypes.func,
    id: PropTypes.number,
};

export default SystemDelete;
