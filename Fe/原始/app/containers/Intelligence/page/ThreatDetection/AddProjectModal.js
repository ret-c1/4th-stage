import React from 'react';
import { Modal, Table, Tooltip, Button } from 'antd';
// import PubMessage from '@components/PubMessage';
import PropTypes from 'prop-types';
// import useTableSelect from '../../hooks/useTableSelect';。

const columns = [
    {
        title: '客户名称',
        dataIndex: 'projectName',
        width: 172,
        ellipsis: true,
        render: (text) => (
            <Tooltip title={text} placement="topLeft">
                {text}
            </Tooltip>
        ),
    },
    {
        title: '项目名称',
        dataIndex: 'clientName',
    },
    {
        title: '销售联系人',
        dataIndex: 'responsibleSeller',
    },
];

export const AddProjectModal = (props) => {
    const { visible, handleCancel, data, rowSelection, onOk } = props;
    const { dataSource, loading, pagination } = data;

    return (
        <Modal
            visible={visible}
            title="添加客户项目"
            onOk={onOk}
            onCancel={handleCancel}
            width={880}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    取消
                </Button>,
                <Button key="submit" type="primary" loading={loading} onClick={onOk}>
                    确认
                </Button>,
            ]}
        >
            <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={dataSource}
                loading={loading}
                pagination={pagination}
                rowKey={(record) => record.id}
            />
        </Modal>
    );
};
AddProjectModal.propTypes = {
    visible: PropTypes.bool,
    handleCancel: PropTypes.func,
    data: PropTypes.object,
    rowSelection: PropTypes.object,
    onOk: PropTypes.func,
    // selectRow: PropTypes.object,
    // rxChecked: PropTypes.array,
};
