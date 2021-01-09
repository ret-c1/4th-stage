import React from 'react';
import { Modal, Table, Tooltip, Button } from 'antd';
import PubMessage from '@components/PubMessage';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import useTableSelect from '../../hooks/useTableSelect';

const columns = [
    {
        title: '客户名称',
        dataIndex: 'clientName',
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
        dataIndex: 'projectName',
    },
    {
        title: '销售联系人',
        dataIndex: 'responsibleSeller',
    },
];

export const InvestModal = (props) => {
    const { visible, handleCancel, data, id, rxChecked, rxTabelcheck, rxTabelcheckall } = props;
    const { dataSource, loading, pagination } = data;
    const history = useHistory();

    // 列表选择项
    const rowSelection = useTableSelect(rxChecked, rxTabelcheck, rxTabelcheckall);
    const { selectedRowKeys } = rowSelection;

    const handleOk = () => {
        if (selectedRowKeys.length === 0) {
            PubMessage('error', '请选择需要排查的项目');
            return;
        }
        rxTabelcheckall([]);
        history.push(`/intelligence/threatdetection?id=${id}&project=${selectedRowKeys}`);
    };

    return (
        <Modal
            visible={visible}
            title="排查对象范围"
            onOk={handleOk}
            onCancel={handleCancel}
            width={880}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    取消
                </Button>,
                <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
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
InvestModal.propTypes = {
    visible: PropTypes.bool,
    handleCancel: PropTypes.func,
    data: PropTypes.object,
    id: PropTypes.number,
    rxChecked: PropTypes.array,
    rxTabelcheck: PropTypes.func,
    rxTabelcheckall: PropTypes.func,
};
